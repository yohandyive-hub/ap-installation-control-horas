import React, { useState, useEffect } from 'react';
import { SiteProgressView } from './SiteProgressView';
import { ReportReviewView } from './ReportReviewView';
import { WorkerHoursMetrics } from '../common/WorkerHoursMetrics';
import { TrendingUp, FileCheck2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupervisorDashboard: React.FC = () => {
  const { hasPermission, currentUser } = useApp();

  const canViewProgress =
    currentUser?.role === 'admin' || hasPermission('progress', 'can_view');
  const canViewReview =
    currentUser?.role === 'admin' || hasPermission('review', 'can_view');
  const canViewMetrics =
    currentUser?.role === 'admin' || hasPermission('hourly_rates', 'can_view');

  const hasAnyTab = canViewProgress || canViewReview || canViewMetrics;
  const defaultTab = canViewProgress ? 'progress' : canViewReview ? 'review' : 'metrics';
  const [activeTab, setActiveTab] = useState<'progress' | 'review' | 'metrics'>(defaultTab);

  // Sync activeTab if permissions change
  useEffect(() => {
    if (activeTab === 'progress' && !canViewProgress) {
      if (canViewReview) setActiveTab('review');
      else if (canViewMetrics) setActiveTab('metrics');
    } else if (activeTab === 'review' && !canViewReview) {
      if (canViewProgress) setActiveTab('progress');
      else if (canViewMetrics) setActiveTab('metrics');
    } else if (activeTab === 'metrics' && !canViewMetrics) {
      if (canViewProgress) setActiveTab('progress');
      else if (canViewReview) setActiveTab('review');
    }
  }, [canViewProgress, canViewReview, canViewMetrics, activeTab]);

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar">
        {canViewProgress && (
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 min-w-[120px] py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all touch-target ${
              activeTab === 'progress'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden md:inline">Avance de Obra por Sitio</span>
            <span className="md:hidden">Avance</span>
          </button>
        )}

        {canViewReview && (
          <button
            onClick={() => setActiveTab('review')}
            className={`flex-1 min-w-[120px] py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all touch-target ${
              activeTab === 'review'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span className="hidden md:inline">Revisión y Nómina</span>
            <span className="md:hidden">Revisión</span>
          </button>
        )}

        {canViewMetrics && (
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex-1 min-w-[120px] py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all touch-target ${
              activeTab === 'metrics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Horas por Instalador</span>
            <span className="md:hidden">Horas</span>
          </button>
        )}
      </div>

      {/* View Content */}
      {!hasAnyTab && (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <FileCheck2 className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="font-bold text-sm text-slate-200">Sin secciones habilitadas</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Actualmente no tienes permisos activos para visualizar secciones dentro del módulo de supervisión. Consulta con un Administrador para habilitar Revisión, Avance u Horas.
          </p>
        </div>
      )}
      {activeTab === 'progress' && canViewProgress && <SiteProgressView />}
      {activeTab === 'review' && canViewReview && <ReportReviewView />}
      {activeTab === 'metrics' && canViewMetrics && <WorkerHoursMetrics />}
    </div>
  );
};
