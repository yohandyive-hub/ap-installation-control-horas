import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile } from '../../types';
import { APLogo } from '../common/APLogo';
import { repository, supabaseRepo, isSupabaseConfigured } from '../../data';
import {
  isBiometricSupported,
  authenticateWithBiometrics,
  registerBiometricCredential,
  getLocalBiometricCredentialId,
  getLastBiometricUserId,
} from '../../utils/webauthn';
import {
  KeyRound,
  Mail,
  Lock,
  HardHat,
  Shield,
  Fingerprint,
  Smartphone,
  AlertCircle,
  Eye,
  EyeOff,
  Delete,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

const ADMIN_WHATSAPP_NUMBER = '584228463650';

export const LoginScreen: React.FC = () => {
  const { profiles, setCurrentUser, setActiveRole, refreshData, showToast } = useApp();

  const [authMode, setAuthMode] = useState<'installer' | 'staff'>('installer');

  // Installer state
  const [selectedInstaller, setSelectedInstaller] = useState<Profile | null>(null);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [hasBiometric, setHasBiometric] = useState<boolean>(false);
  const [biometricLoading, setBiometricLoading] = useState<boolean>(false);

  // Onboarding / Change PIN state
  const [showPinChangeModal, setShowPinChangeModal] = useState<boolean>(false);
  const [onboardingUser, setOnboardingUser] = useState<Profile | null>(null);
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [enableBiometricInOnboarding, setEnableBiometricInOnboarding] = useState<boolean>(true);
  const [onboardingSaving, setOnboardingSaving] = useState<boolean>(false);
  const [onboardingError, setOnboardingError] = useState<string | null>(null);

  // Staff (Supervisor / Admin) state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [staffLoading, setStaffLoading] = useState<boolean>(false);

  const activeInstallers = profiles.filter(p => p.role === 'installer' && p.active);
  const activeStaff = profiles.filter(p => (p.role === 'supervisor' || p.role === 'admin') && p.active);

  // Check biometric support on mount & URL deep-links
  useEffect(() => {
    isBiometricSupported().then(supported => {
      setHasBiometric(supported);
    });

    // Check deep-link query params (e.g. ?u=usr-antony or ?user=antony)
    try {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get('u') || params.get('user');
      if (userParam && profiles.length > 0) {
        const matched = profiles.find(
          p =>
            p.id.toLowerCase() === userParam.toLowerCase() ||
            p.full_name.toLowerCase().includes(userParam.toLowerCase())
        );
        if (matched && matched.role === 'installer') {
          setSelectedInstaller(matched);
        }
      }
    } catch {}
  }, [profiles]);

  // Installer PIN handling
  const handlePinDigit = (digit: string) => {
    if (pin.length >= 6) return;
    const newPinStr = pin + digit;
    setPin(newPinStr);
    setPinError(null);

    if (selectedInstaller) {
      const expectedPin = selectedInstaller.pin || selectedInstaller.temp_pin || '1234';
      if (newPinStr.length >= expectedPin.length) {
        if (newPinStr === expectedPin) {
          // If installer must change PIN (first access or temp PIN)
          if (selectedInstaller.must_change_pin) {
            setOnboardingUser(selectedInstaller);
            setShowPinChangeModal(true);
            setPin('');
          } else {
            executeLogin(selectedInstaller);
          }
        } else if (newPinStr.length >= 4 && expectedPin.length === 4) {
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

  // Biometric direct authentication
  const handleBiometricAuth = async (installer?: Profile) => {
    const target = installer || selectedInstaller;
    if (!target) return;

    setBiometricLoading(true);
    setPinError(null);

    try {
      const localCredId = getLocalBiometricCredentialId(target.id) || target.biometric_credential_id;
      const res = await authenticateWithBiometrics(localCredId || undefined);

      if (res.success) {
        executeLogin(target);
      } else {
        setPinError(res.error || 'No se reconoció la biometría. Puedes usar tu PIN.');
      }
    } catch (err: any) {
      setPinError('Error al autenticar con biometría. Usa tu PIN.');
    } finally {
      setBiometricLoading(false);
    }
  };

  // Submit new PIN / Onboarding
  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingUser) return;
    setOnboardingError(null);

    if (newPin.length < 4 || newPin.length > 6 || !/^\d+$/.test(newPin)) {
      setOnboardingError('El PIN debe tener entre 4 y 6 dígitos numéricos.');
      return;
    }

    if (newPin !== confirmPin) {
      setOnboardingError('Los PINes ingresados no coinciden. Verifica de nuevo.');
      return;
    }

    setOnboardingSaving(true);
    let biometricCredId = onboardingUser.biometric_credential_id;
    let bioEnabled = onboardingUser.biometric_enabled || false;

    // Optional biometric registration during onboarding
    if (enableBiometricInOnboarding && hasBiometric) {
      try {
        const bioRes = await registerBiometricCredential({
          id: onboardingUser.id,
          full_name: onboardingUser.full_name,
        });
        if (bioRes.success && bioRes.credentialId) {
          biometricCredId = bioRes.credentialId;
          bioEnabled = true;
          showToast('¡Face ID / Huella Dactilar activada correctamente!', 'success');
        }
      } catch (err) {
        console.warn('Biometric setup skipped or failed:', err);
      }
    }

    try {
      const updatedUser: Profile = {
        ...onboardingUser,
        pin: newPin,
        must_change_pin: false,
        temp_pin: undefined,
        biometric_enabled: bioEnabled,
        biometric_credential_id: biometricCredId,
      };

      await repository.saveProfile(updatedUser);
      await refreshData();

      setShowPinChangeModal(false);
      executeLogin(updatedUser);
      showToast('¡PIN personal configurado con éxito!', 'success');
    } catch {
      setOnboardingError('Error al guardar el nuevo PIN. Intenta nuevamente.');
    } finally {
      setOnboardingSaving(false);
    }
  };

  // WhatsApp Help Generator
  const handleRequestWhatsAppHelp = (installerName?: string) => {
    const name = installerName || selectedInstaller?.full_name || 'Instalador de obra';
    const text = encodeURIComponent(
      `Hola Yohandy, soy ${name} de AP Installation. Olvidé mi PIN de acceso para el reporte de obra. ¿Podrías restablecérmelo por favor?`
    );
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Staff Login Handler (Supabase Auth first, local fallback)
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError(null);
    setStaffLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // 1. If Supabase is configured, try Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const res = await supabaseRepo.signInWithPassword(cleanEmail, password);
        if (res.user) {
          executeLogin(res.user);
          setStaffLoading(false);
          return;
        }
        if (res.error) {
          const errLower = res.error.toLowerCase();
          if (
            errLower.includes('invalid login credentials') ||
            errLower.includes('invalid credentials')
          ) {
            setStaffError('Credenciales inválidas en Supabase. Verifica tu correo y contraseña.');
            setStaffLoading(false);
            return;
          }
        }
      } catch (err: any) {
        console.warn('Supabase auth exception:', err);
      }
    }

    // 2. Fallback to local profile check (mock / demo accounts)
    const user = profiles.find(
      p =>
        (p.role === 'supervisor' || p.role === 'admin') &&
        p.email?.trim().toLowerCase() === cleanEmail
    );

    if (user) {
      const expectedPassword = user.password || 'admin123';
      if (password === expectedPassword) {
        executeLogin(user);
        setStaffLoading(false);
        return;
      }
    }

    setStaffError('Correo o contraseña incorrectos. Verifica e intenta nuevamente.');
    setStaffLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-3 sm:p-4 bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <div className="w-full max-w-md space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-1 shadow-lg shadow-amber-500/10">
            <APLogo className="w-14 h-14" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">AP Installation LLC</h1>
          <p className="text-xs text-slate-400 font-medium">
            Control de Producción y Horas • Especialidades División 10
          </p>
        </div>

        {/* Tab Toggle: Instalador (Biometría / PIN) vs Supervisor / Admin */}
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
            <Fingerprint className="w-4 h-4" />
            <span>Instaladores</span>
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
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md">
          {authMode === 'installer' ? (
            /* INSTALLER FLOW */
            <div className="space-y-4">
              {!selectedInstaller ? (
                /* Step 1: Select installer from list */
                <div className="space-y-3">
                  <div className="text-left">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <span>Selecciona tu nombre en la cuadrilla:</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Accede en segundos con tu Huella / Face ID o tu PIN de 4 dígitos.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                    {activeInstallers.map(inst => {
                      const hasLocalBio = Boolean(
                        getLocalBiometricCredentialId(inst.id) || inst.biometric_credential_id
                      );
                      return (
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
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition shrink-0">
                            {inst.full_name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs text-white truncate">{inst.full_name}</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              {hasLocalBio && hasBiometric && (
                                <span title="Biometría activa">
                                  <Fingerprint className="w-3 h-3 text-emerald-400 shrink-0" />
                                </span>
                              )}
                              <span>PIN: {inst.must_change_pin ? 'Inicial' : 'Listo'}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-500">
                    <p>PIN predeterminado de primer ingreso: <strong className="text-amber-400 font-mono">1234</strong></p>
                  </div>
                </div>
              ) : (
                /* Step 2: Keypad PIN input & Biometric Option */
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

                  {/* Primary Biometric Quick Login Button if available */}
                  {hasBiometric && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <button
                        type="button"
                        disabled={biometricLoading}
                        onClick={() => handleBiometricAuth()}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-98 transition touch-target"
                      >
                        <Fingerprint className="w-4 h-4" />
                        <span>
                          {biometricLoading
                            ? 'Esperando sensor biométrico...'
                            : 'Entrar con Huella / Face ID'}
                        </span>
                      </button>
                      <p className="text-[10px] text-slate-400">
                        O digita tu PIN de 4 dígitos abajo si tienes guantes puestos.
                      </p>
                    </div>
                  )}

                  {/* PIN dots display */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300 font-semibold">
                      {hasBiometric ? 'Código PIN de respaldo:' : 'Digita tu PIN rápido (4 dígitos):'}
                    </p>

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
                        className="h-13 sm:h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 font-black text-xl text-white border border-slate-800 transition active:scale-95 flex items-center justify-center shadow-md touch-target"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleClearPin}
                      className="h-13 sm:h-14 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800/80 active:scale-95 flex items-center justify-center touch-target"
                    >
                      Limpiar
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePinDigit('0')}
                      className="h-13 sm:h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 font-black text-xl text-white border border-slate-800 transition active:scale-95 flex items-center justify-center shadow-md touch-target"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handlePinBackspace}
                      className="h-13 sm:h-14 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 active:text-rose-400 border border-slate-800/80 active:scale-95 flex items-center justify-center touch-target"
                      title="Borrar dígito"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Forgot PIN / WhatsApp Recovery */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => handleRequestWhatsAppHelp(selectedInstaller.full_name)}
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold p-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>¿Olvidaste tu PIN? Solicitar ayuda por WhatsApp</span>
                    </button>
                  </div>
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

              {/* Quick Login Chips for Demo / Fast Switch */}
              <div className="pt-2 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                  Cuentas autorizadas:
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
                disabled={staffLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                <span>{staffLoading ? 'Verificando credenciales...' : 'Iniciar Sesión'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p>Sistema Seguro de Reportes • AP Installation LLC</p>
          <p>Florida, USA • Soporte de acceso asistido</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ONBOARDING MODAL: CAMBIO OBLIGATORIO DE PIN Y VINCULACIÓN BIOMÉTRICA */}
      {/* ========================================================================= */}
      {showPinChangeModal && onboardingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCompleteOnboarding}
            className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="text-center space-y-1 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-white">
                ¡Primer Acceso, {onboardingUser.full_name}!
              </h3>
              <p className="text-xs text-slate-400">
                Por seguridad, define tu PIN personal de 4 dígitos para tus reportes de obra.
              </p>
            </div>

            {onboardingError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{onboardingError}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase text-[10px] block mb-1">
                  Nuevo PIN (4 dígitos numéricos):
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="••••"
                  value={newPin}
                  onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 text-amber-400 font-mono text-center tracking-widest text-lg font-black px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase text-[10px] block mb-1">
                  Confirma tu nuevo PIN:
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="••••"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 text-amber-400 font-mono text-center tracking-widest text-lg font-black px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-400"
                />
              </div>

              {/* Biometrics Toggle in Onboarding */}
              {hasBiometric && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white flex items-center gap-1.5">
                      <Fingerprint className="w-4 h-4 text-emerald-400" />
                      <span>Activar Face ID / Huella</span>
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Entrar en 1 segundo en este teléfono
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableBiometricInOnboarding}
                    onChange={e => setEnableBiometricInOnboarding(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPinChangeModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={onboardingSaving}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-98 transition flex items-center justify-center gap-1.5"
              >
                <span>{onboardingSaving ? 'Guardando...' : 'Confirmar y Entrar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
