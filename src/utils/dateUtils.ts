/**
 * Date and time utilities for AP Installation
 * Handles shifts, overnight (+1 day) calculations, week start/end, and rounding to 0.25h.
 */

export function isWeekend(dateStr: string): boolean {
  if (!dateStr) return false;
  // Parse date safely
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function formatDateSpanish(dateStr: string, options?: { includeDayOfWeek?: boolean; shortMonth?: boolean }): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const dayName = daysOfWeek[date.getDay()];
  const monthName = months[date.getMonth()];
  const formattedDay = String(day).padStart(2, '0');

  if (options?.includeDayOfWeek) {
    return `${dayName} ${formattedDay}/${String(month).padStart(2, '0')}`;
  }

  return `${formattedDay}-${monthName}`;
}

/**
 * Calculates decimal hours between start_time (HH:MM) and end_time (HH:MM),
 * taking into account overnight shifts (isNextDay).
 * Rounds to nearest 0.25h (15 minutes).
 */
export function calculateHours(startTime: string, endTime: string, isNextDay?: boolean): number {
  if (!startTime || !endTime) return 0;

  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  // Auto-detect next day if not explicitly specified and end <= start
  const crossesMidnight = isNextDay !== undefined ? isNextDay : endMinutes <= startMinutes;

  if (crossesMidnight) {
    endMinutes += 24 * 60;
  }

  const diffMinutes = endMinutes - startMinutes;
  if (diffMinutes <= 0) return 0;

  const hours = diffMinutes / 60;
  // Round to nearest 0.25 (15 min)
  return Math.round(hours * 4) / 4;
}

/**
 * Creates an ISO timestamp given a base date (YYYY-MM-DD), time (HH:MM), and optional next day flag.
 * Stores with Date.UTC so the hours and minutes are preserved literally without client-side timezone skew.
 */
export function createIsoTimestamp(dateStr: string, timeStr: string, isNextDay: boolean = false): string {
  if (!dateStr || !timeStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Store in UTC so .substring(11, 16) always returns the exact input time (e.g. 06:30, 07:00, 15:00)
  const date = new Date(Date.UTC(year, month - 1, day, hours || 0, minutes || 0, 0, 0));
  if (isNextDay) {
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return date.toISOString();
}

/**
 * Extracts HH:MM from an ISO timestamp or time string safely
 */
export function extractTimeFromIso(isoStr: string): string {
  if (!isoStr) return '07:00';
  if (isoStr.length === 5 && isoStr.includes(':')) return isoStr;
  if (isoStr.includes('T')) {
    return isoStr.substring(11, 16);
  }
  return isoStr.substring(0, 5);
}

/**
 * Formats a shift time range nicely, detecting next day crossing
 */
export function formatShiftTime(startAt: string, endAt: string): { label: string; crossesNextDay: boolean } {
  const startTime = extractTimeFromIso(startAt);
  const endTime = extractTimeFromIso(endAt);
  
  let crosses = false;
  if (startAt && endAt && startAt.includes('T') && endAt.includes('T')) {
    const startDatePart = startAt.substring(0, 10);
    const endDatePart = endAt.substring(0, 10);
    if (endDatePart > startDatePart) {
      crosses = true;
    }
  } else if (endTime <= startTime) {
    crosses = true;
  }

  const label = crosses ? `${startTime} a ${endTime} (+1 día)` : `${startTime} a ${endTime}`;
  return { label, crossesNextDay: crosses };
}

/**
 * Checks if ISO timestamp is on the day after base date
 */
export function isTimestampNextDay(baseDateStr: string, isoStr: string): boolean {
  if (!baseDateStr || !isoStr) return false;
  if (isoStr.includes('T')) {
    const targetDatePart = isoStr.substring(0, 10);
    return targetDatePart > baseDateStr;
  }
  return false;
}

/**
 * Given a date, returns the week identifier (e.g. Monday-Sunday boundaries)
 * and the Saturday date label (as used in the Excel sheets).
 */
export function getWeekDetails(dateStr: string, weekStartDay: number = 1) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const currentDay = d.getDay(); // 0 is Sun, 1 is Mon...

  // Distance to start of week (assuming 1 = Monday)
  const diffToStart = (currentDay - weekStartDay + 7) % 7;
  const startDate = new Date(d);
  startDate.setDate(d.getDate() - diffToStart);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Saturday date (for Excel label)
  const saturdayDate = new Date(startDate);
  saturdayDate.setDate(startDate.getDate() + 5);

  const toYmd = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const da = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  };

  const toLabel = (date: Date) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return {
    startStr: toYmd(startDate),
    endStr: toYmd(endDate),
    saturdayStr: toYmd(saturdayDate),
    weekKey: `${toYmd(startDate)}_to_${toYmd(endDate)}`,
    weekLabel: `Semana: ${toLabel(startDate)} – ${toLabel(endDate)} (Cierre Sáb ${saturdayDate.getDate()} ${monthsShort[saturdayDate.getMonth()]})`,
    saturdayLabel: `${saturdayDate.getDate()}-${monthsShort[saturdayDate.getMonth()]}.`,
  };
}

const monthsShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * Checks if two timestamp intervals overlap
 */
export function intervalsOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const s1 = new Date(start1).getTime();
  const e1 = new Date(end1).getTime();
  const s2 = new Date(start2).getTime();
  const e2 = new Date(end2).getTime();

  return Math.max(s1, s2) < Math.min(e1, e2);
}

/**
 * Format today as YYYY-MM-DD
 */
export function getTodayDateStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getTodayIso = getTodayDateStr;

export function getWeekDates(dateStr: string, weekStartDay: number = 1): { start: string; end: string } {
  const details = getWeekDetails(dateStr, weekStartDay);
  return {
    start: details.startStr,
    end: details.endStr,
  };
}

export const calculateShiftHours = calculateHours;
export const isWeekendDay = isWeekend;
export const formatDateFriendly = formatDateSpanish;

export function getShiftTimestamps(
  workDate: string,
  startTime: string,
  endTime: string,
  isNextDay: boolean = false
): { startAt: string; endAt: string; startIso: string; endIso: string; hours: number } {
  const startAt = createIsoTimestamp(workDate, startTime, false);
  const endAt = createIsoTimestamp(workDate, endTime, isNextDay);
  const hours = calculateHours(startTime, endTime, isNextDay);
  return { startAt, endAt, startIso: startAt, endIso: endAt, hours };
}
