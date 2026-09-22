import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { ToastContainer } from './components/common/ToastContainer';
import { InstallerDashboard } from './components/installer/InstallerDashboard';
import { SupervisorDashboard } from './components/supervisor/SupervisorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginScreen } from './components/auth/LoginScreen';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { APLogo } from './components/common/APLogo';
import { HardHat, ShieldCheck, Clock, MapPin } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeRole, currentUser, loading, hasPermission } = useApp();
  const isOnline = useOnlineStatus();

  const canAccessSupervisor =
    currentUser?.role !== 'installer' &&
    (currentUser?.role === 'admin' ||
      (currentUser?.role === 'supervisor' && hasPermission('supervisor', 'can_view')));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-amber-400">
        <div className="text-center space-y-3">
          <APLogo className="w-12 h-12 mx-auto animate-bounce" />
          <p className="text-xs font-bold tracking-wider text-slate-400">CARGANDO AP INSTALLATION...</p>
        </div>
      </div>
    );
  }

  // If not logged in, prompt Login Screen with PIN (installer) or email/password (staff)
  if (!currentUser) {
    return (
      <>
        <LoginScreen />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <OfflineIndicator />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 pb-20 sm:pb-12 space-y-4">
        {/* Active Role Content with Strict Guard */}
        {activeRole === 'installer' && <InstallerDashboard />}
        {activeRole === 'supervisor' && canAccessSupervisor && (
          <SupervisorDashboard />
        )}
        {activeRole === 'admin' && currentUser?.role === 'admin' && <AdminDashboard />}
      </main>

      {/* Construction Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <APLogo className="w-5 h-5 shrink-0" />
            <span className="font-black text-slate-300">AP Installation LLC</span>
            <span>•</span>
            <span>División 10 Especialidades</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Florida, USA</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {isOnline ? 'Conectado a la nube' : 'Modo Offline (Almacenamiento Local)'}
            </span>
            <span>v1.0.0 PWA</span>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
