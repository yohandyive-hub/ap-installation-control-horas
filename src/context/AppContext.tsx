import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Profile,
  Contractor,
  JobSite,
  Accessory,
  SiteScope,
  Report,
  Settings,
  Permission,
  PermissionModule,
  UserRole,
} from '../types';
import { repository } from '../data';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface AppContextType {
  currentUser: Profile | null;
  setCurrentUser: (user: Profile | null) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  profiles: Profile[];
  contractors: Contractor[];
  jobSites: JobSite[];
  accessories: Accessory[];
  siteScopes: SiteScope[];
  reports: Report[];
  settings: Settings | null;
  permissions: Permission[];
  hasPermission: (
    module: PermissionModule,
    action?: 'can_view' | 'can_create' | 'can_edit' | 'can_delete'
  ) => boolean;
  getPermissionScope: (module: PermissionModule) => 'own' | 'all';
  loading: boolean;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
  switchUserById: (userId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(() => {
    try {
      const saved = localStorage.getItem('ap_install_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('ap_install_auth_user');
      if (saved) {
        const u = JSON.parse(saved);
        return u.role || 'installer';
      }
    } catch {}
    return 'installer';
  });
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [jobSites, setJobSites] = useState<JobSite[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [siteScopes, setSiteScopes] = useState<SiteScope[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [
        profs,
        conts,
        sites,
        accs,
        scopes,
        reps,
        sets,
        perms,
      ] = await Promise.all([
        repository.getProfiles(),
        repository.getContractors(),
        repository.getJobSites(),
        repository.getAccessories(),
        repository.getSiteScopes(),
        repository.getReports(),
        repository.getSettings(),
        repository.getPermissions(),
      ]);

      setProfiles(profs);
      setContractors(conts);
      setJobSites(sites);
      setAccessories(accs);
      setSiteScopes(scopes);
      setReports(reps);
      setSettings(sets);
      setPermissions(perms);
    } catch (err) {
      console.error('Error loading app data:', err);
      showToast('Error cargando los datos del sistema', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Synchronize HTML theme class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, [theme]);

  // Ensure activeRole is strictly 'installer' for installer accounts
  useEffect(() => {
    if (currentUser?.role === 'installer' && activeRole !== 'installer') {
      setActiveRole('installer');
    }
  }, [currentUser, activeRole]);

  const handleSetCurrentUser = (user: Profile | null) => {
    setCurrentUser(user);
    if (user) {
      try {
        localStorage.setItem('ap_install_auth_user', JSON.stringify(user));
      } catch {}
      if (user.role === 'installer') {
        setActiveRole('installer');
      }
    } else {
      try {
        localStorage.removeItem('ap_install_auth_user');
      } catch {}
      setActiveRole('installer');
    }
  };

  const logout = () => {
    handleSetCurrentUser(null);
    setActiveRole('installer');
    showToast('Sesión cerrada correctamente', 'info');
  };

  const switchUserById = (userId: string) => {
    const found = profiles.find(p => p.id === userId);
    if (found) {
      handleSetCurrentUser(found);
      setActiveRole(found.role);
      showToast(`Cambiado a usuario: ${found.full_name} (${found.role})`, 'info');
    }
  };

  const hasPermission = useCallback(
    (
      module: PermissionModule,
      action: 'can_view' | 'can_create' | 'can_edit' | 'can_delete' = 'can_view'
    ): boolean => {
      // Determine the effective role for permissions check:
      // If the current user is admin AND activeRole is admin, admin has full access.
      // If the admin is previewing as 'installer' or 'supervisor' via activeRole,
      // evaluate that role's configured permissions so the preview is 100% faithful!
      const effectiveRole = (currentUser?.role === 'admin' ? activeRole : currentUser?.role) || 'installer';
      if (effectiveRole === 'admin') return true;

      const perm = permissions.find(p => p.role === effectiveRole && p.module === module);
      if (!perm) return false;
      return Boolean(perm[action]);
    },
    [currentUser, activeRole, permissions]
  );

  const getPermissionScope = useCallback(
    (module: PermissionModule): 'own' | 'all' => {
      const effectiveRole = (currentUser?.role === 'admin' ? activeRole : currentUser?.role) || 'installer';
      if (effectiveRole === 'admin') return 'all';
      const perm = permissions.find(p => p.role === effectiveRole && p.module === module);
      return perm?.scope ?? (effectiveRole === 'installer' ? 'own' : 'all');
    },
    [currentUser, activeRole, permissions]
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        activeRole,
        setActiveRole,
        profiles,
        contractors,
        jobSites,
        accessories,
        siteScopes,
        reports,
        settings,
        permissions,
        hasPermission,
        getPermissionScope,
        loading,
        theme,
        setTheme,
        toasts,
        showToast,
        removeToast,
        refreshData,
        switchUserById,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
