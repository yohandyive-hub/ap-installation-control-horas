import * as XLSX from 'xlsx';
import { Report, SiteScope, Accessory } from '../types';
import { formatDateSpanish, extractTimeFromIso } from './dateUtils';

/**
 * Generates the WhatsApp daily message format currently used in the field.
 */
export function formatReportAsWhatsApp(report: Report): string {
  const dateFormatted = formatDateSpanish(report.work_date, { includeDayOfWeek: true });

  // Items string
  const itemParts: string[] = [];
  if (report.items && report.items.length > 0) {
    report.items.forEach(item => {
      let desc = `${item.quantity} ${item.accessory_name || 'ítem'}`;
      if (item.unit && item.unit !== 'each') {
        desc += ` (${item.unit})`;
      }
      if (item.measure_notes) {
        desc += ` [${item.measure_notes}]`;
      }
      itemParts.push(desc);
    });
  }

  // Activities string
  if (report.activities_performed && report.activities_performed.length > 0) {
    itemParts.push(`Actividades: ${report.activities_performed.join(', ')}`);
  }

  const productionStr = itemParts.length > 0 ? itemParts.join(', ') : 'Sin producción registrada';

  // Crew names
  const crewNames = report.crew && report.crew.length > 0
    ? report.crew.map(c => c.user_name || 'Instalador').join(', ')
    : 'Sin equipo';

  // Times (take range from first crew member or overall)
  let timeStr = 'Horario variado';
  if (report.crew && report.crew.length > 0) {
    const first = report.crew[0];
    const inTime = extractTimeFromIso(first.start_at);
    const outTime = extractTimeFromIso(first.end_at);
    timeStr = `${inTime} a ${outTime}`;
  }

  const siteStr = report.job_site_name || 'Sitio';
  const obsStr = report.observations ? `\n* Observaciones: ${report.observations}` : '';

  return `${dateFormatted} — ${productionStr} — ${crewNames} — ${timeStr} — ${siteStr}${obsStr}`;
}

export const generateWhatsAppReportText = formatReportAsWhatsApp;

/**
 * Copies plain text to clipboard safely
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Generates formatted WhatsApp text summary for an entire week
 */
export function generateWhatsAppWeeklySummary(reports: Report[], weekStart: string, weekEnd: string): string {
  const lines: string[] = [];
  lines.push(`📋 *AP INSTALLATION — RESUMEN SEMANAL*`);
  lines.push(`📅 Período: ${weekStart} al ${weekEnd}`);
  lines.push(`----------------------------------------`);

  // Group by date
  const reportsByDate: { [date: string]: Report[] } = {};
  reports.forEach(r => {
    if (!reportsByDate[r.work_date]) reportsByDate[r.work_date] = [];
    reportsByDate[r.work_date].push(r);
  });

  const sortedDates = Object.keys(reportsByDate).sort();

  sortedDates.forEach(date => {
    lines.push(`\n📌 *${formatDateSpanish(date, { includeDayOfWeek: true })}*`);
    reportsByDate[date].forEach(rep => {
      const crewList = rep.crew.map(c => `${c.user_name} (${c.hours.toFixed(1)}h)`).join(', ');
      const prodList = rep.items.map(i => `${i.quantity} ${i.accessory_name}`).join(', ') || 'Sin piezas';
      lines.push(`• *${rep.job_site_name}* (${rep.contractor_name || 'AP'})`);
      lines.push(`  👷 ${crewList}`);
      lines.push(`  🔨 ${prodList}`);
    });
  });

  const totalHours = reports.reduce(
    (sum, r) => sum + r.crew.reduce((s, c) => s + (c.is_supervisor_no_hours ? 0 : c.hours || 0), 0),
    0
  );

  lines.push(`\n----------------------------------------`);
  lines.push(`⏱️ *TOTAL HORAS SEMANA: ${totalHours.toFixed(1)} hrs*`);
  lines.push(`📝 *TOTAL REPORTES: ${reports.length}*`);

  return lines.join('\n');
}

/**
 * Exports site progress summary to Excel
 */
export function exportSiteProgressToExcel(summary: any) {
  const rows = [
    ...summary.items.map((it: any) => ({
      accessoryName: it.accessoryName,
      category: it.category,
      unit: it.unit,
      planned: it.planned,
      approved: it.approvedInstalled,
      submitted: it.submittedInstalled,
      totalInstalled: it.totalInstalled,
      remaining: it.remaining,
      percentage: it.percentage,
      isUnplanned: false,
    })),
    ...summary.unplannedItems.map((it: any) => ({
      accessoryName: it.accessoryName,
      category: it.category,
      unit: it.unit,
      planned: 0,
      approved: it.approvedInstalled,
      submitted: it.submittedInstalled,
      totalInstalled: it.totalInstalled,
      remaining: 0,
      percentage: 100,
      isUnplanned: true,
    })),
  ];

  exportProgressToExcel(summary.jobSite.name, rows);
}

/**
 * Exports reports to Excel (.xlsx) formatted in the exact weekly template
 * with columns: DATE, JOB SITE, CONTRACTOR, INSTALLERS, PRODUCTION, DESCRIPTION, INSTALLATION PRICE, TIME IN, TIME OUT, HOURS, PAY ROLL.
 */
export function exportReportsToExcel(reports: Report[], weekTitle: string = 'Reporte Semanal') {
  const rows: Array<Record<string, string | number>> = [];

  reports.forEach(report => {
    const dateStr = formatDateSpanish(report.work_date);
    const siteStr = report.job_site_name || '';
    const contractorStr = report.contractor_name || '';

    // Build production description
    const descParts: string[] = [];
    let totalPrice = 0;

    report.items.forEach(item => {
      let part = `${item.quantity} ${item.accessory_name || ''}`;
      if (item.measure_notes) part += ` (${item.measure_notes})`;
      descParts.push(part);
      if (item.line_total) totalPrice += item.line_total;
    });

    if (report.activities_performed && report.activities_performed.length > 0) {
      descParts.push(`[${report.activities_performed.join(', ')}]`);
    }

    const description = descParts.join(', ');

    // If there is crew, output a row per crew member (as in the real sheet)
    if (report.crew && report.crew.length > 0) {
      report.crew.forEach((crewMember, idx) => {
        const timeIn = extractTimeFromIso(crewMember.start_at);
        const timeOut = extractTimeFromIso(crewMember.end_at);
        const payroll = crewMember.hours * (crewMember.hourly_rate_snapshot || 0);

        rows.push({
          'DATE': idx === 0 ? dateStr : '',
          'JOB SITE': idx === 0 ? siteStr : '',
          'CONTRACTOR': idx === 0 ? contractorStr : '',
          'INSTALLERS': crewMember.user_name || '',
          'PRODUCTION': idx === 0 ? (report.items.length > 0 ? 1 : 0) : '',
          'DESCRIPTION': idx === 0 ? description : '',
          'INSTALLATION PRICE': idx === 0 ? (totalPrice > 0 ? totalPrice : '') : '',
          'TIME IN': timeIn,
          'TIME OUT': timeOut,
          'HOURS': crewMember.hours,
          'PAY ROLL': Math.round(payroll),
          'STATUS': report.status,
          'INCIDENT': report.incident_type !== 'ninguna' ? report.incident_type : '',
        });
      });
    } else {
      rows.push({
        'DATE': dateStr,
        'JOB SITE': siteStr,
        'CONTRACTOR': contractorStr,
        'INSTALLERS': 'N/A',
        'PRODUCTION': report.items.length > 0 ? 1 : 0,
        'DESCRIPTION': description,
        'INSTALLATION PRICE': totalPrice,
        'TIME IN': '',
        'TIME OUT': '',
        'HOURS': 0,
        'PAY ROLL': 0,
        'STATUS': report.status,
        'INCIDENT': '',
      });
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Semana');

  // Trigger file download
  const cleanTitle = weekTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  XLSX.writeFile(workbook, `AP_Installation_${cleanTitle}.xlsx`);
}

/**
 * Export progress data to Excel
 */
export function exportProgressToExcel(
  siteName: string,
  progressRows: Array<{
    accessoryName: string;
    category: string;
    unit: string;
    planned: number;
    approved: number;
    submitted: number;
    totalInstalled: number;
    remaining: number;
    percentage: number;
    isUnplanned: boolean;
  }>
) {
  const data = progressRows.map(row => ({
    'Accesorio / Actividad': row.accessoryName,
    'Categoría': row.category,
    'Unidad': row.unit,
    'Planificado': row.planned,
    'Aprobado': row.approved,
    'Pendiente (Enviado)': row.submitted,
    'Total Instalado': row.totalInstalled,
    'Falta': row.remaining,
    '% Avance': `${row.percentage.toFixed(1)}%`,
    'Tipo': row.isUnplanned ? 'Sin Planificar (Extra)' : 'En Alcance',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Avance');
  XLSX.writeFile(workbook, `Avance_${siteName.replace(/\s+/g, '_')}.xlsx`);
}
