import { IDataRepository } from './repository.interface';
import { MockRepository } from './MockRepository';
import { SupabaseRepository } from './SupabaseRepository';

// Single repository instance for the application
const mockRepo = new MockRepository();
const supabaseRepo = new SupabaseRepository();

/**
 * ============================================================================
 * CONFIGURACIÓN DE FUENTE DE DATOS:
 * ============================================================================
 * Para desarrollo y pruebas en AI Studio usamos mockRepo (memoria + localStorage con semillas realistas).
 * Para conectar a Supabase en Cloudflare Pages / Producción:
 * 1. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env o panel de Cloudflare Pages.
 * 2. Cambia la asignación de abajo a: export const repository: IDataRepository = supabaseRepo;
 * ============================================================================
 */
export const repository: IDataRepository = mockRepo;

// Export implementations for direct access or testing if needed
export { mockRepo, supabaseRepo };
export * from './repository.interface';
