import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile } from '../../types';
import { APLogo } from '../common/APLogo';
import {
  KeyRound,
  Mail,
  Lock,
  HardHat,
  Shield,
  Users,
  AlertCircle,
  Eye,
  EyeOff,
  Delete,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { profiles, setCurrentUser, setActiveRole, showToast } = useApp();

  const [authMode, setAuthMode] = useState<'installer' | 'staff'>('installer');

  // Installer PIN state
  const [selectedInstaller, setSelectedInstaller] = useState<Profile | null>(null);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Staff (Supervisor / Admin) state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [staffError, setStaffError] = useState<string | null>(null);

  const activeInstallers = profiles.filter(p => p.role === 'installer' && p.active);
  const activeStaff = profiles.filter(p => (p.role === 'supervisor' || p.role === 'admin') && p.active);

  // Installer PIN handling
  const handlePinDigit = (digit: string) => {
    if (pin.length >= 6) return;
    const newPin = pin + digit;
    setPin(newPin);
    setPinError(null);

    // If matches user PIN (or default PIN 1234)
    if (selectedInstaller) {
      const expectedPin = selectedInstaller.pin || '1234';
      if (newPin.length >= expectedPin.length) {
        if (newPin === expectedPin) {
          executeLogin(selectedInstaller);
        } else if (newPin.length >= 4 && expectedPin.length === 4) {
          setPinError('PIN incorrecto. Intenta de nuevo.');
          setPin('');
        }
      }
    }
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setPinError(null);
  };

  const handleClearPin = () => {
    setPin('');
    setPinError(null);
  };

  const executeLogin = (user: Profile) => {
    setCurrentUser(user);
    setActiveRole(user.role);
    showToast(`¡Bienvenido/a, ${user.full_name}!`, 'success');
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError(null);

    const cleanEmail = email.trim().toLowerCase();
    const user = profiles.find(
      p =>
        (p.role === 'supervisor' || p.role === 'admin') &&
        p.email?.trim().toLowerCase() === cleanEmail
    );

    if (!user) {
      setStaffError('No existe una cuenta registrada con este correo electrónico.');
      return;
    }

    const expectedPassword = user.password || 'admin123';
    if (password !== expectedPassword) {
      setStaffError('Contraseña incorrecta. Verifica e intenta nuevamente.');
      return;
    }

    executeLogin(user);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-1 shadow-lg">
            <APLogo className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">AP Installation LLC</h1>
          <p className="text-xs text-slate-400 font-medium">
            Control de Producción y Horas • Especialidades División 10
          </p>
        </div>

        {/* Tab Toggle: Instalador PIN vs Supervisor/Admin */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
          <button
            type="button"
            onClick={() => {
              setAuthMode('installer');
              setPin('');
              setPinError(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'installer'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Instaladores (PIN)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('staff');
              setStaffError(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'staff'
                ? 'bg-blue-600 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Supervisor / Admin</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md">
          {authMode === 'installer' ? (
            /* INSTALLER PIN FLOW */
            <div className="space-y-5">
              {!selectedInstaller ? (
                /* Step 1: Select installer from list */
                <div className="space-y-3">
                  <div className="text-left">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <span>Selecciona tu nombre en la cuadrilla:</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Toca tu usuario para ingresar tu código PIN de 4 dígitos.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                    {activeInstallers.map(inst => (
                      <button
                        key={inst.id}
                        type="button"
                        onClick={() => {
                          setSelectedInstaller(inst);
                          setPin('');
                          setPinError(null);
                        }}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition text-left flex items-center gap-2.5 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                          {inst.full_name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-white truncate">{inst.full_name}</p>
                          <p className="text-[10px] text-slate-400">PIN: {inst.pin || '1234'}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-500">
                    <p>PIN predeterminado de prueba para instaladores: <strong className="text-amber-400 font-mono">1234</strong></p>
                  </div>
                </div>
              ) : (
                /* Step 2: Keypad PIN input */
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                        {selectedInstaller.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{selectedInstaller.full_name}</p>
                        <p className="text-[11px] text-amber-400">Instalador de Obra</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedInstaller(null);
                        setPin('');
                        setPinError(null);
                      }}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                    >
                      Cambiar
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 font-semibold">
                    Digita tu PIN rápido (4 dígitos):
                  </p>

                  {/* PIN dots display */}
                  <div className="flex justify-center items-center gap-3 py-2">
                    {[0, 1, 2, 3].map(index => {
                      const isFilled = pin.length > index;
                      return (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full transition-all duration-150 ${
                            isFilled
                              ? 'bg-amber-400 scale-110 shadow-md shadow-amber-500/50'
                              : 'bg-slate-800 border border-slate-700'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {pinError && (
                    <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  {/* 10-Keypad for Field Mobile Use */}
                  <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto pt-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePinDigit(num)}
                        className="h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 font-black text-xl text-white border border-slate-800 transition active:scale-95 flex items-center justify-center shadow-md touch-target"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleClearPin}
                      className="h-14 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800/80 active:scale-95 flex items-center justify-center touch-target"
                    >
                      Limpiar
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePinDigit('0')}
                      className="h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 font-black text-xl text-white border border-slate-800 transition active:scale-95 flex items-center justify-center shadow-md touch-target"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handlePinBackspace}
                      className="h-14 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 active:text-rose-400 border border-slate-800/80 active:scale-95 flex items-center justify-center touch-target"
                      title="Borrar dígito"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1">
                    PIN por defecto: <span className="font-mono text-amber-400 font-bold">{selectedInstaller.pin || '1234'}</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* STAFF (SUPERVISOR / ADMIN) LOGIN FORM */
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div className="text-left space-y-1 pb-2 border-b border-slate-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Acceso de Supervisión y Administración</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ingresa con tu correo institucional y contraseña autorizada.
                </p>
              </div>

              {staffError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{staffError}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="font-bold text-slate-400 uppercase text-[10px] block">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="admin@apinstall.com o hector@apinstall.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-950 text-white font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="font-bold text-slate-400 uppercase text-[10px] block">
                  Contraseña:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-950 text-white font-semibold pl-9 pr-10 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Login Chips for Demo */}
              <div className="pt-2 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                  Cuentas de prueba rápidas:
                </p>
                <div className="space-y-1.5">
                  {activeStaff.map(staff => (
                    <button
                      key={staff.id}
                      type="button"
                      onClick={() => {
                        setEmail(staff.email || '');
                        setPassword(staff.password || 'admin123');
                      }}
                      className="w-full p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-left flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${staff.role === 'admin' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                        <span className="font-bold text-slate-200">{staff.full_name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">({staff.role})</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{staff.email}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p>Sistema Seguro de Reportes • AP Installation LLC</p>
          <p>Acceso restringido únicamente a personal autorizado en obras de Florida.</p>
        </div>
      </div>
    </div>
  );
};
