import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Building2,
  Clock,
  DollarSign,
  Package,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { getWeekDates, getTodayIso } from '../../utils/dateUtils';
import { WorkerHoursMetrics } from '../common/WorkerHoursMetrics';

export const AdminKpis: React.FC = () => {
  const { reports, profiles, jobSites, settings } = useApp();

  const { start: weekStart, end: weekEnd } = getWeekDates(
    getTodayIso(),
    settings?.week_start_day ?? 1
  );

  const thisWeekReports = reports.filter(
    r => r.work_date >= weekStart && r.work_date <= weekEnd
  );

  const totalWeekHours = thisWeekReports.reduce((acc, r) => {
    return acc + r.crew.reduce((sum, c) => sum + (c.is_supervisor_no_hours ? 0 : c.hours || 0), 0);
  }, 0);

  const totalPayroll = thisWeekReports.reduce((acc, r) => {
    return (
      acc +
      r.crew.reduce((sum, c) => {
        if (c.is_supervisor_no_hours) return sum;
        return sum + (c.hours || 0) * (c.hourly_rate_snapshot || 20);
      }, 0)
    );
  }, 0);

  const activeSitesCount = jobSites.filter(s => s.active).length;
  const activeWorkersCount = profiles.filter(p => p.active && p.role === 'installer').length;
  const pendingApprovals = thisWeekReports.filter(r => r.status === 'submitted').length;

  return (
    <div className="space-y-6">
      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Horas Semana</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">
            {totalWeekHours.toFixed(1)}h
          </p>
          <span className="text-[10px] text-slate-400">
            En {thisWeekReports.length} reportes cargados
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Nómina Estimada</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-mono font-black text-emerald-400">
            ${totalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-slate-400">
            Semana del {weekStart.slice(5)} al {weekEnd.slice(5)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Obras Activas</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">{activeSitesCount}</p>
          <span className="text-[10px] text-slate-400">
            {activeWorkersCount} instaladores activos
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Por Aprobar</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p
            className={`text-2xl font-mono font-black ${
              pendingApprovals > 0 ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            {pendingApprovals}
          </p>
          <span className="text-[10px] text-slate-400">
            Reportes pendientes de supervisor
          </span>
        </div>
      </div>

      {/* Comprehensive Worker Hours Metrics */}
      <WorkerHoursMetrics />
    </div>
  );
};
