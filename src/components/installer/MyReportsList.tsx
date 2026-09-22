import React, { useState } from 'react';
import { Report, ReportStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle2,
  FileEdit,
  Share2,
  ChevronRight,
  Eye,
  Trash2,
} from 'lucide-react';
import { generateWhatsAppReportText, copyToClipboard } from '../../utils/exportUtils';
import { formatShiftTime } from '../../utils/dateUtils';
import { repository } from '../../data';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

interface MyReportsListProps {
  onEditReport?: (report: Report) => void;
  onNewReport: () => void;
}

export const MyReportsList: React.FC<MyReportsListProps> = ({ onEditReport, onNewReport }) => {
  const { currentUser, reports, refreshData, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Filter reports where currentUser is creator or crew member
  const myReports = reports.filter(r => {
    if (!currentUser) return false;
    const isMine =
      r.created_by === currentUser.id ||
      r.crew.some(c => c.user_id === currentUser.id || (c.user_name && currentUser.full_name && c.user_name.toLowerCase().trim() === currentUser.full_name.toLowerCase().trim()));
    if (!isMine) return false;
    if (statusFilter === 'all') return true;
    if (statusFilter === 'submitted') return r.status === 'submitted' || r.status === 'in_review';
    return r.status === statusFilter;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Clock className="w-3.5 h-3.5" /> En Revisión
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">
            <FileEdit className="w-3.5 h-3.5" /> Borrador
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" /> Enviado
          </span>
        );
    }
  };

  const handleShareWhatsApp = async (report: Report, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = generateWhatsAppReportText(report);
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast('Texto para WhatsApp copiado al portapapeles', 'success');
      // On mobile, if navigator.share available, trigger native share
      if (navigator.share) {
        try {
          await navigator.share({
            title: `Reporte AP - ${report.job_site_name} (${report.work_date})`,
            text,
          });
        } catch {
          // user cancelled or share failed, fallback was already copied
        }
      }
    } else {
      showToast('No se pudo copiar el texto', 'error');
    }
  };

  const handleDeleteDraft = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTargetId(reportId);
  };

  const handleConfirmDeleteDraft = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await repository.deleteReport(deleteTargetId);
      await refreshData();
      showToast('Borrador eliminado correctamente', 'info');
      if (selectedReport?.id === deleteTargetId) setSelectedReport(null);
      setDeleteTargetId(null);
    } catch {
      showToast('Error al eliminar borrador', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'submitted', label: 'Enviados' },
            { id: 'approved', label: 'Aprobados' },
            { id: 'draft', label: 'Borradores' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === f.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={onNewReport}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 active:scale-95 transition flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>+ Nuevo Reporte</span>
        </button>
      </div>

      {/* Reports List */}
      {myReports.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-200">No hay reportes en esta vista</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Aún no has registrado reportes de instalación con este filtro.
          </p>
          <button
            onClick={onNewReport}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
          >
            <span>Crear primer reporte hoy</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {myReports.map(report => {
            // Find current user's hours in this report
            const myCrew = report.crew.find(c => c.user_id === currentUser?.id);
            const totalItemsCount = report.items.reduce((acc, it) => acc + (it.quantity || 0), 0);

            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="group relative p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm sm:text-base group-hover:text-amber-400 transition-colors">
                        {report.job_site_name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Contratista: <span className="text-slate-300 font-semibold">{report.contractor_name || 'AP'}</span>
                    </p>
                  </div>
                  <div>{getStatusBadge(report.status)}</div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 border-t border-slate-800/60 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{report.work_date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {myCrew ? (
                        <>
                          <strong className="text-white font-bold">{myCrew.hours.toFixed(1)}h</strong> (Mis horas)
                        </>
                      ) : (
                        `${report.crew.length} trabajadores`
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">
                      {report.items.length > 0
                        ? `${report.items.length} accesorios (${totalItemsCount.toFixed(0)} cant.)`
                        : `${report.activities_performed?.length || 0} actividades`}
                    </span>
                  </div>
                </div>

                {/* Crew names */}
                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/40 pt-2">
                  <span className="truncate max-w-[200px] sm:max-w-xs">
                    Equipo: {report.crew.map(c => c.user_name).join(', ')}
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={e => handleShareWhatsApp(report, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition"
                      title="Copiar formato WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {report.status === 'draft' && (
                      <button
                        onClick={e => handleDeleteDraft(report.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                        title="Eliminar borrador"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4 backdrop-blur-xs">
          <div className="w-full sm:max-w-lg max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">{selectedReport.job_site_name}</h3>
                <p className="text-xs text-slate-400">{selectedReport.work_date} • {selectedReport.contractor_name}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedReport.status)}
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {/* Supervisor notes if present */}
              {selectedReport.supervisor_notes && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-200">
                  <p className="font-bold text-xs uppercase tracking-wide text-blue-400">Nota del Supervisor:</p>
                  <p className="text-xs mt-1">{selectedReport.supervisor_notes}</p>
                </div>
              )}

              {/* Crew & Hours */}
              <div className="space-y-1.5">
                <p className="font-bold text-slate-300 text-xs uppercase tracking-wider">Equipo de Trabajo y Horas</p>
                <div className="space-y-1.5">
                  {selectedReport.crew.map(c => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50"
                    >
                      <div>
                        <p className="font-semibold text-white">{c.user_name}</p>
                        <p className="text-[11px] text-slate-400">
                          {c.is_supervisor_no_hours
                            ? 'Supervisión (sin horas)'
                            : formatShiftTime(c.start_at, c.end_at).label}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        {c.is_supervisor_no_hours ? '—' : `${c.hours.toFixed(2)}h`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items installed */}
              {selectedReport.items.length > 0 && (
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-300 text-xs uppercase tracking-wider">Producción e Instalaciones</p>
                  <div className="space-y-1.5">
                    {selectedReport.items.map(it => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-semibold text-white truncate">{it.accessory_name}</p>
                          {it.measure_notes && (
                            <p className="text-[11px] text-amber-400/90">{it.measure_notes}</p>
                          )}
                        </div>
                        <span className="font-bold text-slate-200 shrink-0">
                          {it.quantity} {it.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities without product */}
              {selectedReport.activities_performed && selectedReport.activities_performed.length > 0 && (
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-300 text-xs uppercase tracking-wider">Actividades Realizadas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReport.activities_performed.map((act, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Incidents / Observations */}
              {(selectedReport.incident_type !== 'ninguna' || selectedReport.observations) && (
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  {selectedReport.incident_type !== 'ninguna' && (
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="uppercase">Incidencia: {selectedReport.incident_type}</span>
                    </div>
                  )}
                  {selectedReport.observations && (
                    <p className="text-xs text-slate-300">{selectedReport.observations}</p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={e => handleShareWhatsApp(selectedReport, e)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Copiar texto WhatsApp</span>
              </button>

              {(selectedReport.status === 'draft' || selectedReport.status === 'submitted') && onEditReport && (
                <button
                  onClick={() => {
                    const rep = selectedReport;
                    setSelectedReport(null);
                    onEditReport(rep);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* In-app Delete Draft Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTargetId}
        title="Eliminar Borrador"
        message="¿Estás seguro de que deseas eliminar este borrador de reporte? Los datos ingresados se descartarán."
        isDeleting={deleting}
        onConfirm={handleConfirmDeleteDraft}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
