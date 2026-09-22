import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Report } from '../../types';
import { ReportForm } from './ReportForm';
import { MyReportsList } from './MyReportsList';
import { SiteProgressView } from '../supervisor/SiteProgressView';
import { SiteScopeManager } from '../admin/SiteScopeManager';
import { CataloguesManager } from '../admin/CataloguesManager';
import { WorkerHoursMetrics } from '../common/WorkerHoursMetrics';
import { extractTimeFromIso } from '../../utils/dateUtils';
import {
  Clock,
  Plus,
  ListFilter,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  Package,
  DollarSign,
} from 'lucide-react';
import { getWeekDates, getTodayIso } from '../../utils/dateUtils';

export const InstallerDashboard: React.FC = () => {
  const { currentUser, reports, settings, hasPermission } = useApp();
  const [activeTab, setActiveTab] = useState<
    'new' | 'list' | 'progress' | 'scope' | 'catalogues' | 'prices' | 'hours'
  >('new');
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  // Dynamic module permissions
  const canViewProgress = hasPermission('progress', 'can_view');
  const canViewScope = hasPermission('site_scope', 'can_view');
  const canViewCatalogues = hasPermission('catalogues', 'can_view');
  const canViewPrices = hasPermission('prices', 'can_view');
  const canViewHourlyRates = hasPermission('hourly_rates', 'can_view');

  // Success state for "Add another site with same crew"
  const [lastSubmittedReport, setLastSubmittedReport] = useState<Report | null>(null);
  const [prefillNextSite, setPrefillNextSite] = useState<{
    date: string;
    crew: Array<{ userId: string; userName: string; startAtTime: string }>;
  } | null>(null);

  // Calculate weekly hours for current user
  const { start: weekStart, end: weekEnd } = getWeekDates(getTodayIso(), settings?.week_start_day ?? 1);

  const thisWeekReports = reports.filter(r => {
    return r.work_date >= weekStart && r.work_date <= weekEnd;
  });

  const weeklyHours = thisWeekReports.reduce((total, r) => {
    const member = r.crew.find(c => c.user_id === currentUser?.id);
    if (member && !member.is_supervisor_no_hours) {
      return total + (member.hours || 0);
    }
    return total;
  }, 0);

  const targetHours = 40;
  const hoursPercent = Math.min(100, Math.round((weeklyHours / targetHours) * 100));
  const isOvertime = weeklyHours > targetHours;

  const handleReportFinished = (savedReport?: Report) => {
    if (savedReport) {
      setLastSubmittedReport(savedReport);
    }
    setEditingReport(null);
    setPrefillNextSite(null);
    setActiveTab('list');
  };

  const handleStartNextSiteReport = () => {
    if (!lastSubmittedReport) return;
    // Extract crew from last submitted report and set start time equal to end time
    const crewPrefill = lastSubmittedReport.crew.map(c => {
      const endTime = extractTimeFromIso(c.end_at);
      return {
        userId: c.user_id,
        userName: c.user_name || 'Instalador',
        startAtTime: endTime,
      };
    });

    setPrefillNextSite({
      date: lastSubmittedReport.work_date,
      crew: crewPrefill,
    });
    setLastSubmittedReport(null);
    setEditingReport(null);
    setActiveTab('new');
  };

  return (
    <div className="space-y-4">
      {/* Weekly Hours Banner (One-thumb visible) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Mi Semana ({weekStart.slice(5)} al {weekEnd.slice(5)})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {weeklyHours.toFixed(1)}
              </span>
              <span className="text-xs font-bold text-slate-400">
                / {targetHours}h meta semanal
              </span>
              {isOvertime && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  +{(weeklyHours - targetHours).toFixed(1)}h Overtime
                </span>
              )}
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Progress Bar towards 40h */}
        <div className="space-y-1">
          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 ${
                isOvertime ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${hoursPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{hoursPercent}% completado</span>
            <span>{Math.max(0, targetHours - weeklyHours).toFixed(1)}h restantes</span>
          </div>
        </div>
      </div>

      {/* Continuation Prompt: Worked at another site today? */}
      {lastSubmittedReport && activeTab === 'list' && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">¿Trabajaron en otro sitio hoy?</p>
              <p className="text-slate-300">
                Copiaremos el mismo equipo y pondremos la hora de inicio en la hora de salida de{' '}
                <strong className="text-amber-300">{lastSubmittedReport.job_site_name}</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLastSubmittedReport(null)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              No, terminar
            </button>
            <button
              onClick={handleStartNextSiteReport}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-md active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Agregar otro sitio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setEditingReport(null);
            setActiveTab('new');
          }}
          className={`flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
            activeTab === 'new'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>{editingReport ? 'Editando Reporte' : 'Nuevo Reporte'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('list');
          }}
          className={`flex-1 min-w-[120px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
            activeTab === 'list'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListFilter className="w-4 h-4 shrink-0" />
          <span>Mis Reportes</span>
        </button>

        {canViewProgress && (
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 min-w-[125px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>Avance de Obra</span>
          </button>
        )}

        {canViewScope && (
          <button
            onClick={() => setActiveTab('scope')}
            className={`flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
              activeTab === 'scope'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Alcance Obra</span>
          </button>
        )}

        {canViewCatalogues && (
          <button
            onClick={() => setActiveTab('catalogues')}
            className={`flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
              activeTab === 'catalogues'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Catálogos</span>
          </button>
        )}

        {canViewPrices && (
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex-1 min-w-[110px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
              activeTab === 'prices'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4 shrink-0" />
            <span>Precios</span>
          </button>
        )}

        {canViewHourlyRates && (
          <button
            onClick={() => setActiveTab('hours')}
            className={`flex-1 min-w-[125px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-target whitespace-nowrap ${
              activeTab === 'hours'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Horas</span>
          </button>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'new' && (
        <ReportForm
          initialReport={editingReport}
          prefillNextSite={prefillNextSite}
          onFinished={handleReportFinished}
          onCancel={() => {
            setEditingReport(null);
            setPrefillNextSite(null);
            setActiveTab('list');
          }}
        />
      )}

      {activeTab === 'list' && (
        <MyReportsList
          onNewReport={() => {
            setEditingReport(null);
            setActiveTab('new');
          }}
          onEditReport={(rep) => {
            setEditingReport(rep);
            setActiveTab('new');
          }}
        />
      )}

      {activeTab === 'progress' && canViewProgress && <SiteProgressView />}
      {activeTab === 'scope' && canViewScope && <SiteScopeManager />}
      {activeTab === 'catalogues' && canViewCatalogues && <CataloguesManager />}
      {activeTab === 'prices' && canViewPrices && <CataloguesManager initialSubTab="accessories" />}
      {activeTab === 'hours' && canViewHourlyRates && <WorkerHoursMetrics />}
    </div>
  );
};
