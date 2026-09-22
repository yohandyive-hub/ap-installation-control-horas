import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile, UserRole } from '../../types';
import { repository } from '../../data';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Phone,
  DollarSign,
  Shield,
  CheckCircle,
  XCircle,
  MessageCircle,
  KeyRound,
  Fingerprint,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

export const UsersManager: React.FC = () => {
  const { profiles, currentUser, refreshData, showToast } = useApp();
  const [editingProfile, setEditingProfile] = useState<Partial<Profile> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile?.full_name) return;

    try {
      await repository.saveProfile(editingProfile);
      await refreshData();
      showToast('Perfil de usuario guardado exitosamente', 'success');
      setEditingProfile(null);
    } catch {
      showToast('Error al guardar usuario', 'error');
    }
  };

  const handleDeleteUser = (user: Profile) => {
    if (user.id === currentUser?.id) {
      showToast(
        'No puedes eliminar el usuario con el que has iniciado sesión actualmente. Cambia de usuario en la barra superior antes de eliminarlo.',
        'warning'
      );
      return;
    }
    setDeleteTarget(user);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await repository.deleteProfile(deleteTarget.id);
      await repository.logAudit(
        'delete',
        'profiles',
        deleteTarget.id,
        `Usuario eliminado permanentemente: ${deleteTarget.full_name} (${deleteTarget.role})`,
        { id: currentUser?.id || 'admin', name: currentUser?.full_name || 'Admin' }
      );
      await refreshData();
      showToast(`Usuario "${deleteTarget.full_name}" eliminado correctamente`, 'success');
      if (editingProfile?.id === deleteTarget.id) {
        setEditingProfile(null);
      }
      setDeleteTarget(null);
    } catch {
      showToast('Error al eliminar el usuario', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleActive = async (profile: Profile) => {
    try {
      await repository.saveProfile({
        ...profile,
        active: !profile.active,
      });
      await refreshData();
      showToast(
        profile.active ? 'Usuario desactivado' : 'Usuario reactivado',
        'info'
      );
    } catch {
      showToast('Error al actualizar estado', 'error');
    }
  };

  const handleShareWhatsApp = (user: Profile) => {
    const appUrl = window.location.origin;
    const currentPin = user.temp_pin || user.pin || '1234';
    const text = encodeURIComponent(
      `¡Hola ${user.full_name}! 👋\n` +
      `Este es tu acceso a AP Installation LLC para reportar tus horas de trabajo:\n\n` +
      `🔗 Enlace directo: ${appUrl}?u=${user.id}\n` +
      `🔑 Tu PIN de acceso: ${currentPin}\n\n` +
      `Al ingresar podrás configurar tu propio PIN y activar tu Huella o Face ID para entrar en 1 segundo.`
    );
    const cleanPhone = (user.phone || '').replace(/\D/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const handleResetPin = async (user: Profile) => {
    const tempPin = Math.floor(1000 + Math.random() * 9000).toString();
    try {
      await repository.saveProfile({
        ...user,
        pin: tempPin,
        temp_pin: tempPin,
        must_change_pin: true,
      });
      await repository.logAudit(
        'update',
        'profiles',
        user.id,
        `PIN restablecido para ${user.full_name}. Nuevo PIN provisional: ${tempPin}`,
        { id: currentUser?.id || 'admin', name: currentUser?.full_name || 'Admin' }
      );
      await refreshData();
      showToast(`Nuevo PIN generado para ${user.full_name}: ${tempPin}`, 'success');

      const confirmShare = window.confirm(
        `PIN provisional generado para ${user.full_name}: ${tempPin}\n¿Deseas enviárselo ahora mismo por WhatsApp?`
      );
      if (confirmShare) {
        handleShareWhatsApp({ ...user, pin: tempPin, temp_pin: tempPin, must_change_pin: true });
      }
    } catch {
      showToast('Error al restablecer el PIN', 'error');
    }
  };

  const handleUnlinkBiometrics = async (user: Profile) => {
    const confirmUnlink = window.confirm(
      `¿Deseas desvincular la autenticación biométrica (Huella/Face ID) para ${user.full_name}? Podrá volver a vincularla al ingresar con su PIN.`
    );
    if (!confirmUnlink) return;

    try {
      await repository.saveProfile({
        ...user,
        biometric_credential_id: undefined,
        biometric_enabled: false,
      });
      await refreshData();
      showToast(`Biometría desvinculada para ${user.full_name}`, 'info');
    } catch {
      showToast('Error al desvincular la biometría', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-white">Equipo de Instaladores y Personal</h3>
          <p className="text-xs text-slate-400">
            Gestiona tarifas por hora ($/h), roles de sistema y números telefónicos.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingProfile({
              full_name: '',
              phone: '',
              role: 'installer',
              default_hourly_rate: 22,
              active: true,
            })
          }
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Grid of Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {profiles.map(user => (
          <div
            key={user.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition-all ${
              user.active ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            } space-y-3 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-white text-sm">{user.full_name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <span>{user.phone || 'Sin teléfono'}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    user.role === 'admin'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : user.role === 'supervisor'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {user.role === 'installer' ? 'Instalador' : user.role}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Tarifa Horaria:</span>
                <span className="font-mono font-bold text-emerald-400">
                  ${user.default_hourly_rate || 20}/h
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Credencial:</span>
                {user.role === 'installer' ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      PIN: {user.temp_pin || user.pin || '1234'}
                    </span>
                    {user.biometric_enabled && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5" title="Huella / Face ID vinculada">
                        <Fingerprint className="w-3 h-3" /> Bio
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="font-mono text-blue-400 truncate max-w-[130px]" title={user.email}>
                    {user.email || 'correo'}
                  </span>
                )}
              </div>
            </div>

            {/* Installer Quick Actions: WhatsApp Share & Reset PIN */}
            {user.role === 'installer' && (
              <div className="mt-2 pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(user)}
                  className="py-1 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1 transition"
                  title="Enviar link de acceso por WhatsApp"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleResetPin(user)}
                  className="py-1 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-[10px] flex items-center justify-center gap-1 transition"
                  title="Generar nuevo PIN temporal de 4 dígitos"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Reset PIN</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleToggleActive(user)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${
                  user.active
                    ? 'text-slate-400 border-slate-800 hover:text-rose-400'
                    : 'text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10'
                }`}
              >
                {user.active ? 'Desactivar' : 'Reactivar'}
              </button>

              <div className="flex items-center gap-1">
                {user.biometric_enabled && (
                  <button
                    onClick={() => handleUnlinkBiometrics(user)}
                    className="p-1.5 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition"
                    title="Desvincular Huella / Face ID de este usuario"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setEditingProfile({ ...user })}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Editar usuario"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Eliminar usuario permanentemente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveProfile}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingProfile.id ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Juan Gómez"
                  value={editingProfile.full_name || ''}
                  onChange={e =>
                    setEditingProfile(prev => ({ ...prev, full_name: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white font-semibold px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                  Teléfono / WhatsApp:
                </label>
                <input
                  type="tel"
                  placeholder="+1 (305) 555-0199"
                  value={editingProfile.phone || ''}
                  onChange={e =>
                    setEditingProfile(prev => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-slate-950 text-white font-mono px-3 py-2 rounded-xl border border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Rol en Sistema:
                  </label>
                  <select
                    value={editingProfile.role || 'installer'}
                    onChange={e =>
                      setEditingProfile(prev => ({
                        ...prev,
                        role: e.target.value as UserRole,
                      }))
                    }
                    className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-800"
                  >
                    <option value="installer">Instalador</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                    Tarifa ($/hora):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={editingProfile.default_hourly_rate || ''}
                    onChange={e =>
                      setEditingProfile(prev => ({
                        ...prev,
                        default_hourly_rate: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-slate-950 text-white font-mono px-3 py-2 rounded-xl border border-slate-800"
                  />
                </div>
              </div>

              {/* Conditional Auth Credential Fields */}
              {editingProfile.role === 'installer' ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <label className="font-bold text-amber-300 uppercase text-[10px] block">
                    PIN Rápido de Obra (4 dígitos):
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="1234"
                    value={editingProfile.pin || ''}
                    onChange={e =>
                      setEditingProfile(prev => ({ ...prev, pin: e.target.value.replace(/\D/g, '') }))
                    }
                    className="w-full bg-slate-950 text-amber-400 font-mono text-center tracking-widest text-base font-bold px-3 py-2 rounded-lg border border-amber-500/40"
                  />
                  <p className="text-[10px] text-slate-400">
                    Código numérico que el instalador digita en campo para acceder al sistema.
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-amber-500/20">
                    <input
                      type="checkbox"
                      id="must_change_pin"
                      checked={Boolean(editingProfile.must_change_pin)}
                      onChange={e =>
                        setEditingProfile(prev => ({ ...prev, must_change_pin: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <label htmlFor="must_change_pin" className="text-[11px] text-slate-300 font-semibold cursor-pointer">
                      Exigir cambio de PIN en el próximo inicio
                    </label>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                  <div>
                    <label className="font-bold text-blue-300 uppercase text-[10px] block mb-1">
                      Correo Electrónico de Acceso:
                    </label>
                    <input
                      type="email"
                      placeholder="usuario@apinstall.com"
                      value={editingProfile.email || ''}
                      onChange={e =>
                        setEditingProfile(prev => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full bg-slate-950 text-white px-3 py-2 rounded-lg border border-blue-500/40 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-blue-300 uppercase text-[10px] block mb-1">
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={editingProfile.password || ''}
                      onChange={e =>
                        setEditingProfile(prev => ({ ...prev, password: e.target.value }))
                      }
                      className="w-full bg-slate-950 text-white px-3 py-2 rounded-lg border border-blue-500/40 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
              {editingProfile.id ? (
                <button
                  type="button"
                  onClick={() => {
                    const profileToDelete = profiles.find(p => p.id === editingProfile.id);
                    if (profileToDelete) handleDeleteUser(profileToDelete);
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Usuario</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Guardar Usuario
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* In-App Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar permanentemente a este usuario? Esta acción purgará su perfil del sistema."
        itemName={deleteTarget ? `${deleteTarget.full_name} (${deleteTarget.role})` : undefined}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
