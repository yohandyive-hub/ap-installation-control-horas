import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Report, ReportStatus, Profile } from '../../types';
import { repository } from '../../data';
import {
  Table,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileEdit,
  Share2,
  Download,
  Filter,
  Eye,
  DollarSign,
  Send,
  MessageSquare,
  Search,
  Edit2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  exportReportsToExcel,
  generateWhatsAppReportText,
  generateWhatsAppWeeklySummary,
  copyToClipboard,
} from '../../utils/exportUtils';
import { getWeekDates, getTodayIso, formatShiftTime } from '../../utils/dateUtils';
import { ReportEditModal } from './ReportEditModal';

export const ReportReviewView: React.FC = () => {
  const {
    reports,
    jobSites,
    contractors,
    profiles,
    settings,
    currentUser,
    activeRole,
    permissions,
    refreshData,
    showToast,
  } = useApp();

  const userRole = currentUser?.role || activeRole || 'supervisor';
  const reportPerm = permissions.find(p => p.role === userRole && p.module === 'reports');
  const canEditReport =
    userRole === 'admin' ||
    reportPerm?.can_edit === true ||
    (userRole === 'supervisor' && reportPerm?.can_edit !== false);
  const canDeleteReport = userRole === 'admin' || reportPerm?.can_delete === true;

  // Period / Date Scope Selection
  type PeriodScope = 'all' | 'last_week' | 'this_week' | 'this_month' | 'custom_week';
  const [periodScope, setPeriodScope] = useState<PeriodScope>('all');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayIso());

  const today = getTodayIso(); // '2026-09-21'
  const { start: currentWeekStart, end: currentWeekEnd } = getWeekDates(
    today,
    settings?.week_start_day ?? 1
  );

  // Compute previous week (14-20 Sep)
  const lastWeekRefDate = new Date(new Date(today + 'T00:00:00Z').getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const { start: lastWeekStart, end: lastWeekEnd } = getWeekDates(
    lastWeekRefDate,
    settings?.week_start_day ?? 1
  );

  // Custom week dates from selectedDate
  const { start: customWeekStart, end: customWeekEnd } = getWeekDates(
    selectedDate,
    settings?.week_start_day ?? 1
  );

  let activeStart = '2026-01-01';
  let activeEnd = '2026-12-31';
  let periodLabel = 'Todo el Histórico 2026 (Ene - Sep)';

  if (periodScope === 'all') {
    activeStart = '2026-01-01';
    activeEnd = '2026-12-31';
    periodLabel = 'Todo el Histórico 2026';
  } else if (periodScope === 'last_week') {
    activeStart = lastWeekStart;
    activeEnd = lastWeekEnd;
    periodLabel = `Semana Anterior (${lastWeekStart.slice(5)} al ${lastWeekEnd.slice(5)})`;
  } else if (periodScope === 'this_week') {
    activeStart = currentWeekStart;
    activeEnd = currentWeekEnd;
    periodLabel = `Esta Semana (${currentWeekStart.slice(5)} al ${currentWeekEnd.slice(5)})`;
  } else if (periodScope === 'this_month') {
    activeStart = '2026-09-01';
    activeEnd = '2026-09-30';
    periodLabel = 'Mes de Septiembre 2026';
  } else {
    activeStart = customWeekStart;
    activeEnd = customWeekEnd;
    periodLabel = `Semana del ${customWeekStart.slice(5)} al ${customWeekEnd.slice(5)}`;
  }

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [contractorFilter, setContractorFilter] = useState<string>('all');
  const [installerFilter, setInstallerFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected report for price editing & supervisor review
  const [reviewingReport, setReviewingReport] = useState<Report | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [supervisorNotes, setSupervisorNotes] = useState<string>('');
  const [priceOverrides, setPriceOverrides] = useState<{ [itemId: string]: number }>({});
  const [savingReview, setSavingReview] = useState<boolean>(false);

  // Total approved reports across entire repository
  const totalApprovedOverall = reports.filter(r => r.status === 'approved').length;

  // Filter reports
  const filteredReports = reports.filter(r => {
    // Period check
    if (r.work_date < activeStart || r.work_date > activeEnd) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (siteFilter !== 'all' && r.job_site_id !== siteFilter) return false;
    if (contractorFilter !== 'all' && r.contractor_id !== contractorFilter) return false;
    if (installerFilter !== 'all') {
      const hasWorker =
        r.created_by === installerFilter || r.crew.some(c => c.user_id === installerFilter);
      if (!hasWorker) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        (r.job_site_name || '').toLowerCase().includes(q) ||
        (r.contractor_name || '').toLowerCase().includes(q) ||
        r.crew.some(c => (c.user_name || '').toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Calculate totals for current filtered view
  const totalHours = filteredReports.reduce((acc, r) => {
    return acc + r.crew.reduce((sum, c) => sum + (c.is_supervisor_no_hours ? 0 : c.hours || 0), 0);
  }, 0);

  const totalPayroll = filteredReports.reduce((acc, r) => {
    return (
      acc +
      r.crew.reduce((sum, c) => {
        if (c.is_supervisor_no_hours) return sum;
        return sum + (c.hours || 0) * (c.hourly_rate_snapshot || 20);
      }, 0)
    );
  }, 0);

  const pendingCount = filteredReports.filter(
    r => r.status === 'submitted' || r.status === 'in_review'
  ).length;

  // Actions
  const handleQuickApprove = async (reportId: string) => {
    try {
      await repository.updateReportStatus(reportId, 'approved');
      await refreshData();
      showToast('Reporte aprobado exitosamente', 'success');
    } catch {
      showToast('Error al aprobar reporte', 'error');
    }
  };

  const handleOpenReviewModal = (report: Report) => {
    setReviewingReport(report);
    setSupervisorNotes(report.supervisor_notes || '');
    const initialPrices: { [itemId: string]: number } = {};
    report.items.forEach(it => {
      initialPrices[it.id] = it.unit_price_override !== undefined ? it.unit_price_override : 0;
    });
    setPriceOverrides(initialPrices);
  };

  const handleSaveReportReview = async (newStatus: ReportStatus) => {
    if (!reviewingReport) return;
    setSavingReview(true);
    try {
      // Update item prices if modified
      const updatedItems = reviewingReport.items.map(it => {
        const pr = priceOverrides[it.id];
        return {
          ...it,
          unit_price_override: pr !== undefined ? pr : it.unit_price_override,
          line_total: (it.quantity || 0) * (pr !== undefined ? pr : it.unit_price_override || 0),
        };
      });

      await repository.saveReport({
        ...reviewingReport,
        items: updatedItems,
        supervisor_notes: supervisorNotes,
        status: newStatus,
      });

      await refreshData();
      showToast(
        newStatus === 'approved'
          ? 'Reporte revisado y aprobado'
          : 'Reporte marcado como observado / en revisión',
        'success'
      );
      setReviewingReport(null);
    } catch {
      showToast('Error al actualizar reporte', 'error');
    } finally {
      setSavingReview(false);
    }
  };

  const handleSaveReportEdit = async (updatedReport: Report) => {
    await repository.saveReport(updatedReport);
    await refreshData();
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await repository.deleteReport(reportId);
      await refreshData();
      showToast('Reporte eliminado correctamente', 'success');
      setEditingReport(null);
    } catch {
      showToast('Error al eliminar el reporte', 'error');
    }
  };

  const handleExportExcel = () => {
    try {
      exportReportsToExcel(filteredReports, `AP_Reportes_${periodScope}_${activeStart}_a_${activeEnd}.xlsx`);
      showToast('Planilla de horas exportada a Excel (.xlsx)', 'success');
    } catch {
      showToast('Error exportando Excel', 'error');
    }
  };

  const handleCopyWeeklyWhatsApp = async () => {
    const text = generateWhatsAppWeeklySummary(filteredReports, activeStart, activeEnd);
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast('Resumen semanal copiado para WhatsApp', 'success');
    } else {
      showToast('No se pudo copiar el texto', 'error');
    }
  };

  const handleShareReportWhatsApp = async (report: Report) => {
    const text = generateWhatsAppReportText(report);
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast('Reporte individual copiado para WhatsApp', 'success');
    }
  };

  return (
    <div className="space-y-4">
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">
            Período Activo
          </span>
          <span className="font-bold text-white text-xs sm:text-sm truncate block" title={periodLabel}>
            {periodLabel}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">
            Total Horas Período
          </span>
          <span className="font-mono font-black text-amber-400 text-lg sm:text-xl">
            {totalHours.toFixed(1)}h
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">
            Nómina Estimada
          </span>
          <span className="font-mono font-black text-emerald-400 text-lg sm:text-xl">
            ${totalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">
            Reportes Mostrados
          </span>
          <span className="font-mono font-black text-slate-200 text-lg sm:text-xl">
            {filteredReports.length}
          </span>
        </div>
      </div>

      {/* Period Scope Selector Toolbar */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Período:</span>
          </span>

          <button
            onClick={() => setPeriodScope('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              periodScope === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Todo el Histórico ({reports.length})</span>
          </button>

          <button
            onClick={() => setPeriodScope('last_week')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              periodScope === 'last_week'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Semana Anterior (14-20 Sep)
          </button>

          <button
            onClick={() => setPeriodScope('this_week')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              periodScope === 'this_week'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Esta Semana (21-27 Sep)
          </button>

          <button
            onClick={() => setPeriodScope('this_month')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              periodScope === 'this_month'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Septiembre
          </button>

          <button
            onClick={() => setPeriodScope('custom_week')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              periodScope === 'custom_week'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Elegir Fecha
          </button>

          {periodScope === 'custom_week' && (
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="bg-slate-950 text-white font-bold px-3 py-1 rounded-xl border border-slate-700 ml-1"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyWeeklyWhatsApp}
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            title="Copiar texto consolidado para enviar por WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md active:scale-95 transition"
            title="Descargar archivo Excel con las columnas exactas de AP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
        {/* Status */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold"
        >
          <option value="all">Todos los Estados</option>
          <option value="approved">Aprobados ({reports.filter(r => r.status === 'approved').length})</option>
          <option value="submitted">Enviados (Pendientes)</option>
          <option value="in_review">En Revisión (Observados)</option>
          <option value="draft">Borradores</option>
        </select>

        {/* Site */}
        <select
          value={siteFilter}
          onChange={e => setSiteFilter(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold"
        >
          <option value="all">Todas las Obras</option>
          {jobSites.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Contractor */}
        <select
          value={contractorFilter}
          onChange={e => setContractorFilter(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold"
        >
          <option value="all">Todos los Contratistas</option>
          {contractors.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Installer */}
        <select
          value={installerFilter}
          onChange={e => setInstallerFilter(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold"
        >
          <option value="all">Todos los Instaladores</option>
          {profiles.map(p => (
            <option key={p.id} value={p.id}>
              {p.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Table (Excel-like layout for supervisor) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Fecha</th>
                <th className="py-3 px-3">Sitio / Contratista</th>
                <th className="py-3 px-3">Instaladores & Horarios</th>
                <th className="py-3 px-3">Horas</th>
                <th className="py-3 px-3">Producción</th>
                <th className="py-3 px-3">Nómina Est.</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="max-w-md mx-auto space-y-3 px-4">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <p className="font-bold text-white text-sm">
                        No hay reportes {statusFilter !== 'all' ? `con estado "${statusFilter}"` : ''} en {periodLabel}
                      </p>
                      {totalApprovedOverall > 0 && (
                        <p className="text-xs text-slate-300">
                          El sistema tiene <strong className="text-emerald-400">{totalApprovedOverall} reportes aprobados</strong> registrados en el consolidado histórico de enero a septiembre.
                        </p>
                      )}
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <button
                          onClick={() => { setPeriodScope('last_week'); }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                        >
                          Semana Anterior (14-20 Sep)
                        </button>
                        <button
                          onClick={() => { setPeriodScope('all'); setStatusFilter('approved'); }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition shadow-sm"
                        >
                          Ver Todos los Aprobados ({totalApprovedOverall})
                        </button>
                        <button
                          onClick={() => { setPeriodScope('all'); setStatusFilter('all'); }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
                        >
                          Ver Todo el Histórico ({reports.length})
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReports.map(report => {
                  const repTotalHours = report.crew.reduce(
                    (s, c) => s + (c.is_supervisor_no_hours ? 0 : c.hours || 0),
                    0
                  );
                  const repPayroll = report.crew.reduce(
                    (s, c) =>
                      s + (c.is_supervisor_no_hours ? 0 : (c.hours || 0) * (c.hourly_rate_snapshot || 20)),
                    0
                  );

                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-850/60 transition-colors group"
                    >
                      {/* Fecha */}
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-semibold text-slate-200">
                        {report.work_date}
                      </td>

                      {/* Sitio & Contratista */}
                      <td className="py-3 px-3 min-w-[140px]">
                        <p className="font-bold text-white leading-tight">
                          {report.job_site_name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {report.contractor_name || 'AP'}
                        </p>
                      </td>

                      {/* Instaladores & Horas */}
                      <td className="py-3 px-3 min-w-[180px]">
                        <div className="space-y-0.5">
                          {report.crew.map(c => (
                            <div
                              key={c.id}
                              className="text-[11px] text-slate-300 flex items-center justify-between"
                            >
                              <span className="font-medium truncate max-w-[110px]">
                                {c.user_name}
                              </span>
                              <span className="font-mono text-slate-400">
                                {c.is_supervisor_no_hours
                                  ? 'Supervisión'
                                  : formatShiftTime(c.start_at, c.end_at).label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Horas Totales */}
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-amber-400">
                        {repTotalHours.toFixed(1)}h
                      </td>

                      {/* Producción */}
                      <td className="py-3 px-3 min-w-[160px]">
                        {report.items.length > 0 ? (
                          <div className="space-y-0.5 max-h-16 overflow-y-auto pr-1">
                            {report.items.map(it => (
                              <div
                                key={it.id}
                                className="text-[11px] text-slate-300 flex items-center justify-between"
                              >
                                <span className="truncate max-w-[110px]" title={it.accessory_name}>
                                  {it.accessory_name}
                                </span>
                                <span className="font-bold text-white">
                                  {it.quantity} {it.unit}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">
                            {(report.activities_performed || []).join(', ') || 'Sin producción'}
                          </span>
                        )}
                      </td>

                      {/* Nómina */}
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-emerald-400">
                        ${repPayroll.toFixed(2)}
                      </td>

                      {/* Estado */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {report.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Aprobado
                          </span>
                        )}
                        {report.status === 'in_review' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            Observado
                          </span>
                        )}
                        {report.status === 'submitted' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Enviado
                          </span>
                        )}
                        {report.status === 'draft' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">
                            Borrador
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {report.status !== 'approved' && (
                            <button
                              onClick={() => handleQuickApprove(report.id)}
                              className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition active:scale-95"
                              title="Aprobar directamente"
                            >
                              Aprobar
                            </button>
                          )}

                          {/* Botón de Editar Reporte (Visible si tiene permiso de edición) */}
                          {canEditReport && (
                            <button
                              onClick={() => setEditingReport(report)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-semibold border border-slate-700/60 transition active:scale-95"
                              title="Editar reporte completo (horas, cuadrilla, productos, notas)"
                            >
                              <FileEdit className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleOpenReviewModal(report)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition active:scale-95"
                            title="Revisar y asignar precios"
                          >
                            <DollarSign className="w-3.5 h-3.5 text-slate-300" />
                          </button>
                          <button
                            onClick={() => handleShareReportWhatsApp(report)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition active:scale-95"
                            title="Copiar texto WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Review & Price Assignment Modal */}
      {reviewingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Revisión de Reporte y Precios
                </span>
                <h3 className="font-bold text-base text-white">
                  {reviewingReport.job_site_name}
                </h3>
                <p className="text-xs text-slate-400">
                  {reviewingReport.work_date} • Contratista: {reviewingReport.contractor_name || 'AP'}
                </p>
              </div>
              <button
                onClick={() => setReviewingReport(null)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {/* Crew & Hours breakdown with rates */}
              <div className="space-y-1.5">
                <p className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Horas del Equipo y Costo de Nómina
                </p>
                <div className="space-y-1">
                  {reviewingReport.crew.map(c => {
                    const pay = c.is_supervisor_no_hours
                      ? 0
                      : (c.hours || 0) * (c.hourly_rate_snapshot || 20);
                    return (
                      <div
                        key={c.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-white">{c.user_name}</p>
                          <p className="text-[11px] text-slate-400">
                            {c.is_supervisor_no_hours
                              ? 'Supervisión (sin horas)'
                              : `${formatShiftTime(c.start_at, c.end_at).label} (${c.hours.toFixed(2)}h @ $${c.hourly_rate_snapshot}/h)`}
                          </p>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          ${pay.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items & Installation Prices Assignment */}
              <div className="space-y-1.5">
                <p className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Producción y Precios de Instalación por Unidad
                </p>
                {reviewingReport.items.length === 0 ? (
                  <p className="text-slate-500 italic p-3 bg-slate-950 rounded-xl">
                    Este reporte no incluyó productos físicos instalados.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {reviewingReport.items.map(it => {
                      const currentPrice = priceOverrides[it.id] ?? (it.unit_price_override || 0);
                      const lineTotal = (it.quantity || 0) * currentPrice;

                      return (
                        <div
                          key={it.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-white">{it.accessory_name}</p>
                              <span className="text-slate-400 text-[11px]">
                                Cantidad: <strong className="text-slate-200">{it.quantity} {it.unit}</strong>
                              </span>
                              {it.measure_notes && (
                                <p className="text-[10px] text-amber-400/90">{it.measure_notes}</p>
                              )}
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 block">Total Ítem:</span>
                              <span className="font-mono font-bold text-emerald-400 text-sm">
                                ${lineTotal.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Price input */}
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">
                              Precio Unitario ($/{it.unit}):
                            </label>
                            <input
                              type="number"
                              step="any"
                              value={currentPrice}
                              onChange={e =>
                                setPriceOverrides(prev => ({
                                  ...prev,
                                  [it.id]: parseFloat(e.target.value) || 0,
                                }))
                              }
                              className="w-24 bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-700"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Supervisor Notes (Sent back if rejected / placed in review) */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
                  Notas u Observaciones del Supervisor (visible para el instalador):
                </label>
                <textarea
                  rows={2}
                  placeholder="Escribe comentarios, razones para corregir horas o instrucciones..."
                  value={supervisorNotes}
                  onChange={e => setSupervisorNotes(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={savingReview}
                  onClick={() => handleSaveReportReview('in_review')}
                  className="py-2.5 px-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 font-bold text-xs active:scale-95 transition"
                >
                  Observar (En Revisión)
                </button>

                {canEditReport && (
                  <button
                    type="button"
                    onClick={() => {
                      const r = reviewingReport;
                      setReviewingReport(null);
                      setEditingReport(r);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold text-xs active:scale-95 transition flex items-center gap-1.5"
                    title="Editar horas, cuadrilla, productos y datos completos"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Editar Todo</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                disabled={savingReview}
                onClick={() => handleSaveReportReview('approved')}
                className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md active:scale-95 transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar y Aprobar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Report Edit Modal */}
      {editingReport && (
        <ReportEditModal
          report={editingReport}
          canDelete={canDeleteReport}
          onClose={() => setEditingReport(null)}
          onSave={handleSaveReportEdit}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  );
};
