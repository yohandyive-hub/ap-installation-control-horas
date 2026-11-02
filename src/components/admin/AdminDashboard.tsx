import React, { useState } from 'react';
import { AdminKpis } from './AdminKpis';
import { CataloguesManager } from './CataloguesManager';
import { SiteScopeManager } from './SiteScopeManager';
import { JsonImportManager } from './JsonImportManager';
import { UsersManager } from './UsersManager';
import { PermissionsMatrixManager } from './PermissionsMatrixManager';
import { SettingsManager } from './SettingsManager';
import { AuditLogViewer } from './AuditLogViewer';
import { ConsolidatedExcelImporter } from './ConsolidatedExcelImporter';
import {
  BarChart3,
  Package,
  Layers,
  FileCode,
  Users,
  Shield,
  Sliders,
  History,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<
    | 'kpis'
    | 'consolidated'
    | 'catalogues'
    | 'scope'
    | 'import'
    | 'users'
    | 'permissions'
    | 'settings'
    | 'audit'
  >('kpis');

  return (
    <div className="space-y-4">
      {/* Navigation Chips Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto text-xs font-bold no-scrollbar">
        <button
          onClick={() => setTab('kpis')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'kpis'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Métricas</span>
        </button>

        <button
          onClick={() => setTab('consolidated')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'consolidated'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-emerald-400 hover:text-white font-black'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Consolidado 2026</span>
        </button>

        <button
          onClick={() => setTab('catalogues')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'catalogues'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Catálogos y Obras</span>
        </button>

        <button
          onClick={() => setTab('scope')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'scope'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Alcance de Obra</span>
        </button>

        <button
          onClick={() => setTab('import')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'import'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Importar JSON</span>
        </button>

        <button
          onClick={() => setTab('users')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'users'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Usuarios</span>
        </button>

        <button
          onClick={() => setTab('permissions')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'permissions'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Permisos</span>
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'settings'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ajustes</span>
        </button>

        <button
          onClick={() => setTab('audit')}
          className={`shrink-0 px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
            tab === 'audit'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Auditoría</span>
        </button>
      </div>

      {/* Tab Panels */}
      {tab === 'kpis' && <AdminKpis />}
      {tab === 'consolidated' && <ConsolidatedExcelImporter />}
      {tab === 'catalogues' && <CataloguesManager />}
      {tab === 'scope' && <SiteScopeManager />}
      {tab === 'import' && <JsonImportManager />}
      {tab === 'users' && <UsersManager />}
      {tab === 'permissions' && <PermissionsMatrixManager />}
      {tab === 'settings' && <SettingsManager />}
      {tab === 'audit' && <AuditLogViewer />}
    </div>
  );
};
