import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteScope } from '../../types';
import { repository } from '../../data';
import {
  Plus,
  Trash2,
  Edit2,
  Building2,
  Package,
  Layers,
  Save,
  Check,
} from 'lucide-react';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

export const SiteScopeManager: React.FC = () => {
  const { jobSites, accessories, siteScopes, refreshData, showToast } = useApp();

  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    jobSites[0]?.id || ''
  );
  const [editingScope, setEditingScope] = useState<Partial<SiteScope> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const currentScopes = siteScopes.filter(s => s.job_site_id === selectedSiteId);
  const currentSite = jobSites.find(s => s.id === selectedSiteId);

  const handleSaveScope = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScope?.accessory_id || !editingScope?.planned_qty) return;

    try {
      const acc = accessories.find(a => a.id === editingScope.accessory_id);
      await repository.saveSiteScope({
        ...editingScope,
        job_site_id: selectedSiteId,
        unit: acc?.unit || 'each',
      });
      await refreshData();
      showToast('Alcance de obra guardado', 'success');
      setEditingScope(null);
    } catch {
      showToast('Error al guardar ítem de alcance', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await repository.deleteSiteScope(deleteTarget.id);
      await refreshData();
      showToast(`Ítem "${deleteTarget.name}" eliminado del alcance`, 'success');
      setDeleteTarget(null);
    } catch {
      showToast('Error al eliminar ítem de alcance', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteScope = (scopeId: string, accName: string) => {
    setDeleteTarget({ id: scopeId, name: accName });
  };

  return (
    <div className="space-y-4">
      {/* Site Selector Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <h3 className="font-bold text-sm text-white">
              Alcance Planificado por Obra (Site Scope)
            </h3>
            <p className="text-slate-400">
              Define los accesorios y cantidades contratadas para calcular el % de avance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSiteId}
            onChange={e => setSelectedSiteId(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-950 text-white font-bold border border-slate-700"
          >
            {jobSites.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.contractor_name || 'AP'})
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              setEditingScope({
                job_site_id: selectedSiteId,
                accessory_id: accessories[0]?.id || '',
                planned_qty: 10,
                unit: 'each',
                area_label: 'Área General',
              })
            }
            className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Accesorio</span>
          </button>
        </div>
      </div>

      {/* Scope Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Accesorio</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4">Cantidad Planificada</th>
              <th className="py-3 px-4">Área / Ubicación</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {currentScopes.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  Esta obra no tiene alcance planificado aún. Usa "Agregar Accesorio" o importa un JSON.
                </td>
              </tr>
            ) : (
              currentScopes.map(sc => {
                const acc = accessories.find(a => a.id === sc.accessory_id);
                return (
                  <tr key={sc.id} className="hover:bg-slate-850/60">
                    <td className="py-3 px-4 font-bold text-white">
                      {acc?.name || 'Accesorio'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {acc?.category || 'General'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">
                      {sc.planned_qty} {sc.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {sc.area_label || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingScope({ ...sc })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteScope(sc.id, acc?.name || 'Accesorio')}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Scope Edit Modal */}
      {editingScope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveScope}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingScope.id ? 'Editar Accesorio en Obra' : 'Agregar Accesorio al Alcance'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingScope(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Accesorio del Catálogo:
                </label>
                <select
                  value={editingScope.accessory_id || ''}
                  onChange={e =>
                    setEditingScope(prev => ({ ...prev, accessory_id: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
                >
                  {accessories.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Cantidad Planificada:
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  min="0.1"
                  value={editingScope.planned_qty || ''}
                  onChange={e =>
                    setEditingScope(prev => ({
                      ...prev,
                      planned_qty: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-slate-950 text-white font-mono font-bold px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Área / Piso / Observación (opcional):
                </label>
                <input
                  type="text"
                  placeholder="ej. Piso 4, Baños públicos, Ala Este"
                  value={editingScope.area_label || ''}
                  onChange={e =>
                    setEditingScope(prev => ({ ...prev, area_label: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingScope(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Guardar en Alcance
              </button>
            </div>
          </form>
        </div>
      )}

      {/* In-app Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Eliminar de Alcance"
        message={`¿Estás seguro de que deseas eliminar este accesorio del alcance planificado para la obra "${currentSite?.name}"?`}
        itemName={deleteTarget?.name}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
