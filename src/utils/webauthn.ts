/**
 * WebAuthn (Passkeys / Biometrics) helper for AP Installation LLC.
 * Enables Touch ID, Face ID, Windows Hello and Android Biometrics
 * for fast and passwordless installer login.
 */

// Helper: Convert string to Uint8Array buffer
function strToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Helper: ArrayBuffer to Base64URL string
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Helper: Base64URL string to Uint8Array
function base64ToBuffer(base64: string): Uint8Array {
  let standardBase64 = base64.replace(/-/g, '+').replace(/_/g, '/');
  while (standardBase64.length % 4) {
    standardBase64 += '=';
  }
  const binary = atob(standardBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const LOCAL_BIOMETRIC_KEY_PREFIX = 'ap_biometric_user_';

/**
 * Checks if the current browser and device support biometric authentication (Face ID, Touch ID, Fingerprint).
 */
export async function isBiometricSupported(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!window.PublicKeyCredential) return false;
  try {
    if (PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
    return false;
  } catch (err) {
    console.warn('WebAuthn platform check failed:', err);
    return false;
  }
}

/**
 * Register a biometric credential (Touch ID / Face ID) for an installer on their device.
 */
export async function registerBiometricCredential(user: {
  id: string;
  full_name: string;
}): Promise<{ success: boolean; credentialId?: string; error?: string }> {
  try {
    const supported = await isBiometricSupported();
    if (!supported) {
      return { success: false, error: 'Este dispositivo o navegador no soporta autenticación biométrica.' };
    }

    const randomChallenge = new Uint8Array(32);
    window.crypto.getRandomValues(randomChallenge);

    const userIdBytes = strToBuffer(user.id);

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: randomChallenge as any,
      rp: {
        name: 'AP Installation LLC',
        id: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname,
      },
      user: {
        id: userIdBytes as any,
        name: user.id,
        displayName: user.full_name,
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' },  // ES256
        { alg: -257, type: 'public-key' }, // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
      timeout: 60000,
      attestation: 'none',
    };

    const credential = (await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    })) as PublicKeyCredential | null;

    if (!credential) {
      return { success: false, error: 'No se pudo crear la credencial biométrica.' };
    }

    const rawId = bufferToBase64(credential.rawId);

    // Save locally for quick device-pairing identification
    try {
      localStorage.setItem(`${LOCAL_BIOMETRIC_KEY_PREFIX}${user.id}`, rawId);
      localStorage.setItem('ap_last_biometric_user', user.id);
    } catch {}

    return { success: true, credentialId: rawId };
  } catch (err: any) {
    console.error('Error during biometric registration:', err);
    if (err.name === 'NotAllowedError') {
      return { success: false, error: 'El registro biométrico fue cancelado o no autorizado por el usuario.' };
    }
    return { success: false, error: err.message || 'Error desconocido al registrar biometría.' };
  }
}

/**
 * Authenticate the user with Face ID / Fingerprint.
 */
export async function authenticateWithBiometrics(
  credentialId?: string
): Promise<{ success: boolean; credentialId?: string; error?: string }> {
  try {
    const supported = await isBiometricSupported();
    if (!supported) {
      return { success: false, error: 'Biometría no disponible en este dispositivo.' };
    }

    const randomChallenge = new Uint8Array(32);
    window.crypto.getRandomValues(randomChallenge);

    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge: randomChallenge as any,
      timeout: 60000,
      userVerification: 'required',
      rpId: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname,
    };

    if (credentialId) {
      publicKeyCredentialRequestOptions.allowCredentials = [
        {
          id: base64ToBuffer(credentialId) as any,
          type: 'public-key',
          transports: ['internal'],
        },
      ];
    }

    const assertion = (await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    })) as PublicKeyCredential | null;

    if (!assertion) {
      return { success: false, error: 'No se detectó validación biométrica.' };
    }

    const retrievedId = bufferToBase64(assertion.rawId);
    return { success: true, credentialId: retrievedId };
  } catch (err: any) {
    console.error('Error during biometric authentication:', err);
    if (err.name === 'NotAllowedError') {
      return { success: false, error: 'Autenticación biométrica cancelada o no reconocida.' };
    }
    return { success: false, error: err.message || 'No se pudo verificar la biometría.' };
  }
}

/**
 * Check if the user has a registered biometric credential on this device.
 */
export function getLocalBiometricCredentialId(userId: string): string | null {
  try {
    return localStorage.getItem(`${LOCAL_BIOMETRIC_KEY_PREFIX}${userId}`);
  } catch {
    return null;
  }
}

/**
 * Remove local biometric pairing for a user.
 */
export function removeLocalBiometricCredential(userId: string): void {
  try {
    localStorage.removeItem(`${LOCAL_BIOMETRIC_KEY_PREFIX}${userId}`);
    if (localStorage.getItem('ap_last_biometric_user') === userId) {
      localStorage.removeItem('ap_last_biometric_user');
    }
  } catch {}
}

/**
 * Get last user who authenticated with biometrics on this device.
 */
export function getLastBiometricUserId(): string | null {
  try {
    return localStorage.getItem('ap_last_biometric_user');
  } catch {
    return null;
  }
}
