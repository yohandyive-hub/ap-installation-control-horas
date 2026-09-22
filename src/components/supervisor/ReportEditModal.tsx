import React, { useState } from 'react';
import {
  Report,
  ReportCrewMember,
  ReportItem,
  ReportStatus,
  Profile,
  JobSite,
  Accessory,
} from '../../types';
import { useApp } from '../../context/AppContext';
import { calculateHours, isWeekend, extractTimeFromIso } from '../../utils/dateUtils';
import {
  X,
  Save,
  Trash2,
  Plus,
  Clock,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

interface ReportEditModalProps {
  report: Report;
  canDelete: boolean;
  onClose: () => void;
  onSave: (updatedReport: Report) => Promise<void>;
  onDelete?: (reportId: string) => Promise<void>;
}

export const ReportEditModal: React.FC<ReportEditModalProps> = ({
  report,
  canDelete,
  onClose,
  onSave,
  onDelete,
}) => {
  const { profiles, jobSites, contractors, accessories, showToast } = useApp();

  // Basic metadata
  const [workDate, setWorkDate] = useState(report.work_date);
  const [jobSiteId, setJobSiteId] = useState(report.job_site_id);
  const [status, setStatus] = useState<ReportStatus>(report.status);
  const [observations, setObservations] = useState(report.observations || '');
  const [supervisorNotes, setSupervisorNotes] = useState(report.supervisor_notes || '');

  // Crew state
  interface EditableCrewMember {
    id: string;
    userId: string;
    userName: string;
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    isNextDay: boolean;
    hours: number;
    hourlyRate: number;
    isSupervisorNoHours: boolean;
  }

  const [crew, setCrew] = useState<EditableCrewMember[]>(() => {
    return report.crew.map(c => {
      const startH = extractTimeFromIso(c.start_at);
      const endH = extractTimeFromIso(c.end_at);
      const isNext = c.start_at && c.end_at ? c.end_at.substring(0, 10) > c.start_at.substring(0, 10) : false;
      return {
        id: c.id || `crew_${Math.random().toString(36).substring(2, 9)}`,
        userId: c.user_id,
        userName: c.user_name || profiles.find(p => p.id === c.user_id)?.full_name || 'Instalador',
        startTime: startH,
        endTime: endH,
        isNextDay: isNext,
        hours: c.hours || 0,
        hourlyRate: c.hourly_rate_snapshot || 20,
        isSupervisorNoHours: Boolean(c.is_supervisor_no_hours),
      };
    });
  });

  // Items state
  const [items, setItems] = useState<ReportItem[]>(() => [...report.items]);

  // UI state for adding items/workers
  const [selectedNewWorkerId, setSelectedNewWorkerId] = useState<string>('');
  const [selectedNewAccessoryId, setSelectedNewAccessoryId] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Selected site and contractor name
  const currentSite = jobSites.find(s => s.id === jobSiteId);
  const contractorName =
    currentSite?.contractor_name ||
    contractors.find(c => c.id === currentSite?.contractor_id)?.name ||
    report.contractor_name ||
    'AP';

  // Crew helpers
  const handleUpdateCrewMember = (id: string, updates: Partial<EditableCrewMember>) => {
    setCrew(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        const updated = { ...c, ...updates };

        // Recalculate hours if times changed
        if (updates.startTime !== undefined || updates.endTime !== undefined || updates.isNextDay !== undefined || updates.isSupervisorNoHours !== undefined) {
          if (updated.isSupervisorNoHours) {
            updated.hours = 0;
          } else {
            updated.hours = calculateHours(updated.startTime, updated.endTime, updated.isNextDay);
          }
        }

        return updated;
      })
    );
  };

  const handleAddWorker = () => {
    if (!selectedNewWorkerId) return;
    const workerProfile = profiles.find(p => p.id === selectedNewWorkerId);
    if (!workerProfile) return;

    if (crew.some(c => c.userId === selectedNewWorkerId)) {
      showToast('El trabajador ya está en la cuadrilla', 'warning');
      return;
    }

    const newMember: EditableCrewMember = {
      id: `crew_${Math.random().toString(36).substring(2, 9)}`,
      userId: workerProfile.id,
      userName: workerProfile.full_name,
      startTime: '08:00',
      endTime: '17:00',
      isNextDay: false,
      hours: 9,
      hourlyRate: workerProfile.default_hourly_rate || 22,
      isSupervisorNoHours: workerProfile.role === 'supervisor',
    };

    setCrew(prev => [...prev, newMember]);
    setSelectedNewWorkerId('');
  };

  const handleRemoveWorker = (id: string) => {
    if (crew.length <= 1) {
      showToast('El reporte debe tener al menos un trabajador', 'warning');
      return;
    }
    setCrew(prev => prev.filter(c => c.id !== id));
  };

  // Items helpers
  const handleUpdateItem = (id: string, updates: Partial<ReportItem>) => {
    setItems(prev =>
      prev.map(it => {
        if (it.id !== id) return it;
        const updated = { ...it, ...updates };
        const price = updated.unit_price_override !== undefined ? updated.unit_price_override : (it.unit_price_override || 0);
        updated.line_total = (updated.quantity || 0) * price;
        return updated;
      })
    );
  };

  const handleAddAccessory = () => {
    if (!selectedNewAccessoryId) return;
    const acc = accessories.find(a => a.id === selectedNewAccessoryId);
    if (!acc) return;

    const newItem: ReportItem = {
      id: `item_${Math.random().toString(36).substring(2, 9)}`,
      report_id: report.id,
      accessory_id: acc.id,
      accessory_code: acc.code,
      accessory_name: acc.name,
      accessory_unit: acc.unit,
      quantity: 1,
      unit: acc.unit,
      unit_price_override: acc.default_price || 0,
      line_total: acc.default_price || 0,
      measure_notes: '',
    };

    setItems(prev => [...prev, newItem]);
    setSelectedNewAccessoryId('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  // Submit
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workDate || !jobSiteId) {
      showToast('Por favor completa la fecha y la obra', 'warning');
      return;
    }

    if (crew.length === 0) {
      showToast('Debe haber al menos un instalador en la cuadrilla', 'warning');
      return;
    }

    setSaving(true);
    try {
      const weekend = isWeekend(workDate);

      // Build ReportCrewMember array
      const updatedCrew: ReportCrewMember[] = crew.map(c => {
        const startIso = `${workDate}T${c.startTime}:00`;
        // Next day calculation
        let endDate = workDate;
        if (c.isNextDay) {
          const d = new Date(workDate + 'T00:00:00');
          d.setDate(d.getDate() + 1);
          endDate = d.toISOString().substring(0, 10);
        }
        const endIso = `${endDate}T${c.endTime}:00`;

        return {
          id: c.id,
          report_id: report.id,
          user_id: c.userId,
          user_name: c.userName,
          start_at: startIso,
          end_at: endIso,
          hours: Number(c.hours) || 0,
          hourly_rate_snapshot: Number(c.hourlyRate) || 20,
          is_weekend: weekend,
          is_supervisor_no_hours: c.isSupervisorNoHours,
        };
      });

      // Build ReportItem array
      const updatedItems: ReportItem[] = items.map(it => ({
        ...it,
        quantity: Number(it.quantity) || 0,
        unit_price_override: Number(it.unit_price_override) || 0,
        line_total: (Number(it.quantity) || 0) * (Number(it.unit_price_override) || 0),
      }));

      const updatedReport: Report = {
        ...report,
        work_date: workDate,
        job_site_id: jobSiteId,
        job_site_name: currentSite?.name || report.job_site_name,
        contractor_id: currentSite?.contractor_id || report.contractor_id,
        contractor_name: contractorName,
        status,
        observations,
        supervisor_notes: supervisorNotes,
        updated_at: new Date().toISOString(),
        crew: updatedCrew,
        items: updatedItems,
      };

      await onSave(updatedReport);
      showToast('Reporte actualizado y guardado correctamente', 'success');
      onClose();
    } catch (err) {
      console.error('Error saving report edit:', err);
      showToast('Error al guardar los cambios del reporte', 'error');
    } finally {
      setSaving(false);
    }
  };

  const totalCrewHours = crew.reduce(
    (sum, c) => sum + (c.isSupervisorNoHours ? 0 : Number(c.hours) || 0),
    0
  );

  const totalPayroll = crew.reduce((sum, c) => {
    if (c.isSupervisorNoHours) return sum;
    return sum + (Number(c.hours) || 0) * (Number(c.hourlyRate) || 0);
  }, 0);

  const totalProduction = items.reduce((sum, it) => {
    return sum + (Number(it.quantity) || 0) * (Number(it.unit_price_override) || 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-3xl my-auto flex flex-col rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Edición de Reporte y Nómina
              </span>
              <span className="text-xs text-slate-400">ID: {report.id.substring(0, 10)}</span>
            </div>
            <h3 className="font-bold text-lg text-white mt-0.5">
              {currentSite?.name || report.job_site_name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-xs">
          {/* General Metadata */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Información General de la Obra</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Fecha de Trabajo:
                </label>
                <input
                  type="date"
                  value={workDate}
                  onChange={e => setWorkDate(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Obra / Proyecto:
                </label>
                <select
                  value={jobSiteId}
                  onChange={e => setJobSiteId(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
                  required
                >
                  {jobSites.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.contractor_name || 'AP'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Estado del Reporte:
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as ReportStatus)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
                >
                  <option value="submitted">Enviado (Pendiente)</option>
                  <option value="approved">Aprobado</option>
                  <option value="in_review">En Revisión (Observado)</option>
                  <option value="draft">Borrador</option>
                </select>
              </div>
            </div>
          </div>

          {/* Crew & Hours Management */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cuadrilla y Horas Trabajadas</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Total Horas: <strong className="text-amber-400">{totalCrewHours.toFixed(2)}h</strong> • Nómina: <strong className="text-emerald-400">${totalPayroll.toFixed(2)}</strong>
                </p>
              </div>

              {/* Add worker control */}
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedNewWorkerId}
                  onChange={e => setSelectedNewWorkerId(e.target.value)}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs"
                >
                  <option value="">Seleccionar personal...</option>
                  {profiles
                    .filter(p => !crew.some(c => c.userId === p.id))
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {p.full_name} ({p.role})
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddWorker}
                  disabled={!selectedNewWorkerId}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>

            {/* Crew members list */}
            <div className="space-y-2.5 pt-1">
              {crew.map(c => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800/90 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{c.userName}</span>
                      {c.isSupervisorNoHours && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Supervisor (0h nómina)
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveWorker(c.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Quitar instalador del reporte"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Inicio:</label>
                      <input
                        type="time"
                        value={c.startTime}
                        disabled={c.isSupervisorNoHours}
                        onChange={e => handleUpdateCrewMember(c.id, { startTime: e.target.value })}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-white border border-slate-800 font-mono disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Fin:</label>
                      <input
                        type="time"
                        value={c.endTime}
                        disabled={c.isSupervisorNoHours}
                        onChange={e => handleUpdateCrewMember(c.id, { endTime: e.target.value })}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-white border border-slate-800 font-mono disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Horas:</label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        value={c.hours}
                        disabled={c.isSupervisorNoHours}
                        onChange={e =>
                          handleUpdateCrewMember(c.id, { hours: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-amber-400 border border-slate-800 font-mono font-bold disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Tarifa ($/h):</label>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={c.hourlyRate}
                        disabled={c.isSupervisorNoHours}
                        onChange={e =>
                          handleUpdateCrewMember(c.id, { hourlyRate: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 font-mono font-bold disabled:opacity-40"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1 pt-3 sm:pt-4">
                      <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={c.isSupervisorNoHours}
                          onChange={e =>
                            handleUpdateCrewMember(c.id, { isSupervisorNoHours: e.target.checked })
                          }
                          className="rounded text-blue-500 bg-slate-950 border-slate-800"
                        />
                        <span>Supervisor</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Installed Items & Prices Management */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Productos y Accesorios Instalados</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Total Valorizado: <strong className="text-emerald-400">${totalProduction.toFixed(2)}</strong>
                </p>
              </div>

              {/* Add item control */}
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedNewAccessoryId}
                  onChange={e => setSelectedNewAccessoryId(e.target.value)}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs max-w-[200px]"
                >
                  <option value="">Seleccionar accesorio...</option>
                  {accessories.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.code} - {a.name} ({a.unit})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddAccessory}
                  disabled={!selectedNewAccessoryId}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>

            {/* Items list */}
            {items.length === 0 ? (
              <p className="text-slate-500 italic p-3 text-center bg-slate-900 rounded-xl">
                No hay productos físicos registrados en este reporte.
              </p>
            ) : (
              <div className="space-y-2 pt-1">
                {items.map(it => {
                  const lineTotal = (Number(it.quantity) || 0) * (Number(it.unit_price_override) || 0);

                  return (
                    <div
                      key={it.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800/90 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 mr-2">
                            {it.accessory_code}
                          </span>
                          <span className="font-semibold text-white">{it.accessory_name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-mono font-bold">
                            Total: ${lineTotal.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(it.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            Cantidad ({it.unit}):
                          </label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={it.quantity}
                            onChange={e =>
                              handleUpdateItem(it.id, { quantity: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-white border border-slate-800 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            Precio Unitario ($/{it.unit}):
                          </label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={it.unit_price_override ?? 0}
                            onChange={e =>
                              handleUpdateItem(it.id, {
                                unit_price_override: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            Detalles / Medidas:
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: 1085 in handrail"
                            value={it.measure_notes || ''}
                            onChange={e =>
                              handleUpdateItem(it.id, { measure_notes: e.target.value })
                            }
                            className="w-full py-1.5 px-2 rounded-lg bg-slate-950 text-slate-200 border border-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notes & Observations */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Notas / Observaciones del Instalador:
                </label>
                <textarea
                  rows={2}
                  value={observations}
                  onChange={e => setObservations(e.target.value)}
                  className="w-full bg-slate-900 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-400"
                  placeholder="Detalles de la jornada reportados por el instalador..."
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Observaciones / Feedback del Supervisor:
                </label>
                <textarea
                  rows={2}
                  value={supervisorNotes}
                  onChange={e => setSupervisorNotes(e.target.value)}
                  className="w-full bg-slate-900 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-400"
                  placeholder="Comentarios sobre corrección de horas, precios o revisión..."
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {canDelete && onDelete && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-2 rounded-xl text-rose-400 hover:text-white hover:bg-rose-600/20 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Reporte</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {showDeleteConfirm && (
        <ConfirmDeleteModal
          isOpen={showDeleteConfirm}
          title="¿Eliminar Reporte?"
          message={`¿Estás seguro de eliminar el reporte de ${currentSite?.name || report.job_site_name} del día ${workDate}? Esta acción no se puede deshacer.`}
          onConfirm={async () => {
            if (onDelete) {
              await onDelete(report.id);
              onClose();
            }
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};
