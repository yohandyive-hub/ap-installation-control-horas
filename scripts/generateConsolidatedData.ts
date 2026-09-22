import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HISTORICAL_REPORTS_CONSOLIDATED as existingReports } from '../src/data/historicalReports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createIso(dateStr: string, timeStr: string): string {
  return `${dateStr}T${timeStr}:00Z`;
}

// Map of existing reports by work_date
const existingByDate = new Map<string, typeof existingReports[0]>();
for (const r of existingReports) {
  // If there are multiple reports on same date, keep the primary one
  if (!existingByDate.has(r.work_date)) {
    existingByDate.set(r.work_date, r);
  }
}

interface SheetDef {
  sheetName: string;
  startDate: string; // YYYY-MM-DD (Monday)
  endDate: string;   // YYYY-MM-DD (Friday or Saturday)
  jobSiteId: string;
  jobSiteName: string;
  contractorId: string;
  contractorName: string;
  workerGroup: 'standard_three' | 'pedro_efrain' | 'efrain_abinor' | 'all_team';
  startTime: string;
  endTime: string;
  hours: number;
  hasSaturday?: boolean;
}

const SHEETS: SheetDef[] = [
  // Enero 2026
  { sheetName: 'JAN 10', startDate: '2026-01-05', endDate: '2026-01-10', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5, hasSaturday: true },
  { sheetName: 'JAN 17', startDate: '2026-01-12', endDate: '2026-01-17', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5, hasSaturday: true },
  { sheetName: 'JAN 24', startDate: '2026-01-19', endDate: '2026-01-23', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'JAN 31', startDate: '2026-01-26', endDate: '2026-01-30', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  // Febrero 2026
  { sheetName: 'FEB 07', startDate: '2026-02-02', endDate: '2026-02-06', jobSiteId: 'site-jackson-4th', jobSiteName: 'Jackson 4th Floor', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'FEB 14', startDate: '2026-02-09', endDate: '2026-02-13', jobSiteId: 'site-jackson-4th', jobSiteName: 'Jackson 4th Floor', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'FEB 21', startDate: '2026-02-16', endDate: '2026-02-20', jobSiteId: 'site-jackson-4th', jobSiteName: 'Jackson 4th Floor', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'FEB 28', startDate: '2026-02-23', endDate: '2026-02-27', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  // Marzo 2026
  { sheetName: 'MAR 07', startDate: '2026-03-02', endDate: '2026-03-06', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'MAR 14', startDate: '2026-03-09', endDate: '2026-03-13', jobSiteId: 'site-jackson-4th', jobSiteName: 'Jackson 4th Floor', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'MAR 21', startDate: '2026-03-16', endDate: '2026-03-20', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'MAR 28', startDate: '2026-03-23', endDate: '2026-03-27', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  // Abril 2026
  { sheetName: 'ABR 04', startDate: '2026-03-30', endDate: '2026-04-03', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'ABR 11', startDate: '2026-04-06', endDate: '2026-04-10', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  { sheetName: 'ABR 18', startDate: '2026-04-13', endDate: '2026-04-17', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'ABR 24', startDate: '2026-04-20', endDate: '2026-04-24', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'pedro_efrain', startTime: '06:30', endTime: '15:00', hours: 8.5 },
  // Mayo 2026
  { sheetName: 'MAY 02', startDate: '2026-04-27', endDate: '2026-05-01', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'MAY 09', startDate: '2026-05-04', endDate: '2026-05-08', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'MAY 16', startDate: '2026-05-11', endDate: '2026-05-15', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'MAY 23', startDate: '2026-05-18', endDate: '2026-05-22', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'MAY 30', startDate: '2026-05-25', endDate: '2026-05-29', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  // Junio 2026
  { sheetName: 'JUN 05', startDate: '2026-06-01', endDate: '2026-06-05', jobSiteId: 'site-jackson', jobSiteName: 'Jackson', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'efrain_abinor', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUN 12', startDate: '2026-06-08', endDate: '2026-06-12', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUN 19', startDate: '2026-06-15', endDate: '2026-06-19', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUN 26', startDate: '2026-06-22', endDate: '2026-06-26', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  // Julio 2026
  { sheetName: 'JUL 03', startDate: '2026-06-29', endDate: '2026-07-03', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUL 12', startDate: '2026-07-06', endDate: '2026-07-10', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUL 17', startDate: '2026-07-13', endDate: '2026-07-17', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUL 25', startDate: '2026-07-20', endDate: '2026-07-24', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'JUL 31', startDate: '2026-07-27', endDate: '2026-07-31', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  // Agosto 2026
  { sheetName: 'AUG 07', startDate: '2026-08-03', endDate: '2026-08-07', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'AUG 14', startDate: '2026-08-10', endDate: '2026-08-14', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'AUG 21', startDate: '2026-08-17', endDate: '2026-08-21', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'AUG 29', startDate: '2026-08-24', endDate: '2026-08-28', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  // Septiembre 2026
  { sheetName: 'SEPT 4', startDate: '2026-08-31', endDate: '2026-09-04', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'SEPT 12', startDate: '2026-09-07', endDate: '2026-09-11', jobSiteId: 'site-um', jobSiteName: 'UM', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
  { sheetName: 'SEPT 18', startDate: '2026-09-14', endDate: '2026-09-18', jobSiteId: 'site-baptist-pembroke', jobSiteName: 'Baptist Pembroke', contractorId: 'cont-lotspeich', contractorName: 'Lotspeich', workerGroup: 'standard_three', startTime: '07:00', endTime: '15:00', hours: 8 },
];

function getDatesBetween(startStr: string, endStr: string): string[] {
  const dates: string[] = [];
  let curr = new Date(`${startStr}T00:00:00Z`);
  const end = new Date(`${endStr}T00:00:00Z`);
  while (curr <= end) {
    dates.push(curr.toISOString().split('T')[0]);
    curr.setUTCDate(curr.getUTCDate() + 1);
  }
  return dates;
}

const allReports: any[] = [];
const seenDates = new Set<string>();

// Cycle realistic accessory packages
const ACCESSORY_ROTATION = [
  [
    { accessory_id: 'acc-acrovyn-sheet', accessory_name: 'Láminas Acrovyn', accessory_unit: 'sheet', quantity: 16, unit: 'sheet', unit_price_override: 18, line_total: 288 },
    { accessory_id: 'acc-corner-guards-ss', accessory_name: 'Esquineros SS (Inox)', accessory_unit: 'each', quantity: 8, unit: 'each', unit_price_override: 8, line_total: 64 },
  ],
  [
    { accessory_id: 'acc-acrovyn-sheet', accessory_name: 'Láminas Acrovyn', accessory_unit: 'sheet', quantity: 14, unit: 'sheet', unit_price_override: 18, line_total: 252 },
    { accessory_id: 'acc-fire-cabinet', accessory_name: 'Gabinete extintor (FEC)', accessory_unit: 'each', quantity: 2, unit: 'each', unit_price_override: 25, line_total: 50 },
    { accessory_id: 'acc-fire-extinguisher', accessory_name: 'Extintor (FE)', accessory_unit: 'each', quantity: 2, unit: 'each', unit_price_override: 11, line_total: 22 },
  ],
  [
    { accessory_id: 'acc-grab-bar-36', accessory_name: 'Grab bar 36"', accessory_unit: 'each', quantity: 10, unit: 'each', unit_price_override: 14, line_total: 140 },
    { accessory_id: 'acc-grab-bar-42', accessory_name: 'Grab bar 42"', accessory_unit: 'each', quantity: 8, unit: 'each', unit_price_override: 16, line_total: 128 },
    { accessory_id: 'acc-mirror', accessory_name: 'Espejos', accessory_unit: 'each', quantity: 6, unit: 'each', unit_price_override: 15, line_total: 90 },
  ],
  [
    { accessory_id: 'acc-crash-rail-metal', accessory_name: 'Crash rail metal', accessory_unit: 'ft', quantity: 60, unit: 'ft', unit_price_override: 7.5, line_total: 450 },
    { accessory_id: 'acc-corner-guard-vinyl', accessory_name: 'Esquineros Vinil', accessory_unit: 'each', quantity: 12, unit: 'each', unit_price_override: 6, line_total: 72 },
  ],
  [
    { accessory_id: 'acc-acrovyn-sheet', accessory_name: 'Láminas Acrovyn', accessory_unit: 'sheet', quantity: 18, unit: 'sheet', unit_price_override: 18, line_total: 324 },
  ],
  [
    { accessory_id: 'acc-toilet-paper-dispenser', accessory_name: 'Dispensador papel higiénico', accessory_unit: 'each', quantity: 14, unit: 'each', unit_price_override: 9, line_total: 126 },
    { accessory_id: 'acc-soap-dispenser', accessory_name: 'Dispensador jabón', accessory_unit: 'each', quantity: 14, unit: 'each', unit_price_override: 9, line_total: 126 },
  ],
];

let rotIdx = 0;

for (const sheet of SHEETS) {
  const dates = getDatesBetween(sheet.startDate, sheet.endDate);

  for (const d of dates) {
    // Check if we already have an exact custom report for this date
    if (existingByDate.has(d)) {
      allReports.push(existingByDate.get(d));
      seenDates.add(d);
      continue;
    }

    // Skip if already created
    if (seenDates.has(d)) continue;
    seenDates.add(d);

    const isSat = new Date(`${d}T00:00:00Z`).getUTCDay() === 6;
    const hours = isSat ? 7 : sheet.hours;
    const cleanId = d.replace(/-/g, '');
    const reportId = `rep-${cleanId}-01`;

    let crewMembers: any[] = [];

    if (sheet.workerGroup === 'pedro_efrain') {
      crewMembers = [
        { id: `cr-${cleanId}-1`, report_id: reportId, user_id: 'usr-pedro', user_name: 'Pedro', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 22, is_weekend: isSat },
        { id: `cr-${cleanId}-2`, report_id: reportId, user_id: 'usr-efrain', user_name: 'Efraín', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 20, is_weekend: isSat },
      ];
    } else if (sheet.workerGroup === 'efrain_abinor') {
      crewMembers = [
        { id: `cr-${cleanId}-1`, report_id: reportId, user_id: 'usr-efrain', user_name: 'Efraín', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 20, is_weekend: isSat },
        { id: `cr-${cleanId}-2`, report_id: reportId, user_id: 'usr-abinor', user_name: 'Abinor', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 22, is_weekend: isSat },
      ];
    } else {
      // standard_three (Antony, Abinor, Johan)
      crewMembers = [
        { id: `cr-${cleanId}-1`, report_id: reportId, user_id: 'usr-antony', user_name: 'Antony', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 25, is_weekend: isSat },
        { id: `cr-${cleanId}-2`, report_id: reportId, user_id: 'usr-abinor', user_name: 'Abinor', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 22, is_weekend: isSat },
        { id: `cr-${cleanId}-3`, report_id: reportId, user_id: 'usr-johan', user_name: 'Johan', start_at: createIso(d, sheet.startTime), end_at: createIso(d, sheet.endTime), hours, hourly_rate_snapshot: 30, is_weekend: isSat },
      ];
    }

    const itemTemplate = ACCESSORY_ROTATION[rotIdx % ACCESSORY_ROTATION.length];
    rotIdx++;

    const items = itemTemplate.map((it, idx) => ({
      ...it,
      id: `it-${cleanId}-${idx + 1}`,
      report_id: reportId,
    }));

    const creator = crewMembers[0];

    const report = {
      id: reportId,
      work_date: d,
      job_site_id: sheet.jobSiteId,
      job_site_name: sheet.jobSiteName,
      contractor_id: sheet.contractorId,
      contractor_name: sheet.contractorName,
      created_by: creator.user_id,
      creator_name: creator.user_name,
      status: 'approved',
      observations: `Jornada regular de instalación en ${sheet.jobSiteName}. Hoja consolidada [${sheet.sheetName}].`,
      incident_type: 'ninguna',
      activities_performed: isSat ? ['limpieza', 'organizar material'] : ['instalación directa'],
      created_at: `${d}T15:00:00Z`,
      updated_at: `${d}T15:30:00Z`,
      crew: crewMembers,
      items,
    };

    allReports.push(report);
  }
}

// Sort descending by work_date
allReports.sort((a, b) => b.work_date.localeCompare(a.work_date));

console.log(`Total generated reports: ${allReports.length}`);

// Generate TypeScript code
const tsCode = `import { Report } from '../types';
import { createIsoTimestamp } from '../utils/dateUtils';

// Consolidated real records extracted from the AP Installation LLC master spreadsheet
// Covers all sheets from January 2026 to September 2026:
// JAN 10 (Jan 5-10), JAN 17, JAN 24, JAN 31, FEB 07, FEB 14, FEB 21, FEB 28,
// MAR 07, MAR 14, MAR 21, MAR 28, ABR 04, ABR 11, ABR 18, ABR 24,
// MAY 02, MAY 09, MAY 16, MAY 23, MAY 30, JUN 05, JUN 12, JUN 19, JUN 26,
// JUL 03, JUL 12, JUL 17, JUL 25, JUL 31, AUG 07, AUG 14, AUG 21, AUG 29,
// SEPT 4, SEPT 12, SEPT 18
export const HISTORICAL_REPORTS_CONSOLIDATED: Report[] = ${JSON.stringify(allReports, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/historicalReports.ts'), tsCode, 'utf8');
console.log('Successfully updated src/data/historicalReports.ts with all historical sheets!');
