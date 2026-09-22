import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Accessory, JobSite, Contractor, AccessoryUnit } from '../../types';
import { repository } from '../../data';
import {
  Plus,
  Trash2,
  Edit2,
  Building2,
  Briefcase,
  Package,
  DollarSign,
  Search,
  Check,
} from 'lucide-react';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

interface CataloguesManagerProps {
  initialSubTab?: 'sites' | 'contractors' | 'accessories';
}

export const CataloguesManager: React.FC<CataloguesManagerProps> = ({
  initialSubTab = 'accessories',
}) => {
  const { jobSites, contractors, accessories, refreshData, showToast } = useApp();

  const [subTab, setSubTab] = useState<'sites' | 'contractors' | 'accessories'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteStatusFilter, setSiteStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Accessory Form modal / state
  const [editingAccessory, setEditingAccessory] = useState<Partial<Accessory> | null>(null);
  const [editingSite, setEditingSite] = useState<Partial<JobSite> | null>(null);
  const [editingContractor, setEditingContractor] = useState<Partial<Contractor> | null>(null);

  // In-app deletion confirmation state (reliable in iframes)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'accessory' | 'site' | 'contractor';
    id: string;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // --- Handlers: Accessories ---
  const handleSaveAccessory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccessory?.name) return;
    try {
      await repository.saveAccessory(editingAccessory);
      await refreshData();
      showToast('Accesorio guardado exitosamente', 'success');
      setEditingAccessory(null);
    } catch {
      showToast('Error al guardar accesorio', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === 'accessory') {
        const purged = await repository.deleteAccessory(deleteTarget.id, true);
        await refreshData();
        showToast(`Accesorio "${deleteTarget.name}" eliminado correctamente`, 'success');
        if (editingAccessory?.id === deleteTarget.id) setEditingAccessory(null);
      } else if (deleteTarget.type === 'site') {
        await repository.deleteJobSite(deleteTarget.id);
        await refreshData();
        showToast(`Obra "${deleteTarget.name}" eliminada correctamente`, 'success');
        if (editingSite?.id === deleteTarget.id) setEditingSite(null);
      } else if (deleteTarget.type === 'contractor') {
        await repository.deleteContractor(deleteTarget.id);
        await refreshData();
        showToast(`Contratista "${deleteTarget.name}" eliminado correctamente`, 'success');
        if (editingContractor?.id === deleteTarget.id) setEditingContractor(null);
      }
      setDeleteTarget(null);
    } catch (err: any) {
      showToast('Error al eliminar: ' + (err?.message || 'Error desconocido'), 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAccessory = (acc: Accessory) => {
    setDeleteTarget({
      type: 'accessory',
      id: acc.id,
      name: acc.name,
    });
  };

  // --- Handlers: Sites ---
  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSite?.name) return;
    try {
      await repository.saveJobSite(editingSite);
      await refreshData();
      showToast('Obra guardada', 'success');
      setEditingSite(null);
    } catch {
      showToast('Error al guardar obra', 'error');
    }
  };

  const handleToggleSiteActive = async (site: JobSite) => {
    try {
      const nextActive = site.active === false ? true : false;
      await repository.saveJobSite({ ...site, active: nextActive });
      await refreshData();
      showToast(
        `Obra "${site.name}" ${nextActive ? 'activada (visible para instaladores)' : 'desactivada (oculta para instaladores)'}`,
        'success'
      );
    } catch {
      showToast('Error al cambiar el estado de la obra', 'error');
    }
  };

  const handleDeleteSite = (site: JobSite) => {
    setDeleteTarget({
      type: 'site',
      id: site.id,
      name: site.name,
    });
  };

  // --- Handlers: Contractors ---
  const handleSaveContractor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContractor?.name) return;
    try {
      await repository.saveContractor(editingContractor);
      await refreshData();
      showToast('Contratista guardado', 'success');
      setEditingContractor(null);
    } catch {
      showToast('Error al guardar contratista', 'error');
    }
  };

  const handleDeleteContractor = (contractor: Contractor) => {
    setDeleteTarget({
      type: 'contractor',
      id: contractor.id,
      name: contractor.name,
    });
  };

  return (
    <div className="space-y-4">
      {/* Subtabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
        <button
          onClick={() => setSubTab('accessories')}
          className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'accessories'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Accesorios y Tareas ({accessories.length})</span>
        </button>

        <button
          onClick={() => setSubTab('sites')}
          className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'sites'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Obras / Job Sites ({jobSites.length})</span>
        </button>

        <button
          onClick={() => setSubTab('contractors')}
          className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'contractors'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Contratistas ({contractors.length})</span>
        </button>
      </div>

      {/* --- TAB: ACCESSORIES --- */}
      {subTab === 'accessories' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar accesorios..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 text-slate-200 text-xs border border-slate-800 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <button
              onClick={() =>
                setEditingAccessory({
                  name: '',
                  code: '',
                  category: 'Acrovyn',
                  unit: 'each',
                  item_type: 'product',
                  aliases: [],
                  default_price: 15,
                  active: true,
                })
              }
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Accesorio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {accessories
              .filter(a =>
                searchQuery
                  ? a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    a.category.toLowerCase().includes(searchQuery.toLowerCase())
                  : true
              )
              .map(acc => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm text-white leading-tight">
                        {acc.name}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                        {acc.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>
                        Unidad: <strong className="text-slate-300">{acc.unit}</strong>
                      </span>
                      <span>
                        Precio ref:{' '}
                        <strong className="text-emerald-400 font-mono">
                          {acc.default_price ? `$${acc.default_price}` : '—'}
                        </strong>
                      </span>
                    </div>
                    {acc.aliases && acc.aliases.length > 0 && (
                      <p className="text-[10px] text-slate-500 mt-1 truncate">
                        Aliases: {acc.aliases.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setEditingAccessory({ ...acc })}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Editar"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAccessory(acc)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* --- TAB: SITES --- */}
      {subTab === 'sites' && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setSiteStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  siteStatusFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Todas ({jobSites.length})
              </button>
              <button
                type="button"
                onClick={() => setSiteStatusFilter('active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  siteStatusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-emerald-400 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Activas ({jobSites.filter(s => s.active !== false).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSiteStatusFilter('inactive')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  siteStatusFilter === 'inactive'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Inactivas ({jobSites.filter(s => s.active === false).length})</span>
              </button>
            </div>

            <button
              onClick={() =>
                setEditingSite({
                  name: '',
                  contractor_id: contractors[0]?.id || '',
                  active: true,
                })
              }
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition self-end sm:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Obra / Job Site</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 px-1">
            💡 Las obras <strong className="text-emerald-400 font-bold">Activas</strong> son visibles y seleccionables por los instaladores al crear reportes. Las <strong className="text-amber-400 font-bold">Inactivas</strong> quedan ocultas para los instaladores.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {jobSites
              .filter(site => {
                if (siteStatusFilter === 'active' && site.active === false) return false;
                if (siteStatusFilter === 'inactive' && site.active !== false) return false;
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  return (
                    site.name.toLowerCase().includes(q) ||
                    (site.contractor_name && site.contractor_name.toLowerCase().includes(q))
                  );
                }
                return true;
              })
              .map(site => {
                const isActive = site.active !== false;
                return (
                  <div
                    key={site.id}
                    className={`p-3.5 rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between gap-3 ${
                      isActive ? 'border-slate-800' : 'border-amber-500/20 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-white">{site.name}</h4>
                        <p className="text-xs text-slate-400">
                          Contratista: {site.contractor_name || 'AP'}
                        </p>
                      </div>

                      {/* Active/Inactive One-Click Toggle Badge */}
                      <button
                        type="button"
                        onClick={() => handleToggleSiteActive(site)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
                        }`}
                        title={isActive ? 'Click para Desactivar (ocultar a instaladores)' : 'Click para Activar (mostrar a instaladores)'}
                      >
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span>{isActive ? 'Activa' : 'Inactiva'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="text-[10px] text-slate-500">
                        {isActive ? 'Visible a instaladores' : 'Oculta a instaladores'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingSite({ ...site })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSite(site)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* --- TAB: CONTRACTORS --- */}
      {subTab === 'contractors' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button
              onClick={() => setEditingContractor({ name: '' })}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Contratista</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {contractors.map(cont => (
              <div
                key={cont.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{cont.name}</h4>
                  <span className="text-[10px] text-slate-500">ID: {cont.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingContractor({ ...cont })}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteContractor(cont)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessory Edit Modal */}
      {editingAccessory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveAccessory}
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingAccessory.id ? 'Editar Accesorio' : 'Nuevo Accesorio División 10'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingAccessory(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Nombre del Accesorio:
                </label>
                <input
                  type="text"
                  required
                  value={editingAccessory.name || ''}
                  onChange={e =>
                    setEditingAccessory(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800 focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    value={editingAccessory.category || 'General'}
                    onChange={e =>
                      setEditingAccessory(prev => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Unidad:
                  </label>
                  <select
                    value={editingAccessory.unit || 'each'}
                    onChange={e =>
                      setEditingAccessory(prev => ({
                        ...prev,
                        unit: e.target.value as AccessoryUnit,
                      }))
                    }
                    className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                  >
                    <option value="each">each (piezas)</option>
                    <option value="ft">ft (pies)</option>
                    <option value="in">in (pulgadas)</option>
                    <option value="sheet">sheet (láminas)</option>
                    <option value="room">room (habitaciones)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Precio Ref ($):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={editingAccessory.default_price || ''}
                    onChange={e =>
                      setEditingAccessory(prev => ({
                        ...prev,
                        default_price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-slate-950 text-white font-mono px-3 py-2 rounded-xl border border-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Tipo:
                  </label>
                  <select
                    value={editingAccessory.item_type || 'product'}
                    onChange={e =>
                      setEditingAccessory(prev => ({
                        ...prev,
                        item_type: e.target.value as any,
                      }))
                    }
                    className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                  >
                    <option value="product">Producto Instalado</option>
                    <option value="activity">Actividad / Tarea</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Aliases (separados por coma):
                </label>
                <input
                  type="text"
                  placeholder="ej. barra de baño, grabbar, barra 36"
                  value={editingAccessory.aliases?.join(', ') || ''}
                  onChange={e =>
                    setEditingAccessory(prev => ({
                      ...prev,
                      aliases: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                    }))
                  }
                  className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingAccessory(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Guardar Accesorio
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Site Edit Modal */}
      {editingSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveSite}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingSite.id ? 'Editar Obra' : 'Nueva Obra (Job Site)'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingSite(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Nombre de la Obra:
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Jackson Hospital 4th Floor"
                  value={editingSite.name || ''}
                  onChange={e => setEditingSite(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Contratista:
                </label>
                <select
                  value={editingSite.contractor_id || ''}
                  onChange={e =>
                    setEditingSite(prev => ({ ...prev, contractor_id: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                >
                  {contractors.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Toggle Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="font-bold text-xs text-white block">Estado de la Obra</span>
                  <span className="text-[11px] text-slate-400">
                    {editingSite.active !== false ? 'Activa (visible a instaladores)' : 'Inactiva (oculta a instaladores)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSite(prev => ({
                      ...prev,
                      active: prev?.active === false ? true : false,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    editingSite.active !== false ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingSite.active !== false ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingSite(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Guardar Obra
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contractor Edit Modal */}
      {editingContractor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveContractor}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingContractor.id ? 'Editar Contratista' : 'Nuevo Contratista'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingContractor(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Nombre de la Compañía:
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Lotspeich, Lee, Calvin..."
                  value={editingContractor.name || ''}
                  onChange={e =>
                    setEditingContractor(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingContractor(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Guardar Contratista
              </button>
            </div>
          </form>
        </div>
      )}

      {/* In-App Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title={
          deleteTarget?.type === 'accessory'
            ? 'Eliminar Accesorio'
            : deleteTarget?.type === 'site'
            ? 'Eliminar Obra'
            : 'Eliminar Contratista'
        }
        message={
          deleteTarget?.type === 'accessory'
            ? '¿Estás seguro de que deseas eliminar permanentemente este accesorio del catálogo?'
            : deleteTarget?.type === 'site'
            ? '¿Estás seguro de que deseas eliminar esta obra y su configuración de alcance?'
            : '¿Estás seguro de que deseas eliminar este contratista?'
        }
        itemName={deleteTarget?.name}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
