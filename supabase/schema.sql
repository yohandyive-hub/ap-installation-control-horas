-- ==============================================================================
-- AP INSTALLATION - POSTGRESQL SCHEMA FOR SUPABASE
-- División 10 (Accesorios y Especialidades) de la Construcción - Florida, EE.UU.
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENUMS
create type user_role as enum ('installer', 'supervisor', 'admin');
create type report_status as enum ('draft', 'submitted', 'in_review', 'approved');
create type incident_type as enum ('ninguna', 'material faltante', 'área no lista', 'clima', 'esperando otro gremio', 'otro');
create type accessory_unit as enum ('each', 'ft', 'in', 'room', 'sheet');
create type item_type as enum ('product', 'activity');

-- 2. PROFILES (Extiende auth.users de Supabase)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role user_role not null default 'installer',
  phone text,
  active boolean not null default true,
  default_hourly_rate numeric(10,2) not null default 20.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. CONTRACTORS (Lotspeich, Lee, Calvin, AP, etc.)
create table if not exists public.contractors (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  created_at timestamptz not null default now()
);

-- 4. JOB SITES (Jackson, Jackson 4th Floor, Memorial West, etc.)
create table if not exists public.job_sites (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contractor_id uuid not null references public.contractors(id) on delete restrict,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (name, contractor_id)
);

-- 5. ACCESSORIES & ACTIVITIES (Catálogo División 10)
create table if not exists public.accessories (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique, -- slug e.g. 'acrovyn-sheet', 'grab-bar-36'
  name text not null,
  category text not null default 'General',
  unit accessory_unit not null default 'each',
  item_type item_type not null default 'product',
  aliases text[] not null default '{}',
  default_price numeric(10,2),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 6. ACCESSORY PRICES (Precios acordados por unidad, general o por contratista)
create table if not exists public.accessory_prices (
  id uuid primary key default uuid_generate_v4(),
  accessory_id uuid not null references public.accessories(id) on delete cascade,
  contractor_id uuid references public.contractors(id) on delete set null,
  unit_price numeric(10,2) not null default 0.00,
  valid_from date not null default current_date,
  created_at timestamptz not null default now()
);

-- 7. SITE SCOPE (Alcance planificado por sitio - Base del cálculo de avance)
create table if not exists public.site_scope (
  id uuid primary key default uuid_generate_v4(),
  job_site_id uuid not null references public.job_sites(id) on delete cascade,
  accessory_id uuid not null references public.accessories(id) on delete restrict,
  planned_qty numeric(12,2) not null default 0.00,
  unit accessory_unit not null default 'each',
  area_label text, -- ej. 'Piso 4', 'Ala Norte', 'Quirófanos'
  notes text,
  created_at timestamptz not null default now(),
  unique (job_site_id, accessory_id, area_label)
);

-- 8. REPORTS (Reportes diarios de obra)
create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  work_date date not null default current_date, -- Fecha en que inició el turno
  job_site_id uuid not null references public.job_sites(id) on delete restrict,
  created_by uuid not null references public.profiles(id) on delete restrict,
  status report_status not null default 'submitted',
  observations text not null default '',
  incident_type incident_type not null default 'ninguna',
  activities_performed text[] not null default '{}',
  supervisor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 9. REPORT CREW (Integrantes del equipo y sus horarios)
create table if not exists public.report_crew (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete restrict,
  start_at timestamptz not null,
  end_at timestamptz not null,
  hours numeric(6,2) not null default 0.00,
  hourly_rate_snapshot numeric(10,2) not null default 0.00,
  is_weekend boolean not null default false,
  is_supervisor_no_hours boolean not null default false,
  notes text,
  constraint valid_dates check (end_at > start_at),
  constraint max_24_hours check (extract(epoch from (end_at - start_at)) <= 86400)
);

-- 10. REPORT ITEMS (Instalaciones y producción en obra)
create table if not exists public.report_items (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid not null references public.reports(id) on delete cascade,
  accessory_id uuid not null references public.accessories(id) on delete restrict,
  quantity numeric(12,2) not null default 1.00,
  unit accessory_unit not null default 'each',
  measure_notes text, -- ej. '1085 pulgadas convertidas a 90.4 ft'
  unit_price_override numeric(10,2),
  line_total numeric(12,2) generated always as (quantity * coalesce(unit_price_override, 0.00)) stored
);

-- 11. REPORT PHOTOS (Almacenadas en Supabase Storage bucket 'report-photos')
create table if not exists public.report_photos (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid not null references public.reports(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamptz not null default now()
);

-- 12. PERMISSIONS (Matriz de permisos configurable por rol y módulo)
create table if not exists public.permissions (
  role user_role not null,
  module text not null,
  can_view boolean not null default false,
  can_create boolean not null default false,
  can_edit boolean not null default false,
  can_delete boolean not null default false,
  primary key (role, module)
);

-- 13. SETTINGS
create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  week_start_day int not null default 1, -- 1 = Lunes
  overtime_enabled boolean not null default false,
  overtime_weekly_threshold numeric(6,2) not null default 40.00,
  overtime_multiplier numeric(4,2) not null default 1.50,
  weekend_multiplier numeric(4,2) not null default 1.50,
  progress_counts text not null default 'approved_and_submitted' check (progress_counts in ('approved', 'approved_and_submitted')),
  updated_at timestamptz not null default now()
);

-- 14. IMPORT LOGS
create table if not exists public.import_logs (
  id uuid primary key default uuid_generate_v4(),
  entity text not null,
  file_name text not null,
  mode text not null default 'upsert',
  created_count int not null default 0,
  updated_count int not null default 0,
  error_count int not null default 0,
  imported_by uuid references public.profiles(id),
  details text,
  created_at timestamptz not null default now()
);

-- 15. AUDIT LOG (Quién cambió qué y cuándo)
create table if not exists public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  user_name text not null,
  action text not null,
  entity text not null,
  entity_id text not null,
  details text not null,
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.report_crew enable row level security;
alter table public.report_items enable row level security;
alter table public.site_scope enable row level security;
alter table public.accessories enable row level security;
alter table public.job_sites enable row level security;
alter table public.contractors enable row level security;
alter table public.permissions enable row level security;
alter table public.accessory_prices enable row level security;
alter table public.audit_log enable row level security;
alter table public.import_logs enable row level security;

-- Function to get current user role with secure search_path
create or replace function public.current_user_role()
returns user_role as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid() limit 1),
    null
  );
$$ language sql stable security definer set search_path = public;

-- Grant execution to anon, authenticated and service_role so RLS evaluations never throw 42501
grant execute on function public.current_user_role() to anon, authenticated, service_role;

-- PROFILES POLICIES
-- Allow reading active profiles so installers and staff can select their name on login screen
create policy "Users can view active profiles" on public.profiles
  for select using (true);

create policy "Admins can manage profiles" on public.profiles
  for all using (public.current_user_role() = 'admin');

-- REPORTS POLICIES
-- Installers: can see their own reports (or supervisors/admins see all)
create policy "Installers view own reports" on public.reports
  for select using (
    public.current_user_role() in ('supervisor', 'admin')
    or created_by = auth.uid()
    or exists (select 1 from public.report_crew where report_id = reports.id and user_id = auth.uid())
    or auth.role() = 'anon'
  );

create policy "Installers insert reports" on public.reports
  for insert with check (
    created_by = auth.uid() 
    or public.current_user_role() in ('supervisor', 'admin')
    or auth.role() = 'anon'
  );

create policy "Installers edit draft or submitted reports" on public.reports
  for update using (
    public.current_user_role() = 'admin'
    or (public.current_user_role() = 'supervisor' and status != 'approved')
    or (created_by = auth.uid() and status in ('draft', 'submitted'))
    or auth.role() = 'anon'
  );

create policy "Only admin can delete reports" on public.reports
  for delete using (public.current_user_role() = 'admin');

-- REPORT CREW POLICIES
create policy "Users can view report crew" on public.report_crew
  for select using (true);

create policy "Users can insert crew for reports" on public.report_crew
  for insert with check (true);

create policy "Users can update crew for reports" on public.report_crew
  for update using (true);

create policy "Users can delete crew for reports" on public.report_crew
  for delete using (true);

-- REPORT ITEMS POLICIES
create policy "Users can view report items" on public.report_items
  for select using (true);

create policy "Users can insert items for reports" on public.report_items
  for insert with check (true);

create policy "Users can update items for reports" on public.report_items
  for update using (true);

create policy "Users can delete items for reports" on public.report_items
  for delete using (true);

-- REPORT PHOTOS POLICIES
create policy "Users can view report photos" on public.report_photos
  for select using (true);

create policy "Users can insert photos for reports" on public.report_photos
  for insert with check (true);

create policy "Users can delete photos for reports" on public.report_photos
  for delete using (true);

-- SITE SCOPE & PROGRESS POLICIES
create policy "Supervisor and admin can view site scope" on public.site_scope
  for select using (public.current_user_role() in ('supervisor', 'admin'));

create policy "Admin can edit site scope" on public.site_scope
  for all using (public.current_user_role() = 'admin');

-- ACCESSORY PRICES POLICIES
create policy "Anyone can view accessory prices" on public.accessory_prices
  for select using (true);

create policy "Admin manage accessory prices" on public.accessory_prices
  for all using (public.current_user_role() = 'admin');

-- PERMISSIONS POLICIES
create policy "Authenticated users view permissions" on public.permissions
  for select using (auth.role() = 'authenticated');

create policy "Admin manage permissions" on public.permissions
  for all using (public.current_user_role() = 'admin');

-- SETTINGS POLICIES
create policy "Authenticated users view settings" on public.settings
  for select using (auth.role() = 'authenticated');

create policy "Admin manage settings" on public.settings
  for all using (public.current_user_role() = 'admin');

-- AUDIT LOG POLICIES
create policy "Authenticated users insert audit log" on public.audit_log
  for insert with check (auth.role() = 'authenticated');

create policy "Supervisor and admin view audit log" on public.audit_log
  for select using (public.current_user_role() in ('supervisor', 'admin'));

-- IMPORT LOGS POLICIES
create policy "Supervisor and admin view import logs" on public.import_logs
  for select using (public.current_user_role() in ('supervisor', 'admin'));

create policy "Supervisor and admin manage import logs" on public.import_logs
  for all using (public.current_user_role() in ('supervisor', 'admin'));

-- CATALOGS (Public read for active app operations)
create policy "Anyone can view accessories" on public.accessories
  for select using (true);

create policy "Anyone can view job sites" on public.job_sites
  for select using (true);

create policy "Anyone can view contractors" on public.contractors
  for select using (true);

-- ==============================================================================
-- TRIGGERS & FUNCTIONS
-- ==============================================================================

-- Function to prevent crew overlapping hours for a user
create or replace function check_crew_overlap()
returns trigger as $$
declare
  overlap_count int;
begin
  select count(*) into overlap_count
  from public.report_crew rc
  join public.reports r on r.id = rc.report_id
  where rc.user_id = new.user_id
    and rc.id != coalesce(new.id, uuid_nil())
    and (rc.start_at, rc.end_at) overlaps (new.start_at, new.end_at);

  if overlap_count > 0 then
    raise exception 'El instalador ya tiene un turno registrado que se traslapa con este horario.';
  end if;
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger trigger_check_crew_overlap
before insert or update on public.report_crew
for each row execute function check_crew_overlap();
