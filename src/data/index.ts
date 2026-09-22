import { IDataRepository } from './repository.interface';
import { MockRepository } from './MockRepository';
import { SupabaseRepository } from './SupabaseRepository';

// Single repository instance for the application
const mockRepo = new MockRepository();
const supabaseRepo = new SupabaseRepository();

/**
 * ============================================================================
 * CONFIGURACIÓN DE FUENTE DE DATOS HÍBRIDA / AUTOMÁTICA:
 * ============================================================================
 * Si se detectan credenciales válidas de Supabase (ej. en Cloudflare Pages o .env),
 * se conecta automáticamente a Supabase (PostgreSQL + RLS + Storage).
 * De lo contrario, opera en modo local Mock con persistencia en localStorage.
 * ============================================================================
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('http')
);

export const repository: IDataRepository = isSupabaseConfigured ? supabaseRepo : mockRepo;

// Export implementations for direct access or testing if needed
export { mockRepo, supabaseRepo, isSupabaseConfigured };
export * from './repository.interface';
