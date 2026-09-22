import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';
import { APLogo } from './APLogo';
import {
  HardHat,
  Users,
  Sun,
  Moon,
  RotateCcw,
  Shield,
  Briefcase,
  ChevronDown,
  Check,
  LogOut,
} from 'lucide-react';
import { UserRole } from '../../types';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const Header: React.FC = () => {
  const {
    currentUser,
    activeRole,
    setActiveRole,
    profiles,
    switchUserById,
    logout,
    theme,
    setTheme,
    refreshData,
    showToast,
    hasPermission,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleConfirmReset = async () => {
    setResetting(true);
    try {
      const { repository } = await import('../../data');
      await repository.resetToSeedData();
      await refreshData();
      showToast('Datos restablecidos al catálogo semilla exitosamente', 'success');
      setShowResetModal(false);
    } catch (e) {
      showToast('Error restableciendo datos', 'error');
    } finally {
      setResetting(false);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'installer':
        return { label: 'Instalador', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'supervisor':
        return { label: 'Supervisor', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'admin':
        return { label: 'Admin', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
  };

  const currentBadge = getRoleBadge(activeRole);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <APLogo className="w-10 h-10 shrink-0 drop-shadow-md hover:scale-105 transition-transform" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base tracking-tight truncate text-white">
                AP Installation
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-black tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40 hidden xs:inline-block">
                DIV. 10
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden sm:block">
              Control de Horas e Instalaciones
            </p>
          </div>
        </div>

        {/* Center / Role Switcher with strict Role-Based Access Control */}
        {/* If the current authenticated user has an 'installer' role, role switcher is completely hidden */}
        {currentUser?.role !== 'installer' && (
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveRole('installer')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 touch-target ${
                activeRole === 'installer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instalador</span>
            </button>

            {/* Supervisor tab: strictly visible only for Supervisor and Admin accounts with permission */}
            {(currentUser?.role === 'supervisor' || currentUser?.role === 'admin') &&
              (currentUser?.role === 'admin' || hasPermission('supervisor', 'can_view')) && (
                <button
                  onClick={() => setActiveRole('supervisor')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 touch-target ${
                    activeRole === 'supervisor'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Supervisor</span>
                </button>
              )}

            {/* Admin tab: strictly visible only for Admin accounts */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveRole('admin')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 touch-target ${
                  activeRole === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        )}

        {/* Right Tools: PWA Install, Theme, User Switcher */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Theme Switcher: Oscuro / Claro limpio */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-750 transition text-slate-300 hover:text-amber-400 touch-target"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold hidden md:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold hidden md:inline">Oscuro</span>
              </>
            )}
          </button>

          {/* User selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-750 transition text-left touch-target"
            >
              <div className="w-7 h-7 rounded-full bg-slate-700 text-amber-400 flex items-center justify-center font-bold text-xs uppercase border border-slate-600">
                {currentUser?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block leading-tight pr-1">
                <p className="text-xs font-bold text-slate-100 truncate max-w-[90px]">
                  {currentUser?.full_name || 'Usuario'}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {currentUser?.role || activeRole}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* For installers: Show their current identity card without allowing role/user escalation */}
                {currentUser?.role === 'installer' ? (
                  <div className="p-2 mb-1 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Sesión Activa</p>
                    <p className="text-sm font-black text-slate-100 mt-0.5">{currentUser?.full_name}</p>
                    <p className="text-[11px] text-slate-400 capitalize">Rol: Instalador</p>
                    <p className="text-[10px] text-slate-400 mt-2 bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                      Para cambiar de instalador o acceder como supervisor/admin, cierra sesión primero con el botón inferior.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="px-2 py-1.5 mb-1 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Cambiar de usuario
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                      {profiles
                        .filter(p => currentUser?.role === 'admin' || p.role === currentUser?.role)
                        .map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              switchUserById(p.id);
                              setShowUserDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition ${
                              currentUser?.id === p.id
                                ? 'bg-amber-500/20 text-amber-300 font-bold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-[10px] font-bold">
                                {p.full_name.charAt(0)}
                              </span>
                              <div>
                                <p className="font-semibold">{p.full_name}</p>
                                <p className="text-[10px] text-slate-400 capitalize">{p.role}</p>
                              </div>
                            </div>
                            {currentUser?.id === p.id && <Check className="w-4 h-4 text-amber-400" />}
                          </button>
                        ))}
                    </div>
                  </>
                )}

                <div className="mt-2 pt-2 border-t border-slate-800 space-y-1">
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowResetModal(true);
                      }}
                      disabled={resetting}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
                      <span>Restablecer catálogo semilla</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/20 transition font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* In-app Reset Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showResetModal}
        title="Restablecer Catálogo Semilla"
        message="¿Deseas restaurar todos los datos iniciales de AP Installation? Se restablecerán los reportes, obras y catálogos de ejemplo predeterminados."
        confirmButtonText="Sí, restablecer"
        isDeleting={resetting}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </header>
  );
};
