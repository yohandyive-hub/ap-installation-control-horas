import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RolePermission, UserRole, PermissionModule } from '../../types';
import { repository } from '../../data';
import {
  Shield,
  Save,
  Clock,
  Lock,
  Users,
  FileText,
  PlusCircle,
  Eye,
  TrendingUp,
  Layers,
  Package,
  DollarSign,
  UserCheck,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Sliders,
  Table as TableIcon,
} from 'lucide-react';

export const PermissionsMatrixManager: React.FC = () => {
  const { permissions, refreshData, showToast } = useApp();
  const [localPermissions, setLocalPermissions] = useState<RolePermission[]>(permissions);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [selectedRole, setSelectedRole] = useState<UserRole>('installer');

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      setLocalPermissions(permissions);
    }
  }, [permissions]);

  const roles: { id: UserRole; label: string; badge: string; desc: string }[] = [
    {
      id: 'installer',
      label: 'Instalador',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      desc: 'Controla exactamente qué pestañas ve el instalador en su menú superior y la privacidad de sus datos de horas.',
    },
    {
      id: 'supervisor',
      label: 'Supervisor',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      desc: 'Acceso a revisión de reportes diarios, avance general de obras y métricas del equipo.',
    },
    {
      id: 'admin',
      label: 'Administrador',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      desc: 'Acceso total y configuración de todo el sistema.',
    },
  ];

  const modulesList: { id: PermissionModule; label: string; tabName: string }[] = [
    { id: 'reports', label: 'Reportes Diarios', tabName: '+ Nuevo Reporte / Mis Reportes' },
    { id: 'hourly_rates', label: 'Control de Horas', tabName: 'Horas' },
    { id: 'progress', label: 'Avance de Obras', tabName: 'Avance de Obra' },
    { id: 'site_scope', label: 'Alcance por Obra', tabName: 'Alcance Obra' },
    { id: 'catalogues', label: 'Catálogos y Obras', tabName: 'Catálogos' },
    { id: 'prices', label: 'Precios de Instalación', tabName: 'Precios' },
    { id: 'review', label: 'Revisión y Aprobación', tabName: 'Revisión Reportes' },
    { id: 'supervisor', label: 'Módulo Supervisor', tabName: 'Supervisor' },
    { id: 'users', label: 'Gestión de Usuarios', tabName: 'Usuarios' },
  ];

  const getPerm = (role: UserRole, mod: PermissionModule): RolePermission => {
    return (
      localPermissions.find(p => p.role === role && p.module === mod) || {
        role,
        module: mod,
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
        scope: mod === 'hourly_rates' && role === 'installer' ? 'own' : 'all',
      }
    );
  };

  const updatePerm = (
    role: UserRole,
    mod: PermissionModule,
    patch: Partial<RolePermission>
  ) => {
    setLocalPermissions(prev => {
      const idx = prev.findIndex(p => p.role === role && p.module === mod);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ...patch };
        return updated;
      } else {
        const newPerm: RolePermission = {
          role,
          module: mod,
          can_view: false,
          can_create: false,
          can_edit: false,
          can_delete: false,
          scope: 'all',
          ...patch,
        };
        return [...prev, newPerm];
      }
    });
  };

  const toggleAction = (
    role: UserRole,
    mod: PermissionModule,
    action: 'can_view' | 'can_create' | 'can_edit' | 'can_delete'
  ) => {
    const current = getPerm(role, mod);
    updatePerm(role, mod, { [action]: !current[action] });
  };

  const setScope = (role: UserRole, mod: PermissionModule, scope: 'own' | 'all') => {
    updatePerm(role, mod, { scope });
  };

  // Quick preset for standard installer configuration
  const applyStandardInstallerPreset = () => {
    setLocalPermissions(prev => {
      return prev.map(p => {
        if (p.role !== 'installer') return p;
        if (p.module === 'reports') {
          return { ...p, can_view: true, can_create: true, can_edit: true, can_delete: false, scope: 'own' };
        }
        if (p.module === 'hourly_rates') {
          return { ...p, can_view: true, can_create: false, can_edit: false, can_delete: false, scope: 'own' };
        }
        // Other tabs hidden by default for maximum contractor privacy
        return { ...p, can_view: false, can_create: false, can_edit: false, can_delete: false };
      });
    });
    showToast('Configuración recomendada de Instalador aplicada (solo sus propias horas)', 'info');
  };

  // Quick preset to unlock all installer tabs
  const applyFullInstallerPreset = () => {
    setLocalPermissions(prev => {
      return prev.map(p => {
        if (p.role !== 'installer') return p;
        return { ...p, can_view: true };
      });
    });
    showToast('Todas las pestañas han sido habilitadas para Instalador', 'info');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await repository.savePermissions(localPermissions);
      await refreshData();
      showToast('Permisos guardados y aplicados correctamente', 'success');
    } catch {
      showToast('Error al guardar permisos', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Save Action */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Configuración de Módulos y Permisos</h3>
            <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
              Configura de manera directa qué pestañas del menú superior puede visualizar cada rol y restringe el alcance de datos para que los instaladores solo vean su propia información.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                viewMode === 'visual'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Por Rol</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                viewMode === 'table'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matriz Tabla</span>
            </button>
          </div>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </div>

      {/* Helpful preview note */}
      <div className="px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />
        <span>
          <strong>Previsualización en vivo:</strong> Cuando guardes, puedes usar el conmutador de roles en la parte superior (<strong>[Instalador] [Supervisor] [Admin]</strong>) para verificar exactamente cómo ve la pantalla cada tipo de usuario.
        </span>
      </div>

      {viewMode === 'visual' ? (
        /* Visual Role Configuration */
        <div className="space-y-4">
          {/* Role selector tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  selectedRole === r.id
                    ? 'bg-slate-800/90 border-purple-500/50 shadow-md ring-1 ring-purple-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{r.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.badge}`}>
                    {r.id === 'installer' ? '7 Módulos' : r.id === 'supervisor' ? '6 Módulos' : 'Acceso Total'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* INSTALLER ROLE CONFIGURATION */}
          {selectedRole === 'installer' && (
            <div className="space-y-4">
              {/* Presets header */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    Pestañas y Módulos Visibles para el Instalador
                  </h4>
                  <p className="text-xs text-slate-400">
                    Determina qué pestañas se renderizan en el panel superior del instalador.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={applyStandardInstallerPreset}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Configuración Recomendada</span>
                  </button>
                  <button
                    onClick={applyFullInstallerPreset}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Mostrar Todas</span>
                  </button>
                </div>
              </div>

              {/* MODULE 1: HORAS (SPECIAL EMPHASIS ON USER PRIVACY) */}
              {(() => {
                const perm = getPerm('installer', 'hourly_rates');
                const isOwn = perm.scope === 'own';
                return (
                  <div className={`p-4 rounded-2xl border transition ${
                    perm.can_view
                      ? 'bg-slate-900 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">Módulo: Horas</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-amber-300 border border-amber-500/30">
                              Pestaña "Horas"
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Permite a los instaladores consultar su registro de horas trabajadas y nómina estimada.
                          </p>
                        </div>
                      </div>

                      {/* Main Tab Toggle */}
                      <button
                        onClick={() => toggleAction('installer', 'hourly_rates', 'can_view')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition shrink-0 ${
                          perm.can_view
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {perm.can_view ? 'Pestaña Activa ✓' : 'Pestaña Oculta ✕'}
                      </button>
                    </div>

                    {/* Scope / Privacy Control: Only shown if can_view is true */}
                    {perm.can_view && (
                      <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-purple-400" />
                          Privacidad y Alcance de Datos para el Instalador:
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                          {/* Option 1: Own data only */}
                          <div
                            onClick={() => setScope('installer', 'hourly_rates', 'own')}
                            className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                              isOwn
                                ? 'bg-purple-950/30 border-purple-500/60 ring-1 ring-purple-500/30'
                                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                              isOwn ? 'border-purple-400 bg-purple-500' : 'border-slate-600'
                            }`}>
                              {isOwn && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-purple-400" />
                                <span className="font-bold text-xs text-white">
                                  Solo ver sus propias horas (Recomendado)
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                El instalador que inicia sesión <strong>solo visualiza sus propias horas, sus jornadas y su nómina</strong>. Los datos, horas y tarifas de sus compañeros de trabajo permanecen <strong>completamente ocultos</strong>.
                              </p>
                            </div>
                          </div>

                          {/* Option 2: All team data */}
                          <div
                            onClick={() => setScope('installer', 'hourly_rates', 'all')}
                            className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                              !isOwn
                                ? 'bg-purple-950/30 border-purple-500/60 ring-1 ring-purple-500/30'
                                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                              !isOwn ? 'border-purple-400 bg-purple-500' : 'border-slate-600'
                            }`}>
                              {!isOwn && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-blue-400" />
                                <span className="font-bold text-xs text-white">
                                  Ver todas las horas del equipo
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                El instalador puede ver el consolidado general de horas de la empresa y la lista con todos los demás trabajadores.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* MODULE 2: REPORTES DIARIOS (+ NUEVO REPORTE / MIS REPORTES) */}
              {(() => {
                const perm = getPerm('installer', 'reports');
                return (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">Módulo: Reportes Diarios</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-blue-300 border border-blue-500/30">
                              Pestañas "+ Nuevo Reporte" y "Mis Reportes"
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Permite la carga de partes diarios con metrados, cuadrilla y registro fotográfico.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
                      {/* Can Create: + Nuevo Reporte */}
                      <div
                        onClick={() => toggleAction('installer', 'reports', 'can_create')}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          perm.can_create
                            ? 'bg-blue-950/20 border-blue-500/40 text-blue-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <PlusCircle className="w-4 h-4 text-blue-400" />
                          <span className="font-bold text-xs text-white">Pestaña "+ Nuevo Reporte"</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          perm.can_create ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {perm.can_create ? 'Visible ✓' : 'Oculta ✕'}
                        </span>
                      </div>

                      {/* Can View: Mis Reportes */}
                      <div
                        onClick={() => toggleAction('installer', 'reports', 'can_view')}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          perm.can_view
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-xs text-white">Pestaña "Mis Reportes"</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          perm.can_view ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {perm.can_view ? 'Visible ✓' : 'Oculta ✕'}
                        </span>
                      </div>

                      {/* Can Edit: Editar reportes */}
                      <div
                        onClick={() => toggleAction('installer', 'reports', 'can_edit')}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          perm.can_edit
                            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-xs text-white">Editar Reportes Propios</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          perm.can_edit ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {perm.can_edit ? 'Permitido ✓' : 'Bloqueado ✕'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* MODULE 3: AVANCE DE OBRA */}
              {(() => {
                const perm = getPerm('installer', 'progress');
                return (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Módulo: Avance de Obra</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-emerald-300 border border-emerald-500/30">
                            Pestaña "Avance de Obra"
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Muestra los porcentajes y métricas de avance de instalación acumulado en cada obra.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAction('installer', 'progress', 'can_view')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition shrink-0 ${
                        perm.can_view
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {perm.can_view ? 'Visible ✓' : 'Oculta ✕'}
                    </button>
                  </div>
                );
              })()}

              {/* MODULE 4: ALCANCE OBRA */}
              {(() => {
                const perm = getPerm('installer', 'site_scope');
                return (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Módulo: Alcance Obra</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-purple-300 border border-purple-500/30">
                            Pestaña "Alcance Obra"
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Permite ver los metrados presupuestados y cantidades contratadas para cada obra.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAction('installer', 'site_scope', 'can_view')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition shrink-0 ${
                        perm.can_view
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {perm.can_view ? 'Visible ✓' : 'Oculta ✕'}
                    </button>
                  </div>
                );
              })()}

              {/* MODULE 5: CATÁLOGOS */}
              {(() => {
                const perm = getPerm('installer', 'catalogues');
                return (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mt-0.5">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Módulo: Catálogos</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-cyan-300 border border-cyan-500/30">
                            Pestaña "Catálogos"
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Permite consultar el listado de contratistas, obras registradas y accesorios disponibles.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAction('installer', 'catalogues', 'can_view')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition shrink-0 ${
                        perm.can_view
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {perm.can_view ? 'Visible ✓' : 'Oculta ✕'}
                    </button>
                  </div>
                );
              })()}

              {/* MODULE 6: PRECIOS */}
              {(() => {
                const perm = getPerm('installer', 'prices');
                return (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Módulo: Precios</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-amber-300 border border-amber-500/30">
                            Pestaña "Precios"
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Muestra la lista de precios unitarios pactados por pieza/accesorio para los contratistas.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAction('installer', 'prices', 'can_view')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition shrink-0 ${
                        perm.can_view
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {perm.can_view ? 'Visible ✓' : 'Oculta ✕'}
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SUPERVISOR ROLE CONFIGURATION */}
          {selectedRole === 'supervisor' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                  Módulos y Permisos para Supervisores
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Los supervisores pueden aprobar reportes diarios, auditar avances y consultar las horas de cuadrilla.
                </p>
              </div>

              {[
                { id: 'review' as PermissionModule, name: 'Revisión y Aprobación de Reportes', desc: 'Permite revisar, aprobar y liquidar reportes enviados por instaladores.' },
                { id: 'progress' as PermissionModule, name: 'Avance de Obras', desc: 'Permite ver el avance global y detallado de todas las obras.' },
                { id: 'site_scope' as PermissionModule, name: 'Alcance Obra (Metrados)', desc: 'Consulta de cantidades contractuales por sitio.' },
                { id: 'hourly_rates' as PermissionModule, name: 'Métricas de Horas del Personal', desc: 'Visualización de turnos y horas de los instaladores.' },
                { id: 'catalogues' as PermissionModule, name: 'Catálogos de Obras y Contratistas', desc: 'Acceso a la información de catálogo.' },
                { id: 'prices' as PermissionModule, name: 'Precios de Instalación', desc: 'Consulta de tarifas de piezas y accesorios.' },
              ].map(item => {
                const perm = getPerm('supervisor', item.id);
                return (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-sm text-white">{item.name}</span>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAction('supervisor', item.id, 'can_view')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          perm.can_view
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        Ver {perm.can_view ? '✓' : '✕'}
                      </button>
                      <button
                        onClick={() => toggleAction('supervisor', item.id, 'can_edit')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          perm.can_edit
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        Editar {perm.can_edit ? '✓' : '✕'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ADMIN ROLE CONFIGURATION */}
          {selectedRole === 'admin' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Rol de Administrador (Acceso Total)</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  El rol de Administrador cuenta de forma nativa e incondicional con permisos completos de visualización, creación, edición y borrado en absolutamente todos los módulos y bases de datos del sistema.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Full Matrix Table */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Módulo de Sistema</th>
                  <th className="py-3 px-4">Pestaña en Menú</th>
                  <th className="py-3 px-4">Instalador</th>
                  <th className="py-3 px-4">Supervisor</th>
                  <th className="py-3 px-4">Administrador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {modulesList.map(m => (
                  <tr key={m.id} className="hover:bg-slate-850/50">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {m.label}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {m.tabName}
                    </td>

                    {roles.map(r => {
                      const perm = getPerm(r.id, m.id);
                      return (
                        <td key={r.id} className="py-3.5 px-4 align-top">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap gap-1">
                              {/* Ver */}
                              <button
                                type="button"
                                onClick={() => toggleAction(r.id, m.id, 'can_view')}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                                  perm.can_view
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                Ver {perm.can_view ? '✓' : '✕'}
                              </button>

                              {/* Crear */}
                              <button
                                type="button"
                                onClick={() => toggleAction(r.id, m.id, 'can_create')}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                                  perm.can_create
                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                Crear {perm.can_create ? '✓' : '✕'}
                              </button>

                              {/* Editar */}
                              <button
                                type="button"
                                onClick={() => toggleAction(r.id, m.id, 'can_edit')}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                                  perm.can_edit
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                Editar {perm.can_edit ? '✓' : '✕'}
                              </button>

                              {/* Borrar */}
                              <button
                                type="button"
                                onClick={() => toggleAction(r.id, m.id, 'can_delete')}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                                  perm.can_delete
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                Borrar {perm.can_delete ? '✓' : '✕'}
                              </button>
                            </div>

                            {/* Scope selector for hourly_rates */}
                            {m.id === 'hourly_rates' && perm.can_view && (
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-[10px] text-slate-400">Alcance:</span>
                                <button
                                  type="button"
                                  onClick={() => setScope(r.id, m.id, perm.scope === 'own' ? 'all' : 'own')}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
                                    perm.scope === 'own'
                                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                      : 'bg-slate-800 text-slate-300 border-slate-700'
                                  }`}
                                >
                                  {perm.scope === 'own' ? '🔒 Solo datos propios' : '👥 Todos'}
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
