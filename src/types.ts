export type UserRole = 'installer' | 'supervisor' | 'admin';

export type ReportStatus = 'draft' | 'submitted' | 'in_review' | 'approved';

export type IncidentType =
  | 'ninguna'
  | 'material faltante'
  | 'área no lista'
  | 'clima'
  | 'esperando otro gremio'
  | 'otro';

export type AccessoryUnit = 'each' | 'ft' | 'in' | 'room' | 'sheet';

export type AccessoryItemType = 'product' | 'activity';

export interface Profile {
  id: string;
  full_name: string;
  email?: string;
  role: UserRole;
  phone?: string;
  active: boolean;
  default_hourly_rate: number; // e.g. 25
  pin?: string; // 4-6 digit quick PIN for installers
  password?: string; // password for supervisor and admin
  biometric_enabled?: boolean;
  biometric_credential_id?: string;
  must_change_pin?: boolean;
  temp_pin?: string;
}

export interface Contractor {
  id: string;
  name: string;
}

export interface JobSite {
  id: string;
  name: string;
  contractor_id: string;
  contractor_name?: string;
  active: boolean;
  is_completed?: boolean;
  completed_at?: string;
}

export interface Accessory {
  id: string;
  code: string; // unique slug e.g. "grab-bar-36"
  name: string;
  category: string;
  unit: AccessoryUnit;
  item_type: AccessoryItemType;
  aliases: string[];
  default_price?: number | null;
  active: boolean;
}

export interface AccessoryPrice {
  id: string;
  accessory_id: string;
  contractor_id?: string | null; // optional specific contractor price
  unit_price: number;
  valid_from: string; // ISO date
}

export interface SiteScope {
  id: string;
  job_site_id: string;
  accessory_id: string;
  planned_qty: number;
  unit: AccessoryUnit;
  area_label?: string; // e.g. "Piso 4"
  notes?: string;
}

export interface ReportCrewMember {
  id: string;
  report_id: string;
  user_id: string;
  user_name?: string;
  start_at: string; // ISO timestamp
  end_at: string;   // ISO timestamp
  hours: number;    // decimal e.g. 8.5
  hourly_rate_snapshot: number;
  is_weekend: boolean;
  is_supervisor_no_hours?: boolean;
  notes?: string;
}

export interface ReportItem {
  id: string;
  report_id: string;
  accessory_id: string;
  accessory_code?: string;
  accessory_name?: string;
  accessory_unit?: AccessoryUnit;
  quantity: number;
  unit: AccessoryUnit;
  measure_notes?: string; // e.g. "1085 in handrail"
  unit_price_override?: number;
  line_total?: number; // quantity * price
}

export interface ReportPhoto {
  id: string;
  report_id: string;
  url: string;
  caption?: string;
  created_at: string;
}

export interface Report {
  id: string;
  work_date: string; // YYYY-MM-DD
  job_site_id: string;
  job_site_name?: string;
  contractor_id?: string;
  contractor_name?: string;
  created_by: string;
  creator_name?: string;
  status: ReportStatus;
  observations: string;
  incident_type: IncidentType;
  activities_performed?: string[]; // e.g. ["caulking", "limpieza"]
  created_at: string;
  updated_at: string;
  supervisor_notes?: string;
  
  // Relations
  crew: ReportCrewMember[];
  items: ReportItem[];
  photos?: ReportPhoto[];
}

export type PermissionModule =
  | 'reports'
  | 'review'
  | 'supervisor'
  | 'prices'
  | 'hourly_rates'
  | 'users'
  | 'catalogues'
  | 'site_scope'
  | 'progress';

export interface Permission {
  role: UserRole;
  module: PermissionModule;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  scope?: 'own' | 'all'; // 'own' = solo datos personales/propios, 'all' = todo el equipo
}

export type RolePermission = Permission;

export interface Settings {
  id?: string;
  week_start_day: number; // 1 = Monday
  overtime_enabled?: boolean;
  overtime_threshold_hours?: number;
  overtime_rate_multiplier?: number;
  overtime_weekly_threshold?: number; // e.g. 40
  overtime_multiplier?: number; // e.g. 1.5
  weekend_multiplier?: number; // e.g. 1.5
  progress_counts: 'approved' | 'approved_and_submitted';
  allow_unlisted_items?: boolean;
  require_photos?: boolean;
}

export type AppSettings = Settings;

export interface ImportLog {
  id: string;
  entity: 'accessories' | 'site_scope';
  file_name: string;
  mode: 'upsert' | 'replace';
  created_count: number;
  updated_count: number;
  error_count: number;
  imported_by: string;
  created_at: string;
  details?: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity: string;
  entity_id: string;
  details: string;
  created_at: string;
}
