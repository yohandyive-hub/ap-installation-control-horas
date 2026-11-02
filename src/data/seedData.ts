import {
  Profile,
  Contractor,
  JobSite,
  Accessory,
  AccessoryPrice,
  SiteScope,
  Report,
  Permission,
  Settings,
  AuditLog,
} from '../types';
import { createIsoTimestamp } from '../utils/dateUtils';
import { HISTORICAL_REPORTS_CONSOLIDATED } from './historicalReports';

export const SEED_PROFILES: Profile[] = [
  { id: 'usr-antony', full_name: 'Antony', email: 'antony@apinstall.com', role: 'installer', default_hourly_rate: 25, active: true, phone: '(305) 555-0101', pin: '1234' },
  { id: 'usr-abinor', full_name: 'Abinor', email: 'abinor@apinstall.com', role: 'installer', default_hourly_rate: 22, active: true, phone: '(305) 555-0102', pin: '1234' },
  { id: 'usr-johan', full_name: 'Johan', email: 'johan@apinstall.com', role: 'installer', default_hourly_rate: 30, active: true, phone: '(305) 555-0103', pin: '1234' },
  { id: 'usr-efrain', full_name: 'Efraín', email: 'efrain@apinstall.com', role: 'installer', default_hourly_rate: 20, active: false, phone: '(305) 555-0104', pin: '1234' }, // Finalizó el 5 de junio de 2026 según consolidado
  { id: 'usr-pedro', full_name: 'Pedro', email: 'pedro@apinstall.com', role: 'installer', default_hourly_rate: 22, active: false, phone: '(305) 555-0105', pin: '1234' }, // Finalizó el 24 de abril de 2026 según consolidado
  { id: 'usr-servando', full_name: 'Servando', email: 'servando@apinstall.com', role: 'installer', default_hourly_rate: 20, active: true, phone: '(305) 555-0106', pin: '1234' },
  { id: 'usr-jason', full_name: 'Jason', email: 'jason@apinstall.com', role: 'installer', default_hourly_rate: 20, active: true, phone: '(305) 555-0107', pin: '1234' },
  { id: 'usr-gregny', full_name: 'Gregny', email: 'gregny@apinstall.com', role: 'installer', default_hourly_rate: 20, active: true, phone: '(305) 555-0108', pin: '1234' },
  { id: 'usr-jenire', full_name: 'Jenire', email: 'jenire@apinstall.com', role: 'installer', default_hourly_rate: 20, active: true, phone: '(305) 555-0109', pin: '1234' },
  { id: 'usr-yohandy', full_name: 'Yohandy', email: 'yohandyi@gmail.com', role: 'admin', default_hourly_rate: 40, active: true, phone: '(305) 555-0110', password: 'admin123', pin: '1234' },
  { id: 'usr-hector', full_name: 'Héctor Rodríguez', email: 'hector@apinstall.com', role: 'supervisor', default_hourly_rate: 32, active: true, phone: '(305) 555-0199', password: 'admin123' },
  { id: 'usr-admin', full_name: 'Admin AP (Yo)', email: 'admin@apinstall.com', role: 'admin', default_hourly_rate: 40, active: true, phone: '(305) 555-0100', password: 'admin123' },
];

export const SEED_CONTRACTORS: Contractor[] = [
  { id: 'cont-lotspeich', name: 'Lotspeich' },
  { id: 'cont-lee', name: 'Lee' },
  { id: 'cont-calvin', name: 'Calvin' },
  { id: 'cont-ap', name: 'AP Installation' },
  { id: 'cont-edge', name: 'Edge' },
];

export const SEED_JOB_SITES: JobSite[] = [
  { id: 'site-jackson', name: 'Jackson', contractor_id: 'cont-lotspeich', contractor_name: 'Lotspeich', active: true },
  { id: 'site-jackson-4th', name: 'Jackson 4th Floor', contractor_id: 'cont-lotspeich', contractor_name: 'Lotspeich', active: true },
  { id: 'site-um', name: 'UM', contractor_id: 'cont-lotspeich', contractor_name: 'Lotspeich', active: true },
  { id: 'site-um-lobby', name: 'UM Lobby', contractor_id: 'cont-lotspeich', contractor_name: 'Lotspeich', active: true },
  { id: 'site-memorial-west', name: 'Memorial West', contractor_id: 'cont-lee', contractor_name: 'Lee', active: true },
  { id: 'site-memorial-miramar', name: 'Memorial Miramar', contractor_id: 'cont-lee', contractor_name: 'Lee', active: true },
  { id: 'site-lighthouse-bh', name: 'Lighthouse Broward Health', contractor_id: 'cont-calvin', contractor_name: 'Calvin', active: true },
  { id: 'site-bh-plantation', name: 'Broward Health Plantation', contractor_id: 'cont-calvin', contractor_name: 'Calvin', active: true },
  { id: 'site-bh-oakland', name: 'Broward Health Oakland', contractor_id: 'cont-calvin', contractor_name: 'Calvin', active: true },
  { id: 'site-bethesda', name: 'Bethesda', contractor_id: 'cont-lotspeich', contractor_name: 'Lotspeich', active: true },
  { id: 'site-baptist-pembroke', name: 'Baptist Pembroke', contractor_id: 'cont-lee', contractor_name: 'Lee', active: true },
  { id: 'site-miami-lakes', name: 'Miami Lakes Sherri', contractor_id: 'cont-calvin', contractor_name: 'Calvin', active: true },
  { id: 'site-kendal-church', name: 'Kendal Church', contractor_id: 'cont-ap', contractor_name: 'AP Installation', active: true },
  { id: 'site-ap-storage', name: 'AP Storage', contractor_id: 'cont-ap', contractor_name: 'AP Installation', active: true },
];

export const SEED_ACCESSORIES: Accessory[] = [
  // Láminas
  { id: 'acc-acrovyn-sheet', code: 'acrovyn-sheet', name: 'Láminas Acrovyn', category: 'Láminas', unit: 'sheet', item_type: 'product', aliases: ['Acrovyn', 'Laminas', 'sheet'], default_price: 18, active: true },
  { id: 'acc-design-sheet', code: 'design-sheet', name: 'Design sheets', category: 'Láminas', unit: 'sheet', item_type: 'product', aliases: ['Design sheet'], default_price: 22, active: true },
  { id: 'acc-dragon-fly-sheet', code: 'dragon-fly-sheet', name: 'Dragon Fly sheets', category: 'Láminas', unit: 'sheet', item_type: 'product', aliases: ['Dragon Fly', 'DF sheet'], default_price: 24, active: true },
  
  // Esquineros
  { id: 'acc-corner-guards-ss', code: 'corner-guards-ss', name: 'Esquineros SS (Inox)', category: 'Esquineros', unit: 'each', item_type: 'product', aliases: ['CG SS', 'Stainless CG'], default_price: 8, active: true },
  { id: 'acc-corner-guards-alum', code: 'corner-guards-alum', name: 'Esquineros de Aluminio', category: 'Esquineros', unit: 'each', item_type: 'product', aliases: ['CG Alum', 'Esquinero aluminio'], default_price: 7, active: true },
  { id: 'acc-corner-guards-df', code: 'corner-guards-df', name: 'Esquineros Dragon Fly', category: 'Esquineros', unit: 'each', item_type: 'product', aliases: ['CG Dragon Fly'], default_price: 9, active: true },
  
  // Rieles y pasamanos
  { id: 'acc-hand-rail', code: 'hand-rail', name: 'Hand rail (Pasamanos)', category: 'Pasamanos', unit: 'ft', item_type: 'product', aliases: ['Handrail', 'HR'], default_price: 8.5, active: true },
  { id: 'acc-crash-rail-metal', code: 'crash-rail-metal', name: 'Crash rail metal', category: 'Crash Rails', unit: 'ft', item_type: 'product', aliases: ['CR Metal', 'Crash rail'], default_price: 7.5, active: true },
  { id: 'acc-crash-rail-plastic', code: 'crash-rail-plastic', name: 'Crash rail plástico', category: 'Crash Rails', unit: 'ft', item_type: 'product', aliases: ['CR Plastic'], default_price: 7.0, active: true },
  { id: 'acc-crash-rail-ss', code: 'crash-rail-ss', name: 'Crash rail SS', category: 'Crash Rails', unit: 'ft', item_type: 'product', aliases: ['CR SS'], default_price: 9.0, active: true },
  
  // Barras de agarre
  { id: 'acc-grab-bar-18', code: 'grab-bar-18', name: 'Grab bar 18"', category: 'Barras de Apoyo', unit: 'each', item_type: 'product', aliases: ['GB 18', 'barra 18'], default_price: 12, active: true },
  { id: 'acc-grab-bar-24', code: 'grab-bar-24', name: 'Grab bar 24"', category: 'Barras de Apoyo', unit: 'each', item_type: 'product', aliases: ['GB 24', 'barra 24'], default_price: 13, active: true },
  { id: 'acc-grab-bar-36', code: 'grab-bar-36', name: 'Grab bar 36"', category: 'Barras de Apoyo', unit: 'each', item_type: 'product', aliases: ['GB 36', 'barra 36'], default_price: 14, active: true },
  { id: 'acc-grab-bar-42', code: 'grab-bar-42', name: 'Grab bar 42"', category: 'Barras de Apoyo', unit: 'each', item_type: 'product', aliases: ['GB 42', 'barra 42'], default_price: 16, active: true },
  { id: 'acc-grab-bar-48', code: 'grab-bar-48', name: 'Grab bar 48"', category: 'Barras de Apoyo', unit: 'each', item_type: 'product', aliases: ['GB 48', 'barra 48'], default_price: 18, active: true },
  
  // Espejos y baños
  { id: 'acc-mirror', code: 'mirror', name: 'Espejos', category: 'Espejos', unit: 'each', item_type: 'product', aliases: ['Espejo', 'Mirrors'], default_price: 15, active: true },
  { id: 'acc-soap-dispenser', code: 'soap-dispenser', name: 'Dispensador de jabón', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Soap', 'Jabón'], default_price: 9, active: true },
  { id: 'acc-paper-towel-dispenser', code: 'paper-towel-dispenser', name: 'Dispensador toallas de papel', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Paper towel', 'Toallero'], default_price: 10, active: true },
  { id: 'acc-toilet-paper-dispenser', code: 'toilet-paper-dispenser', name: 'Dispensador papel higiénico', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Toilet paper', 'Papel higiénico'], default_price: 9, active: true },
  { id: 'acc-seat-cover-dispenser', code: 'seat-cover-dispenser', name: 'Dispensador seat cover', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Seat cover'], default_price: 8, active: true },
  { id: 'acc-napkin-dispenser', code: 'napkin-dispenser', name: 'Dispensador napkin', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Napkin'], default_price: 8, active: true },
  { id: 'acc-hand-sanitizer', code: 'hand-sanitizer', name: 'Hand sanitizer', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Sanitizer'], default_price: 9, active: true },
  { id: 'acc-gloves-dispenser', code: 'gloves-dispenser', name: 'Gloves dispenser', category: 'Dispensadores', unit: 'each', item_type: 'product', aliases: ['Guantes'], default_price: 8, active: true },
  { id: 'acc-sharp-container', code: 'sharp-container', name: 'Sharp container', category: 'Médico / Hospital', unit: 'each', item_type: 'product', aliases: ['Sharp'], default_price: 9, active: true },
  { id: 'acc-emesis-dispenser', code: 'emesis-dispenser', name: 'Emesis dispenser', category: 'Médico / Hospital', unit: 'each', item_type: 'product', aliases: ['Emesis'], default_price: 8, active: true },
  
  // Extintores y seguridad
  { id: 'acc-fire-extinguisher', code: 'fire-extinguisher', name: 'Extintor (FE)', category: 'Extintores', unit: 'each', item_type: 'product', aliases: ['FE', 'Extintor'], default_price: 11, active: true },
  { id: 'acc-fire-cabinet', code: 'fire-cabinet', name: 'Gabinete extintor (FEC)', category: 'Extintores', unit: 'each', item_type: 'product', aliases: ['FEC', 'Gabinete'], default_price: 25, active: true },
  { id: 'acc-fe-sign', code: 'fe-sign', name: 'FE sign (Señal)', category: 'Extintores', unit: 'each', item_type: 'product', aliases: ['FE sign'], default_price: 5, active: true },
  
  // Particiones y rieles
  { id: 'acc-cubicle-track', code: 'cubicle-track', name: 'Cubicle track', category: 'Rieles', unit: 'ft', item_type: 'product', aliases: ['Cubicle', 'Track'], default_price: 7, active: true },
  { id: 'acc-partition-panel', code: 'partition-panel', name: 'Partición de baño - Panel', category: 'Particiones', unit: 'each', item_type: 'product', aliases: ['Panel partición'], default_price: 35, active: true },
  { id: 'acc-partition-pilaster', code: 'partition-pilaster', name: 'Partición de baño - Pilaster', category: 'Particiones', unit: 'each', item_type: 'product', aliases: ['Pilaster'], default_price: 30, active: true },
  { id: 'acc-urinal-screen', code: 'urinal-screen', name: 'Urinal screen', category: 'Particiones', unit: 'each', item_type: 'product', aliases: ['Urinal'], default_price: 25, active: true },
  { id: 'acc-computer-brackets', code: 'computer-brackets', name: 'Computer brackets', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Brackets'], default_price: 15, active: true },
  { id: 'acc-baby-changing', code: 'baby-changing', name: 'Baby changing station', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Baby changing', 'Cambiador'], default_price: 28, active: true },
  { id: 'acc-shower-seat', code: 'shower-seat', name: 'Shower seat', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Asiento ducha'], default_price: 25, active: true },
  { id: 'acc-robe-hook', code: 'robe-hook', name: 'Robe hook (Gancho)', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Hook'], default_price: 5, active: true },
  { id: 'acc-mop-holder', code: 'mop-holder', name: 'Mop holder', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Mop'], default_price: 10, active: true },
  { id: 'acc-trash-can', code: 'trash-can', name: 'Trash can', category: 'Especialidades', unit: 'each', item_type: 'product', aliases: ['Basurero'], default_price: 14, active: true },
];

export const SEED_ACTIVITIES: string[] = [
  'caulking',
  'limpieza',
  'punch list',
  'entrega/movilización de material',
  'preparar paredes',
  'abrir paredes',
  'mockup',
  'revisar condiciones del sitio',
  'camioneta',
];

export const SEED_ACCESSORY_PRICES: AccessoryPrice[] = [
  { id: 'pr-1', accessory_id: 'acc-acrovyn-sheet', unit_price: 18, valid_from: '2026-01-01' },
  { id: 'pr-2', accessory_id: 'acc-dragon-fly-sheet', unit_price: 24, valid_from: '2026-01-01' },
  { id: 'pr-3', accessory_id: 'acc-mirror', unit_price: 15, valid_from: '2026-01-01' },
  { id: 'pr-4', accessory_id: 'acc-grab-bar-18', unit_price: 12, valid_from: '2026-01-01' },
  { id: 'pr-5', accessory_id: 'acc-grab-bar-36', unit_price: 14, valid_from: '2026-01-01' },
  { id: 'pr-6', accessory_id: 'acc-grab-bar-42', unit_price: 16, valid_from: '2026-01-01' },
  { id: 'pr-7', accessory_id: 'acc-crash-rail-metal', unit_price: 7.5, valid_from: '2026-01-01' },
  { id: 'pr-8', accessory_id: 'acc-crash-rail-plastic', unit_price: 7.0, valid_from: '2026-01-01' },
  { id: 'pr-9', accessory_id: 'acc-hand-rail', unit_price: 8.5, valid_from: '2026-01-01' },
  { id: 'pr-10', accessory_id: 'acc-corner-guards-ss', unit_price: 8, valid_from: '2026-01-01' },
  { id: 'pr-11', accessory_id: 'acc-toilet-paper-dispenser', unit_price: 9, valid_from: '2026-01-01' },
];

export const SEED_SITE_SCOPES: SiteScope[] = [
  // Jackson 4th Floor
  { id: 'sc-1', job_site_id: 'site-jackson-4th', accessory_id: 'acc-acrovyn-sheet', planned_qty: 120, unit: 'sheet', area_label: 'Piso 4' },
  { id: 'sc-2', job_site_id: 'site-jackson-4th', accessory_id: 'acc-crash-rail-metal', planned_qty: 500, unit: 'ft', area_label: 'Pasillos Norte' },
  { id: 'sc-3', job_site_id: 'site-jackson-4th', accessory_id: 'acc-grab-bar-36', planned_qty: 48, unit: 'each', area_label: 'Baños Piso 4' },
  { id: 'sc-4', job_site_id: 'site-jackson-4th', accessory_id: 'acc-grab-bar-42', planned_qty: 24, unit: 'each', area_label: 'Baños Piso 4' },
  { id: 'sc-5', job_site_id: 'site-jackson-4th', accessory_id: 'acc-mirror', planned_qty: 24, unit: 'each', area_label: 'Baños Piso 4' },

  // Jackson General
  { id: 'sc-6', job_site_id: 'site-jackson', accessory_id: 'acc-acrovyn-sheet', planned_qty: 80, unit: 'sheet', area_label: 'Alas Este y Oeste' },
  { id: 'sc-7', job_site_id: 'site-jackson', accessory_id: 'acc-grab-bar-18', planned_qty: 40, unit: 'each', area_label: 'Habitaciones' },
  { id: 'sc-8', job_site_id: 'site-jackson', accessory_id: 'acc-grab-bar-36', planned_qty: 40, unit: 'each', area_label: 'Habitaciones' },
  { id: 'sc-9', job_site_id: 'site-jackson', accessory_id: 'acc-grab-bar-42', planned_qty: 40, unit: 'each', area_label: 'Habitaciones' },
  { id: 'sc-10', job_site_id: 'site-jackson', accessory_id: 'acc-mirror', planned_qty: 50, unit: 'each', area_label: 'Habitaciones' },
  { id: 'sc-11', job_site_id: 'site-jackson', accessory_id: 'acc-crash-rail-metal', planned_qty: 200, unit: 'ft', area_label: 'Pasillos' },

  // Memorial West
  { id: 'sc-12', job_site_id: 'site-memorial-west', accessory_id: 'acc-acrovyn-sheet', planned_qty: 60, unit: 'sheet', area_label: 'Pabellón A' },
  { id: 'sc-13', job_site_id: 'site-memorial-west', accessory_id: 'acc-corner-guards-ss', planned_qty: 50, unit: 'each', area_label: 'Esquinas Pabellón A' },

  // Memorial Miramar
  { id: 'sc-14', job_site_id: 'site-memorial-miramar', accessory_id: 'acc-acrovyn-sheet', planned_qty: 30, unit: 'sheet', area_label: 'Área Ambulatoria' },
];

export const SEED_PERMISSIONS: Permission[] = [
  // Installer permissions
  { role: 'installer', module: 'reports', can_view: true, can_create: true, can_edit: true, can_delete: false, scope: 'own' },
  { role: 'installer', module: 'review', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'supervisor', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'prices', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'hourly_rates', can_view: true, can_create: false, can_edit: false, can_delete: false, scope: 'own' },
  { role: 'installer', module: 'users', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'catalogues', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'site_scope', can_view: false, can_create: false, can_edit: false, can_delete: false },
  { role: 'installer', module: 'progress', can_view: false, can_create: false, can_edit: false, can_delete: false },

  // Supervisor permissions
  { role: 'supervisor', module: 'reports', can_view: true, can_create: true, can_edit: true, can_delete: false, scope: 'all' },
  { role: 'supervisor', module: 'review', can_view: true, can_create: false, can_edit: true, can_delete: false },
  { role: 'supervisor', module: 'supervisor', can_view: true, can_create: false, can_edit: true, can_delete: false },
  { role: 'supervisor', module: 'prices', can_view: true, can_create: true, can_edit: true, can_delete: false },
  { role: 'supervisor', module: 'hourly_rates', can_view: true, can_create: false, can_edit: false, can_delete: false, scope: 'all' },
  { role: 'supervisor', module: 'users', can_view: true, can_create: false, can_edit: false, can_delete: false },
  { role: 'supervisor', module: 'catalogues', can_view: true, can_create: false, can_edit: false, can_delete: false },
  { role: 'supervisor', module: 'site_scope', can_view: true, can_create: true, can_edit: true, can_delete: false },
  { role: 'supervisor', module: 'progress', can_view: true, can_create: false, can_edit: false, can_delete: false },

  // Admin permissions (all true)
  { role: 'admin', module: 'reports', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'review', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'supervisor', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'prices', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'hourly_rates', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'users', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'catalogues', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'site_scope', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
  { role: 'admin', module: 'progress', can_view: true, can_create: true, can_edit: true, can_delete: true, scope: 'all' },
];

export const SEED_SETTINGS: Settings = {
  week_start_day: 1, // Monday
  overtime_enabled: false, // Disabled by default, highlights >40h in red
  overtime_weekly_threshold: 40,
  overtime_multiplier: 1.5,
  weekend_multiplier: 1.5,
  progress_counts: 'approved_and_submitted', // or 'approved'
};

// Seed realistic reports matching the user's WhatsApp log & Excel sheet (including history from January)
// Reports extracted strictly and exclusively from the master spreadsheet "Nuevo Consolidado 2026"
export const SEED_REPORTS: Report[] = [...HISTORICAL_REPORTS_CONSOLIDATED];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-1",
    user_id: "usr-hector",
    user_name: "Héctor Rodríguez",
    action: "APPROVE_REPORT",
    entity: "report",
    entity_id: "rep-20260916-02",
    details: "Aprobó reporte de Baptist Pembroke (Antony, Abinor, Johan). Asignó precios unitarios.",
    created_at: "2026-09-16T16:00:00Z",
  },
  {
    id: "aud-2",
    user_id: "usr-admin",
    user_name: "Admin AP",
    action: "UPDATE_RATE",
    entity: "profile",
    entity_id: "usr-johan",
    details: "Ajustó tarifa base por hora de $28 a $30.",
    created_at: "2026-09-14T10:00:00Z",
  },
];
