import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteProgressSummary, SiteProgressItem } from '../../data/repository.interface';
import { repository } from '../../data';
import {
  TrendingUp,
  Building2,
  Package,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Info,
  Calendar,
  Users,
  RotateCcw,
} from 'lucide-react';
import { exportSiteProgressToExcel } from '../../utils/exportUtils';
import { formatDateSpanish } from '../../utils/dateUtils';

export const SiteProgressView: React.FC = () => {
  const { jobSites, contractors, accessories, settings, showToast, refreshData } = useApp();
  const [allSummaries, setAllSummaries] = useState<SiteProgressSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedContractorId, setSelectedContractorId] = useState<string>('all');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [siteStatusFilter, setSiteStatusFilter] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expanded site accordion
  const [expandedSiteIds, setExpandedSiteIds] = useState<string[]>([]);

  // Contributing reports detail drawer
  const [selectedDetailItem, setSelectedDetailItem] = useState<{
    siteName: string;
    item: SiteProgressItem;
  } | null>(null);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const summaries = await repository.getAllSitesProgress();
      setAllSummaries(summaries);
      // Auto-expand first site by default
      if (summaries.length > 0 && expandedSiteIds.length === 0) {
        setExpandedSiteIds([summaries[0].jobSite.id]);
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
      showToast('Error cargando el avance de obras', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [settings?.progress_counts]);

  const toggleExpand = (siteId: string) => {
    setExpandedSiteIds(prev =>
      prev.includes(siteId) ? prev.filter(id => id !== siteId) : [...prev, siteId]
    );
  };

  const handleToggleSiteCompleted = async (site: any) => {
    try {
      const nextCompleted = !site.is_completed;
      await repository.saveJobSite({
        ...site,
        is_completed: nextCompleted,
        completed_at: nextCompleted ? new Date().toISOString() : undefined,
      });
      await refreshData();
      await loadProgress();
      showToast(
        nextCompleted
          ? `Obra "${site.name}" marcada como COMPLETADA`
          : `Obra "${site.name}" reabierta (En Progreso)`,
        'success'
      );
    } catch (e) {
      showToast('Error al actualizar estado de la obra', 'error');
    }
  };

  // Get distinct categories
  const categories = Array.from(new Set(accessories.map(a => a.category))).filter(Boolean);

  // Filter summaries
  const filteredSummaries = allSummaries.filter(summary => {
    if (selectedSiteId !== 'all' && summary.jobSite.id !== selectedSiteId) return false;
    if (
      selectedContractorId !== 'all' &&
      summary.jobSite.contractor_id !== selectedContractorId
    )
      return false;
    if (siteStatusFilter === 'in_progress' && summary.jobSite.is_completed) return false;
    if (siteStatusFilter === 'completed' && !summary.jobSite.is_completed) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSite = summary.jobSite.name.toLowerCase().includes(q);
      const matchesContractor = (summary.jobSite.contractor_name || '')
        .toLowerCase()
        .includes(q);
      const matchesItems = summary.items.some(it =>
        it.accessoryName.toLowerCase().includes(q)
      );
      if (!matchesSite && !matchesContractor && !matchesItems) return false;
    }
    return true;
  });

  const handleExportExcel = (summary: SiteProgressSummary) => {
    try {
      exportSiteProgressToExcel(summary);
      showToast(`Exportado reporte de avance de ${summary.jobSite.name}`, 'success');
    } catch (e) {
      showToast('Error exportando Excel', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Configuration Info */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Avance Físico de Obra</h3>
            <p className="text-slate-400">
              Modo de cómputo:{' '}
              <strong className="text-amber-400">
                {settings?.progress_counts === 'approved'
                  ? 'Solo reportes aprobados'
                  : 'Aprobados + Enviados pendientes'}
              </strong>
            </p>
          </div>
        </div>

        <button
          onClick={loadProgress}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 active:scale-95 transition"
        >
          Actualizar datos
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar obra, contratista..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Contractor Filter */}
          <div>
            <select
              value={selectedContractorId}
              onChange={e => setSelectedContractorId(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Todos los Contratistas</option>
              {contractors.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Site Filter */}
          <div>
            <select
              value={selectedSiteId}
              onChange={e => setSelectedSiteId(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Todas las Obras</option>
              {jobSites.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Site Status Filter (Progreso vs Completada) */}
          <div>
            <select
              value={siteStatusFilter}
              onChange={e => setSiteStatusFilter(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Estado: Todas las Obras</option>
              <option value="in_progress">Estado: En Progreso</option>
              <option value="completed">Estado: Completadas</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-slate-200 font-semibold border border-slate-800 focus:outline-hidden focus:border-amber-400"
            >
              <option value="all">Todas las Categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sites Accordion Cards */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Calculando avance de obras...</div>
      ) : filteredSummaries.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-2">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="font-bold text-slate-300">No hay obras que coincidan con los filtros</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSummaries.map(summary => {
            const isExpanded = expandedSiteIds.includes(summary.jobSite.id);
            const isCompleted = Boolean(summary.jobSite.is_completed);
            const items = summary.items.filter(it =>
              selectedCategory === 'all' ? true : it.category === selectedCategory
            );

            return (
              <div
                key={summary.jobSite.id}
                className={`rounded-2xl border overflow-hidden shadow-md transition-all ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/30'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {/* Header Card */}
                <div
                  onClick={() => toggleExpand(summary.jobSite.id)}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/50 transition"
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="mt-1 p-1 rounded-lg text-slate-400 hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-white">
                          {summary.jobSite.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {summary.jobSite.contractor_name || 'AP'}
                        </span>
                        {summary.jobSite.active === false ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            Inactiva
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Activa
                          </span>
                        )}
                        {isCompleted ? (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Obra Completada</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            En Progreso
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Método:{' '}
                        <span className="text-amber-400 font-semibold">
                          {summary.methodUsed === 'value_weighted'
                            ? 'Ponderado por valor económico'
                            : 'Promedio simple'}
                        </span>
                        {isCompleted && summary.jobSite.completed_at && (
                          <span className="text-emerald-400 ml-2">
                            • Finalizada el {formatDateSpanish(summary.jobSite.completed_at.substring(0, 10))}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Counters, Completion Button & Global Bar */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start lg:self-center">
                    {/* Botón de Completado en el Progreso de las Obras */}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleToggleSiteCompleted(summary.jobSite);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 ${
                        isCompleted
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                      }`}
                      title={isCompleted ? 'Reabrir obra (volver a progreso)' : 'Marcar obra como completada'}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Reabrir Obra</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>Completada ✓</span>
                        </>
                      )}
                    </button>

                    {/* Counters */}
                    <div className="grid grid-cols-3 gap-2.5 text-right text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Planificado</span>
                        <span className="font-mono font-bold text-white text-sm">
                          {summary.totalPlannedItems}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400 block">Instalado</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          {summary.totalInstalledItems}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 block">Faltante</span>
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          {summary.totalMissingItems}
                        </span>
                      </div>
                    </div>

                    {/* Overall Progress Badge */}
                    <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                      <div className="text-right">
                        <span className="text-2xl font-mono font-black text-white">
                          {summary.overallPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center p-1 border border-slate-800">
                        <div
                          className={`w-full h-full rounded-lg flex items-center justify-center font-bold text-xs border ${
                            isCompleted || summary.overallPercentage >= 100
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                          }`}
                        >
                          {summary.overallPercentage >= 100 ? '100%' : `${summary.overallPercentage.toFixed(0)}%`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall site progress bar */}
                <div className="w-full h-1.5 bg-slate-950">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, summary.overallPercentage)}%` }}
                  />
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/40 space-y-4 animate-in fade-in duration-150">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-xs bg-emerald-500" />
                          <span>Aprobado</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-xs bg-amber-500 progress-striped" />
                          <span>Pendiente de aprobación</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSiteCompleted(summary.jobSite)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                            isCompleted
                              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                              : 'bg-emerald-600/90 text-white border-emerald-500 hover:bg-emerald-600'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                              <span>Reabrir Obra</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Marcar Completada</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleExportExcel(summary)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Exportar Avance (.xlsx)</span>
                        </button>
                      </div>
                    </div>

                    {/* Table / List of items */}
                    <div className="space-y-2.5">
                      {items.map(item => {
                        const approvedPct =
                          item.planned > 0
                            ? (item.approvedInstalled / item.planned) * 100
                            : 0;
                        const pendingPct =
                          item.planned > 0
                            ? (item.submittedInstalled / item.planned) * 100
                            : 0;
                        const isOver = item.totalInstalled > item.planned;

                        return (
                          <div
                            key={item.accessoryId}
                            className="p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-slate-100">
                                    {item.accessoryName}
                                  </span>
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                                    {item.category}
                                  </span>
                                  {isOver && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                      Exceso (+{(item.totalInstalled - item.planned).toFixed(1)})
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Numeric breakdown (Tap to inspect) */}
                              <button
                                onClick={() =>
                                  setSelectedDetailItem({
                                    siteName: summary.jobSite.name,
                                    item,
                                  })
                                }
                                className="flex items-center gap-3 text-xs bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-amber-400/50 transition group"
                                title="Ver reporte detallado por fecha e instalador"
                              >
                                <div>
                                  <span className="text-[10px] text-slate-500 block">Plan:</span>
                                  <span className="font-mono font-bold text-slate-300">
                                    {item.planned} {item.unit}
                                  </span>
                                </div>
                                <span className="text-slate-600">/</span>
                                <div>
                                  <span className="text-[10px] text-emerald-400 block">Inst:</span>
                                  <span className="font-mono font-bold text-emerald-400 group-hover:underline">
                                    {item.totalInstalled} {item.unit}
                                  </span>
                                </div>
                                <span className="text-slate-600">/</span>
                                <div>
                                  <span className="text-[10px] text-amber-400 block">Falta:</span>
                                  <span className="font-mono font-bold text-amber-400">
                                    {item.remaining} {item.unit}
                                  </span>
                                </div>
                                <div className="pl-2 border-l border-slate-800 font-mono font-black text-amber-400 text-sm">
                                  {item.percentage.toFixed(0)}%
                                </div>
                              </button>
                            </div>

                            {/* 2-segment progress bar */}
                            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex border border-slate-800/80">
                              {/* Approved segment (solid emerald) */}
                              <div
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${Math.min(100, approvedPct)}%` }}
                                title={`Aprobado: ${item.approvedInstalled} ${item.unit}`}
                              />
                              {/* Pending segment (striped amber) */}
                              <div
                                className="h-full bg-amber-500 progress-striped transition-all duration-300"
                                style={{
                                  width: `${Math.min(100 - approvedPct, pendingPct)}%`,
                                }}
                                title={`Pendiente: ${item.submittedInstalled} ${item.unit}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Unplanned items section ("Instalado sin planificar") */}
                    {summary.unplannedItems.length > 0 && (
                      <div className="mt-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/60 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>
                            Instalado Sin Planificar ({summary.unplannedItems.length} ítems en obra no incluidos en el alcance inicial)
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {summary.unplannedItems.map(unp => (
                            <div
                              key={unp.accessoryId}
                              onClick={() =>
                                setSelectedDetailItem({
                                  siteName: summary.jobSite.name,
                                  item: unp,
                                })
                              }
                              className="p-2.5 rounded-lg bg-slate-900 border border-amber-900/40 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-850"
                            >
                              <span className="font-semibold text-white">
                                {unp.accessoryName}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-amber-300">
                                  {unp.totalInstalled} {unp.unit}
                                </span>
                                <span className="text-[10px] text-slate-400">Ver días</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Contributing Reports Breakdown Modal */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Historial de Instalación • {selectedDetailItem.siteName}
                </span>
                <h3 className="font-bold text-base text-white">
                  {selectedDetailItem.item.accessoryName}
                </h3>
                <p className="text-xs text-slate-400">
                  Total instalado:{' '}
                  <strong className="text-white">
                    {selectedDetailItem.item.totalInstalled} {selectedDetailItem.item.unit}
                  </strong>{' '}
                  (Planificado: {selectedDetailItem.item.planned} {selectedDetailItem.item.unit})
                </p>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* List of contributing dates & workers */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {selectedDetailItem.item.contributingReports.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  No hay reportes cargados aún para este ítem.
                </p>
              ) : (
                selectedDetailItem.item.contributingReports.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{c.workDate}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        +{c.quantity} {c.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                      <span className="truncate max-w-[200px]">
                        Instaladores: {c.installers.join(', ')}
                      </span>
                      <span
                        className={`capitalize font-bold ${
                          c.status === 'approved' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {c.status === 'approved' ? 'Aprobado' : 'Enviado'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setSelectedDetailItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
