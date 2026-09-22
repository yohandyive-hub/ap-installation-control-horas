import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppSettings } from '../../types';
import { repository } from '../../data';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { settings, refreshData, showToast } = useApp();
  const [formData, setFormData] = useState<AppSettings>(
    settings || {
      id: 'default',
      week_start_day: 1,
      overtime_threshold_hours: 40,
      overtime_rate_multiplier: 1.5,
      progress_counts: 'approved',
      allow_unlisted_items: true,
      require_photos: false,
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await repository.saveSettings(formData);
      await refreshData();
      showToast('Configuración del sistema guardada', 'success');
    } catch {
      showToast('Error al guardar configuración', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-bold text-sm text-white">Parámetros Operativos del Negocio</h3>
            <p className="text-xs text-slate-400">
              Ajusta ciclos de corte semanal, cálculo de sobretiempo y reglas de progreso.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Guardando...' : 'Guardar Ajustes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Semana & Corte */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white">Corte y Ciclo Semanal</h4>

          <div>
            <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              Día de inicio de semana:
            </label>
            <select
              value={formData.week_start_day}
              onChange={e =>
                setFormData((prev: AppSettings) => ({ ...prev, week_start_day: parseInt(e.target.value) }))
              }
              className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
            >
              <option value={1}>Lunes (Default AP Installation)</option>
              <option value={0}>Domingo</option>
              <option value={5}>Viernes</option>
              <option value={6}>Sábado</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Determina los rangos de fechas mostrados en la planilla Excel y resúmenes semanales.
            </p>
          </div>
        </div>

        {/* Reglas de Overtime */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white">Horas Extra (Overtime)</h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                Umbral Semanal (horas):
              </label>
              <input
                type="number"
                value={formData.overtime_threshold_hours}
                onChange={e =>
                  setFormData((prev: AppSettings) => ({
                    ...prev,
                    overtime_threshold_hours: parseFloat(e.target.value) || 40,
                  }))
                }
                className="w-full bg-slate-950 text-white font-mono font-bold px-3 py-2 rounded-xl border border-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                Multiplicador OT:
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.overtime_rate_multiplier}
                onChange={e =>
                  setFormData((prev: AppSettings) => ({
                    ...prev,
                    overtime_rate_multiplier: parseFloat(e.target.value) || 1.5,
                  }))
                }
                className="w-full bg-slate-950 text-white font-mono font-bold px-3 py-2 rounded-xl border border-slate-800"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Aplica a partir de las {formData.overtime_threshold_hours} horas trabajadas en una misma semana.
          </p>
        </div>

        {/* Cómputo de Avance */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white">Cálculo de Avance de Obra</h4>

          <div>
            <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              Modo de conteo para avance:
            </label>
            <select
              value={formData.progress_counts}
              onChange={e =>
                setFormData((prev: AppSettings) => ({
                  ...prev,
                  progress_counts: e.target.value as any,
                }))
              }
              className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
            >
              <option value="approved">Solo reportes aprobados por supervisor</option>
              <option value="approved_and_submitted">
                Aprobados + Enviados pendientes de revisión
              </option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Controla qué reportes impactan el porcentaje y las cantidades instaladas en la pantalla del supervisor.
            </p>
          </div>
        </div>

        {/* Reglas de Formulario */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white">Flexibilidad del Instalador</h4>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allow_unlisted_items}
                onChange={e =>
                  setFormData((prev: AppSettings) => ({ ...prev, allow_unlisted_items: e.target.checked }))
                }
                className="w-4 h-4 rounded-md accent-amber-500"
              />
              <span className="text-slate-300 font-semibold">
                Permitir reportar ítems no listados en el catálogo (como texto libre)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.require_photos}
                onChange={e =>
                  setFormData((prev: AppSettings) => ({ ...prev, require_photos: e.target.checked }))
                }
                className="w-4 h-4 rounded-md accent-amber-500"
              />
              <span className="text-slate-300 font-semibold">
                Exigir fotos adjuntas antes de enviar el reporte
              </span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
