import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  DollarSign,
  Users,
  Building2,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  CheckCircle2,
  TrendingUp,
  Lock,
  Shield,
  User,
  Briefcase,
} from 'lucide-react';
import { getWeekDates, getTodayIso, formatDateSpanish, formatShiftTime, extractTimeFromIso } from '../../utils/dateUtils';
import * as XLSX from 'xlsx';

type TimeRangePreset = 'this_week' | 'last_week' | 'this_month' | 'last_30_days' | 'all' | 'custom';

interface WorkerShiftDetail {
  reportId: string;
  workDate: string;
  jobSiteName: string;
  startAt: string;
  endAt: string;
  hours: number;
  rate: number;
  totalPay: number;
  status: string;
}

interface WorkerHourSummary {
  userId: string;
  name: string;
  role: string;
  defaultRate: number;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  totalPay: number;
  daysCount: number;
  sitesBreakdown: { [siteName: string]: number };
  shifts: WorkerShiftDetail[];
}

export const WorkerHoursMetrics: React.FC = () => {
  const { reports, profiles, jobSites, settings, currentUser, activeRole, getPermissionScope, showToast } = useApp();

  // Determine effective role & scope
  const effectiveRole = (currentUser?.role === 'admin' ? activeRole : currentUser?.role) || 'installer';
  const permissionScope = getPermissionScope('hourly_rates');
  const isOwnOnly = permissionScope === 'own' || effectiveRole === 'installer';

  // Active installers list for simulation selector in admin preview
  const activeInstallers = useMemo(
    () => profiles.filter(p => p.role === 'installer'),
    [profiles]
  );

  // If admin is previewing the installer role, allow switching which installer to simulate
  const [previewWorkerId, setPreviewWorkerId] = useState<string>(() => {
    return activeInstallers[0]?.id || currentUser?.id || '';
  });

  // Target user id for single-installer view
  const targetUserId = currentUser?.role === 'installer' ? currentUser.id : previewWorkerId;
  const targetUser = profiles.find(p => p.id === targetUserId) || currentUser;

  const [preset, setPreset] = useState<TimeRangePreset>('all');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'approved_and_submitted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal for detailed shifts of a selected worker (used in team view)
  const [selectedWorkerForModal, setSelectedWorkerForModal] = useState<WorkerHourSummary | null>(null);
  const [modalViewMode, setModalViewMode] = useState<'filtered' | 'all'>('filtered');

  // Calculate Start & End Date depending on Preset
  const { startDate, endDate } = useMemo(() => {
    const today = getTodayIso(); // 2026-09-21
    const { start, end } = getWeekDates(today, settings?.week_start_day || 1);

    if (preset === 'this_week') {
      return { startDate: start, endDate: end };
    }
    if (preset === 'last_week') {
      const d = new Date(start + 'T00:00:00');
      d.setDate(d.getDate() - 7);
      const lastWeekStart = d.toISOString().split('T')[0];
      const dEnd = new Date(lastWeekStart + 'T00:00:00');
      dEnd.setDate(dEnd.getDate() + 6);
      const lastWeekEnd = dEnd.toISOString().split('T')[0];
      return { startDate: lastWeekStart, endDate: lastWeekEnd };
    }
    if (preset === 'this_month') {
      const parts = today.split('-');
      const y = parts[0];
      const m = parts[1];
      const startOfMonth = `${y}-${m}-01`;
      const nextMonth = new Date(Number(y), Number(m), 0);
      const endOfMonth = nextMonth.toISOString().split('T')[0];
      return { startDate: startOfMonth, endDate: endOfMonth };
    }
    if (preset === 'last_30_days') {
      const d = new Date(today + 'T00:00:00');
      d.setDate(d.getDate() - 30);
      return { startDate: d.toISOString().split('T')[0], endDate: today };
    }
    if (preset === 'custom') {
      return {
        startDate: customStart || '2026-01-01',
        endDate: customEnd || today,
      };
    }
    // 'all'
    return { startDate: '2026-01-01', endDate: today };
  }, [preset, customStart, customEnd, settings?.week_start_day]);

  // Aggregate worker summaries across reports
  const { workerSummaries, totalTeamHours, totalTeamPayroll, activeWorkerCount, avgHoursPerWorker } =
    useMemo(() => {
      // Create map of profiles to track
      const summariesMap: { [userId: string]: WorkerHourSummary } = {};

      profiles.forEach(p => {
        summariesMap[p.id] = {
          userId: p.id,
          name: p.full_name,
          role: p.role,
          defaultRate: p.default_hourly_rate || 20,
          totalHours: 0,
          regularHours: 0,
          overtimeHours: 0,
          totalPay: 0,
          daysCount: 0,
          sitesBreakdown: {},
          shifts: [],
        };
      });

      // Filter reports within date range, job site & status
      const relevantReports = reports.filter(r => {
        if (r.status === 'draft') return false;
        if (statusFilter === 'approved' && r.status !== 'approved') return false;
        if (
          statusFilter === 'approved_and_submitted' &&
          r.status !== 'approved' &&
          r.status !== 'submitted'
        )
          return false;
        if (siteFilter !== 'all' && r.job_site_id !== siteFilter) return false;
        if (r.work_date < startDate || r.work_date > endDate) return false;
        return true;
      });

      // Track days worked per user to prevent duplicate day counting
      const userWorkDays = new Map<string, Set<string>>();

      relevantReports.forEach(r => {
        r.crew.forEach(c => {
          if (!c.user_id) return;
          if (c.is_supervisor_no_hours) return;

          if (!summariesMap[c.user_id]) {
            const nameFallback = c.user_name || 'Trabajador';
            summariesMap[c.user_id] = {
              userId: c.user_id,
              name: nameFallback,
              role: 'installer',
              defaultRate: c.hourly_rate_snapshot || 20,
              totalHours: 0,
              regularHours: 0,
              overtimeHours: 0,
              totalPay: 0,
              daysCount: 0,
              sitesBreakdown: {},
              shifts: [],
            };
          }

          const summary = summariesMap[c.user_id];
          const hours = Number(c.hours) || 0;
          const rate = c.hourly_rate_snapshot || summary.defaultRate;
          const pay = hours * rate;

          summary.totalHours += hours;
          summary.totalPay += pay;

          // Track site
          const siteName = r.job_site_name || 'Sin especificar';
          summary.sitesBreakdown[siteName] = (summary.sitesBreakdown[siteName] || 0) + hours;

          // Track unique work days
          if (!userWorkDays.has(c.user_id)) {
            userWorkDays.set(c.user_id, new Set());
          }
          userWorkDays.get(c.user_id)!.add(r.work_date);

          // Add shift details
          summary.shifts.push({
            reportId: r.id,
            workDate: r.work_date,
            jobSiteName: siteName,
            startAt: c.start_at || '',
            endAt: c.end_at || '',
            hours,
            rate,
            totalPay: pay,
            status: r.status,
          });
        });
      });

      // Finalize summaries
      const list: WorkerHourSummary[] = Object.values(summariesMap).map(s => {
        const days = userWorkDays.get(s.userId)?.size || 0;
        const overtimeThreshold = settings?.overtime_weekly_threshold || 40;
        let regular = s.totalHours;
        let overtime = 0;
        if (preset === 'this_week' && s.totalHours > overtimeThreshold) {
          overtime = s.totalHours - overtimeThreshold;
          regular = overtimeThreshold;
        }

        s.shifts.sort((a, b) => b.workDate.localeCompare(a.workDate));

        return {
          ...s,
          daysCount: days,
          regularHours: regular,
          overtimeHours: overtime,
        };
      });

      // Filter by search query & role
      const filtered = list.filter(w => {
        if (w.role === 'admin') return false;
        if (searchQuery.trim() === '') return true;
        return w.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

      filtered.sort((a, b) => b.totalHours - a.totalHours);

      const totalHours = filtered.reduce((acc, w) => acc + w.totalHours, 0);
      const totalPay = filtered.reduce((acc, w) => acc + w.totalPay, 0);
      const activeCount = filtered.filter(w => w.totalHours > 0).length;
      const avg = activeCount > 0 ? totalHours / activeCount : 0;

      return {
        workerSummaries: filtered,
        totalTeamHours: totalHours,
        totalTeamPayroll: totalPay,
        activeWorkerCount: activeCount,
        avgHoursPerWorker: avg,
      };
    }, [
      reports,
      profiles,
      startDate,
      endDate,
      siteFilter,
      statusFilter,
      searchQuery,
      preset,
      settings?.overtime_weekly_threshold,
    ]);

  // Target worker summary for single-installer view
  const targetWorkerSummary = useMemo(() => {
    return (
      workerSummaries.find(w => w.userId === targetUserId) || {
        userId: targetUserId,
        name: targetUser?.full_name || 'Instalador',
        role: 'installer',
        defaultRate: targetUser?.default_hourly_rate || 20,
        totalHours: 0,
        regularHours: 0,
        overtimeHours: 0,
        totalPay: 0,
        daysCount: 0,
        sitesBreakdown: {},
        shifts: [],
      }
    );
  }, [workerSummaries, targetUserId, targetUser]);

  // Compute all historical shifts for modal or single user
  const allShiftsForSelectedWorker = useMemo(() => {
    const uid = selectedWorkerForModal?.userId || targetUserId;
    if (!uid) return [];
    const allList: WorkerShiftDetail[] = [];

    reports.forEach(r => {
      if (r.status === 'draft') return;
      r.crew.forEach(c => {
        if (c.user_id === uid && !c.is_supervisor_no_hours) {
          const hours = Number(c.hours) || 0;
          const rate = c.hourly_rate_snapshot || targetWorkerSummary.defaultRate;
          allList.push({
            reportId: r.id,
            workDate: r.work_date,
            jobSiteName: r.job_site_name || 'Sin especificar',
            startAt: c.start_at || '',
            endAt: c.end_at || '',
            hours,
            rate,
            totalPay: hours * rate,
            status: r.status,
          });
        }
      });
    });

    return allList.sort((a, b) => b.workDate.localeCompare(a.workDate));
  }, [reports, selectedWorkerForModal, targetUserId, targetWorkerSummary]);

  const maxHours = useMemo(() => {
    return Math.max(...workerSummaries.map(w => w.totalHours), 1);
  }, [workerSummaries]);

  // Export to Excel for Single Installer (Only their own data!)
  const handleExportPersonalExcel = () => {
    try {
      const dataToExport = targetWorkerSummary.shifts.map(s => ({
        Fecha: s.workDate,
        Obra: s.jobSiteName,
        Entrada: extractTimeFromIso(s.startAt),
        Salida: extractTimeFromIso(s.endAt),
        'Horas Trabajadas': s.hours,
        'Tarifa ($/h)': s.rate,
        'Total a Cobrar ($)': Number(s.totalPay.toFixed(2)),
        Estado: s.status === 'approved' ? 'Aprobado' : 'Enviado',
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Mis Horas');

      const filename = `Mis_Horas_${targetWorkerSummary.name.replace(/\s+/g, '_')}_${startDate}_a_${endDate}.xlsx`;
      XLSX.writeFile(wb, filename);
      showToast('Tus horas se han descargado con éxito', 'success');
    } catch (err) {
      console.error(err);
      showToast('Error al exportar Excel', 'error');
    }
  };

  // Export to Excel for Full Team (Only used when isOwnOnly is false)
  const handleExportTeamExcel = () => {
    try {
      const dataToExport = workerSummaries
        .filter(w => w.totalHours > 0)
        .map(w => ({
          Instalador: w.name,
          'Tarifa $/h': w.defaultRate,
          'Total Horas': Number(w.totalHours.toFixed(2)),
          'Horas Regulares': Number(w.regularHours.toFixed(2)),
          'Horas Extra': Number(w.overtimeHours.toFixed(2)),
          'Días Trabajados': w.daysCount,
          'Nómina Estimada ($)': Number(w.totalPay.toFixed(2)),
          Obras: Object.entries(w.sitesBreakdown)
            .map(([site, h]) => `${site} (${h.toFixed(1)}h)`)
            .join(', '),
        }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Horas por Instalador');

      const allShifts: any[] = [];
      workerSummaries.forEach(w => {
        w.shifts.forEach(s => {
          allShifts.push({
            Instalador: w.name,
            Fecha: s.workDate,
            Obra: s.jobSiteName,
            Entrada: extractTimeFromIso(s.startAt),
            Salida: extractTimeFromIso(s.endAt),
            Horas: s.hours,
            'Tarifa ($/h)': s.rate,
            'Total ($)': Number(s.totalPay.toFixed(2)),
            Estado: s.status,
          });
        });
      });
      if (allShifts.length > 0) {
        const wsShifts = XLSX.utils.json_to_sheet(allShifts);
        XLSX.utils.book_append_sheet(wb, wsShifts, 'Detalle de Jornadas');
      }

      const filename = `AP_Horas_Consolidado_${startDate}_a_${endDate}.xlsx`;
      XLSX.writeFile(wb, filename);
      showToast('Exportación descargada con éxito', 'success');
    } catch (err) {
      console.error(err);
      showToast('Error al exportar Excel', 'error');
    }
  };

  // =========================================================================
  // VIEW 1: SINGLE INSTALLER (PERSONAL DATA ONLY - COWORKERS HIDDEN)
  // =========================================================================
  if (isOwnOnly) {
    return (
      <div className="space-y-4 text-slate-100">
        {/* Admin Preview Switcher Banner (Only shown if admin is previewing) */}
        {currentUser?.role === 'admin' && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Modo Previsualización:</strong> Estás viendo el módulo Horas exactamente como lo ve un instalador. Los datos de sus compañeros están completamente ocultos.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 whitespace-nowrap">Simular instalador:</span>
              <select
                value={previewWorkerId}
                onChange={e => setPreviewWorkerId(e.target.value)}
                className="py-1 px-3 rounded-xl bg-slate-900 text-amber-300 border border-amber-500/40 font-bold focus:outline-hidden"
              >
                {activeInstallers.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.full_name} (${inst.default_hourly_rate || 20}/h)
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-white">
                  Mis Horas Trabajadas
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {targetWorkerSummary.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Período: <strong className="text-slate-200">{formatDateSpanish(startDate)} al {formatDateSpanish(endDate)}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleExportPersonalExcel}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 active:scale-95 transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar Mis Horas (.xlsx)</span>
          </button>
        </div>

        {/* 4 Personal KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Total Hours */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Mis Horas Totales</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-mono font-black text-amber-400">
              {targetWorkerSummary.totalHours.toFixed(1)}h
            </p>
            <span className="text-[10px] text-slate-400">
              En el período seleccionado
            </span>
          </div>

          {/* Card 2: Days Worked */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Jornadas Realizadas</span>
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-mono font-black text-white">
              {targetWorkerSummary.daysCount} <span className="text-sm font-normal text-slate-400">días</span>
            </p>
            <span className="text-[10px] text-slate-400">
              Turnos registrados con horas
            </span>
          </div>

          {/* Card 3: Hourly Rate */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Mi Tarifa Base</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-mono font-black text-purple-300">
              ${targetWorkerSummary.defaultRate}.00<span className="text-xs font-normal text-slate-400">/h</span>
            </p>
            <span className="text-[10px] text-slate-400">
              Tarifa acordada
            </span>
          </div>

          {/* Card 4: Estimated Pay */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Nómina Estimada</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${targetWorkerSummary.totalPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[10px] text-slate-400">
              Total acumulado en el rango
            </span>
          </div>
        </div>

        {/* Filters & Range Controls */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setPreset('this_week')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'this_week'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => setPreset('last_week')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'last_week'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Semana Anterior
            </button>
            <button
              onClick={() => setPreset('this_month')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'this_month'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Mes Actual
            </button>
            <button
              onClick={() => setPreset('last_30_days')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'last_30_days'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Últimos 30 Días
            </button>
            <button
              onClick={() => setPreset('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Todo el Histórico
            </button>
            <button
              onClick={() => setPreset('custom')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                preset === 'custom'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Personalizado
            </button>
          </div>

          {preset === 'custom' && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Desde:</span>
                <input
                  type="date"
                  value={customStart}
                  onChange={e => setCustomStart(e.target.value)}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Hasta:</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono"
                />
              </div>
            </div>
          )}

          {/* Job Site filter & Summary Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={siteFilter}
                onChange={e => setSiteFilter(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold focus:outline-hidden"
              >
                <option value="all">Todas las Obras</option>
                {jobSites.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sites worked breakdown */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Mis Obras:</span>
              {Object.keys(targetWorkerSummary.sitesBreakdown).length === 0 ? (
                <span className="text-slate-500 italic text-[11px]">Sin horas en este rango</span>
              ) : (
                Object.entries(targetWorkerSummary.sitesBreakdown).map(([site, h]) => (
                  <span
                    key={site}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950 border border-slate-800 text-slate-300"
                  >
                    {site}: <strong className="text-amber-400">{h.toFixed(1)}h</strong>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Detailed Shifts Table (Strictly this installer's shifts only) */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Historial Detallado de Mis Jornadas</span>
            </h3>
            <span className="text-xs text-slate-400">
              {targetWorkerSummary.shifts.length} {targetWorkerSummary.shifts.length === 1 ? 'jornada registrada' : 'jornadas registradas'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-3">Obra</th>
                  <th className="py-3 px-3">Horario</th>
                  <th className="py-3 px-3">Horas</th>
                  <th className="py-3 px-3">Tarifa</th>
                  <th className="py-3 px-3">Pago Turno</th>
                  <th className="py-3 px-4 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {targetWorkerSummary.shifts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No tienes jornadas u horas registradas en el período seleccionado.
                    </td>
                  </tr>
                ) : (
                  targetWorkerSummary.shifts.map((shift, idx) => {
                    const timeInfo = formatShiftTime(shift.startAt, shift.endAt);
                    return (
                      <tr
                        key={`${shift.reportId}-${shift.workDate}-${idx}`}
                        className="hover:bg-slate-850/60 transition-colors"
                      >
                        {/* Fecha */}
                        <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                          {formatDateSpanish(shift.workDate, { includeDayOfWeek: true })}
                        </td>

                        {/* Obra */}
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-slate-200">
                            {shift.jobSiteName}
                          </span>
                        </td>

                        {/* Horario */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {timeInfo.label}
                        </td>

                        {/* Horas */}
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono font-bold text-amber-400">
                          {shift.hours.toFixed(2)}h
                        </td>

                        {/* Tarifa */}
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono text-slate-300">
                          ${shift.rate}/h
                        </td>

                        {/* Total Pay */}
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono font-bold text-emerald-400 text-sm">
                          ${shift.totalPay.toFixed(2)}
                        </td>

                        {/* Estado */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              shift.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {shift.status === 'approved' ? 'Aprobado ✓' : 'Enviado'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>
              <strong>Privacidad garantizada:</strong> Esta vista está estrictamente restringida a tus datos personales. No se muestran horas, tarifas ni nómina de tus compañeros.
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Total Jornadas: {targetWorkerSummary.shifts.length}
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL TEAM VIEW (FOR ADMIN AND SUPERVISOR)
  // =========================================================================
  return (
    <div className="space-y-4 text-slate-100">
      {/* Header bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white">
              Métricas de Horas Trabajadas por Instalador
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Período:{' '}
            <strong className="text-slate-200">
              {formatDateSpanish(startDate)} al {formatDateSpanish(endDate)}
            </strong>
          </p>
        </div>

        <button
          onClick={handleExportTeamExcel}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 active:scale-95 transition"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Exportar Horas (.xlsx)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Horas</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-mono font-black text-amber-400">
            {totalTeamHours.toFixed(1)}h
          </p>
          <span className="text-[10px] text-slate-400">
            Registradas en el período
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Instaladores Activos</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">
            {activeWorkerCount}
          </p>
          <span className="text-[10px] text-slate-400">
            Con horas en este rango
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Promedio / Instalador</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-mono font-black text-purple-300">
            {avgHoursPerWorker.toFixed(1)}h
          </p>
          <span className="text-[10px] text-slate-400">
            Horas promedio por persona
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Nómina Total en Horas</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-mono font-black text-emerald-400">
            ${totalTeamPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-slate-400">
            Cálculo según tarifas individuales
          </span>
        </div>
      </div>

      {/* Filter and Period Controls */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setPreset('this_week')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'this_week'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Esta Semana
          </button>
          <button
            onClick={() => setPreset('last_week')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'last_week'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Semana Anterior
          </button>
          <button
            onClick={() => setPreset('this_month')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'this_month'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Mes Actual
          </button>
          <button
            onClick={() => setPreset('last_30_days')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'last_30_days'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Últimos 30 Días
          </button>
          <button
            onClick={() => setPreset('all')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todo el Histórico
          </button>
          <button
            onClick={() => setPreset('custom')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              preset === 'custom'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Personalizado
          </button>
        </div>

        {preset === 'custom' && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Desde:</span>
              <input
                type="date"
                value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="py-1.5 px-2.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Hasta:</span>
              <input
                type="date"
                value={customEnd}
                onChange={e => setCustomEnd(e.target.value)}
                className="py-1.5 px-2.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono"
              />
            </div>
          </div>
        )}

        {/* Secondary filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar instalador..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div>
            <select
              value={siteFilter}
              onChange={e => setSiteFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Todas las Obras</option>
              {jobSites.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Todos los Reportes</option>
              <option value="approved">Solo Reportes Aprobados</option>
              <option value="approved_and_submitted">Aprobados y Enviados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Breakdown: Table for full team */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Desglose Detallado por Empleado</span>
          </h3>
          <span className="text-xs text-slate-400">
            {workerSummaries.filter(w => w.totalHours > 0).length} con horas registradas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Instalador</th>
                <th className="py-3 px-3">Tarifa Base</th>
                <th className="py-3 px-3">Horas Totales</th>
                <th className="py-3 px-3">Jornadas</th>
                <th className="py-3 px-3">Obras donde trabajó</th>
                <th className="py-3 px-3">Nómina Est.</th>
                <th className="py-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {workerSummaries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No se encontraron instaladores con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                workerSummaries.map(worker => {
                  const pctOfMax = (worker.totalHours / maxHours) * 100;
                  const isOvertime = worker.totalHours > 40 && preset === 'this_week';

                  return (
                    <tr
                      key={worker.userId}
                      className="hover:bg-slate-850/60 transition-colors group"
                    >
                      <td className="py-3.5 px-4 min-w-[150px]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                            {worker.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white leading-tight">
                              {worker.name}
                            </p>
                            <span className="text-[10px] text-slate-400 capitalize">
                              {worker.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap font-mono font-semibold text-slate-300">
                        ${worker.defaultRate}/h
                      </td>

                      <td className="py-3.5 px-3 min-w-[130px]">
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className={`font-mono font-bold text-sm ${
                                isOvertime ? 'text-amber-400' : 'text-white'
                              }`}
                            >
                              {worker.totalHours.toFixed(1)}h
                            </span>
                            {isOvertime && (
                              <span className="text-[10px] font-semibold text-amber-400/90">
                                ({worker.overtimeHours.toFixed(1)}h OT)
                              </span>
                            )}
                          </div>
                          <div className="w-24 h-1.5 rounded-full bg-slate-950 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-amber-400 transition-all duration-300"
                              style={{ width: `${pctOfMax}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap font-mono text-slate-300">
                        <span className="font-semibold text-white">{worker.daysCount}</span>{' '}
                        <span className="text-[11px] text-slate-500">días</span>
                      </td>

                      <td className="py-3.5 px-3 min-w-[170px]">
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(worker.sitesBreakdown).length === 0 ? (
                            <span className="text-slate-500 italic text-[11px]">
                              Sin obras registradas
                            </span>
                          ) : (
                            Object.entries(worker.sitesBreakdown).map(([site, h]) => (
                              <span
                                key={site}
                                className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950 border border-slate-800 text-slate-300"
                              >
                                {site}: <strong className="text-amber-400">{h.toFixed(1)}h</strong>
                              </span>
                            ))
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap font-mono font-bold text-emerald-400 text-sm">
                        ${worker.totalPay.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedWorkerForModal(worker)}
                          disabled={worker.shifts.length === 0}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center gap-1 ml-auto disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ver Jornadas</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Detailed Shifts of a selected installer in team view */}
      {selectedWorkerForModal && (() => {
        const displayedShifts =
          modalViewMode === 'filtered'
            ? selectedWorkerForModal.shifts
            : allShiftsForSelectedWorker;

        const displayedHours = displayedShifts.reduce((acc, s) => acc + s.hours, 0);
        const displayedPay = displayedShifts.reduce((acc, s) => acc + s.totalPay, 0);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
            <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Historial de Turnos y Jornadas
                    </span>
                    <h3 className="font-bold text-lg text-white">
                      {selectedWorkerForModal.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedWorkerForModal(null);
                      setModalViewMode('filtered');
                    }}
                    className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-850">
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setModalViewMode('filtered')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        modalViewMode === 'filtered'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Período filtrado ({selectedWorkerForModal.shifts.length})
                    </button>
                    <button
                      onClick={() => setModalViewMode('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        modalViewMode === 'all'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Histórico completo ({allShiftsForSelectedWorker.length})
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">
                      {modalViewMode === 'filtered'
                        ? `Período: ${startDate} al ${endDate}`
                        : 'Total Consolidado Histórico'}
                    </span>
                    <span className="font-mono font-bold text-amber-400 text-sm mr-2">
                      {displayedHours.toFixed(2)}h
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      ${displayedPay.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
                {displayedShifts.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    No hay turnos registrados para este instalador en la vista seleccionada.
                  </div>
                ) : (
                  displayedShifts.map((shift, idx) => {
                    const timeInfo = formatShiftTime(shift.startAt, shift.endAt);
                    return (
                      <div
                        key={`${shift.reportId}-${shift.workDate}-${idx}`}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-sm">
                              {formatDateSpanish(shift.workDate, { includeDayOfWeek: true })}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              {shift.jobSiteName}
                            </span>
                          </div>

                          <p className="text-slate-400 text-[11px]">
                            Horario:{' '}
                            <span className="text-slate-200 font-mono font-semibold">
                              {timeInfo.label}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-850">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] text-slate-500 block">Horas & Tarifa</span>
                            <span className="font-mono font-bold text-amber-400 text-sm">
                              {shift.hours.toFixed(2)}h @ ${shift.rate}/h
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block">Pago Estimado</span>
                            <span className="font-mono font-bold text-emerald-400 text-sm">
                              ${shift.totalPay.toFixed(2)}
                            </span>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              shift.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {shift.status === 'approved' ? 'Aprobado' : 'Enviado'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-3.5 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedWorkerForModal(null);
                    setModalViewMode('filtered');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
