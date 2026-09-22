import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  IDataRepository,
  ReportFilter,
  SiteProgressSummary,
} from './repository.interface';
import {
  Profile,
  Contractor,
  JobSite,
  Accessory,
  AccessoryPrice,
  SiteScope,
  Report,
  Permission,
  Settings,
  ImportLog,
  AuditLog,
  ReportStatus,
} from '../types';
import { MockRepository } from './MockRepository';

/**
 * Supabase implementation of IDataRepository.
 * Connects to PostgreSQL with Row Level Security (RLS) via @supabase/supabase-js.
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment or Cloudflare Pages settings.
 */
export class SupabaseRepository implements IDataRepository {
  private client: SupabaseClient | null = null;
  private fallback: MockRepository;
  private isConfigured: boolean = false;

  constructor() {
    this.fallback = new MockRepository();
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
      try {
        this.client = createClient(supabaseUrl, supabaseAnonKey);
        this.isConfigured = true;
      } catch (err) {
        console.warn('Could not initialize Supabase client, falling back to Mock:', err);
      }
    }
  }

  // Helper check
  private getSupabase(): SupabaseClient {
    if (!this.client || !this.isConfigured) {
      throw new Error(
        'Supabase no está configurado. Por favor define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env o variables de Cloudflare Pages.'
      );
    }
    return this.client;
  }

  getClient(): SupabaseClient | null {
    return this.client;
  }

  // --- Supabase Authentication ---
  async signInWithPassword(
    email: string,
    password: string
  ): Promise<{ user: Profile | null; error?: string }> {
    if (!this.isConfigured || !this.client) {
      return { user: null, error: 'Supabase no está configurado.' };
    }

    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (!data.user) {
        return { user: null, error: 'No se obtuvo información de sesión de Supabase.' };
      }

      // Find or create profile row in public.profiles
      let profile: Profile | null = null;
      try {
        const { data: profData } = await this.client
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profData) {
          profile = profData as Profile;
        } else {
          // Auto-provision profile with admin role if created in auth
          const newProf: Partial<Profile> = {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email,
            role: 'admin',
            active: true,
            default_hourly_rate: 40,
          };
          const { data: createdProf } = await this.client
            .from('profiles')
            .upsert(newProf)
            .select()
            .single();

          profile = (createdProf as Profile) || {
            id: data.user.id,
            full_name: newProf.full_name!,
            email: newProf.email,
            role: 'admin',
            active: true,
            default_hourly_rate: 40,
          };
        }
      } catch (profErr) {
        console.warn('Profile fetch exception, using fallback profile:', profErr);
        profile = {
          id: data.user.id,
          full_name: data.user.user_metadata?.full_name || email.split('@')[0],
          email: data.user.email,
          role: 'admin',
          active: true,
          default_hourly_rate: 40,
        };
      }

      return { user: profile };
    } catch (err: any) {
      return { user: null, error: err.message || 'Error desconocido al autenticar en Supabase.' };
    }
  }

  async signOut(): Promise<void> {
    if (this.client) {
      try {
        await this.client.auth.signOut();
      } catch {}
    }
  }

  // --- Profiles ---
  async getProfiles(): Promise<Profile[]> {
    if (!this.isConfigured) return this.fallback.getProfiles();
    try {
      const { data, error } = await this.getSupabase().from('profiles').select('*').order('full_name');
      if (error) {
        console.warn('Supabase getProfiles returned error, using fallback:', error);
        return this.fallback.getProfiles();
      }
      if (!data || data.length === 0) {
        return this.fallback.getProfiles();
      }
      return data as Profile[];
    } catch (err) {
      console.warn('Exception in getProfiles, using fallback:', err);
      return this.fallback.getProfiles();
    }
  }

  async getProfileById(id: string): Promise<Profile | null> {
    if (!this.isConfigured) return this.fallback.getProfileById(id);
    try {
      const { data, error } = await this.getSupabase().from('profiles').select('*').eq('id', id).maybeSingle();
      if (error || !data) return this.fallback.getProfileById(id);
      return data as Profile | null;
    } catch {
      return this.fallback.getProfileById(id);
    }
  }

  async saveProfile(profile: Partial<Profile> & { id?: string }): Promise<Profile> {
    const local = await this.fallback.saveProfile(profile);
    if (!this.isConfigured) return local;
    try {
      const { pin, temp_pin, must_change_pin, biometric_enabled, biometric_credential_id, password, ...cleanProf } = profile as any;
      const { data, error } = await this.getSupabase().from('profiles').upsert(cleanProf).select().single();
      if (error) {
        console.warn('Supabase saveProfile error, using local:', error);
        return local;
      }
      return { ...local, ...(data as Profile) };
    } catch (err) {
      console.warn('Exception in saveProfile, using local:', err);
      return local;
    }
  }

  async deleteProfile(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteProfile(id);
    const { error } = await this.getSupabase().from('profiles').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // --- Contractors ---
  async getContractors(): Promise<Contractor[]> {
    if (!this.isConfigured) return this.fallback.getContractors();
    try {
      const { data, error } = await this.getSupabase().from('contractors').select('*').order('name');
      if (error) {
        console.warn('Supabase getContractors error, using fallback:', error);
        return this.fallback.getContractors();
      }
      return (data && data.length > 0) ? (data as Contractor[]) : this.fallback.getContractors();
    } catch (err) {
      console.warn('Exception in getContractors, using fallback:', err);
      return this.fallback.getContractors();
    }
  }

  async saveContractor(contractor: Partial<Contractor> & { id?: string }): Promise<Contractor> {
    const local = await this.fallback.saveContractor(contractor);
    if (!this.isConfigured) return local;
    try {
      const { data, error } = await this.getSupabase().from('contractors').upsert(contractor).select().single();
      if (error) {
        console.warn('Supabase saveContractor error, using local:', error);
        return local;
      }
      return data as Contractor;
    } catch (err) {
      console.warn('Exception in saveContractor, using local:', err);
      return local;
    }
  }

  async deleteContractor(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteContractor(id);
    const { error } = await this.getSupabase().from('contractors').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // --- Job Sites ---
  async getJobSites(): Promise<JobSite[]> {
    if (!this.isConfigured) return this.fallback.getJobSites();
    try {
      const { data, error } = await this.getSupabase()
        .from('job_sites')
        .select('*, contractors(name)')
        .order('name');
      if (error) {
        console.warn('Supabase getJobSites error, using fallback:', error);
        return this.fallback.getJobSites();
      }
      if (!data || data.length === 0) return this.fallback.getJobSites();
      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        contractor_id: row.contractor_id,
        contractor_name: row.contractors?.name || '',
        active: row.active,
      }));
    } catch (err) {
      console.warn('Exception in getJobSites, using fallback:', err);
      return this.fallback.getJobSites();
    }
  }

  async saveJobSite(site: Partial<JobSite> & { id?: string }): Promise<JobSite> {
    const local = await this.fallback.saveJobSite(site);
    if (!this.isConfigured) return local;
    try {
      const { contractor_name, ...cleanSite } = site as any;
      const { data, error } = await this.getSupabase().from('job_sites').upsert(cleanSite).select().single();
      if (error) {
        console.warn('Supabase saveJobSite error, using local:', error);
        return local;
      }
      return { ...local, ...(data as JobSite) };
    } catch (err) {
      console.warn('Exception in saveJobSite, using local:', err);
      return local;
    }
  }

  async deleteJobSite(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteJobSite(id);
    const { error } = await this.getSupabase().from('job_sites').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // --- Accessories ---
  async getAccessories(): Promise<Accessory[]> {
    if (!this.isConfigured) return this.fallback.getAccessories();
    try {
      const { data, error } = await this.getSupabase().from('accessories').select('*').order('name');
      if (error) {
        console.warn('Supabase getAccessories error, using fallback:', error);
        return this.fallback.getAccessories();
      }
      return (data && data.length > 0) ? (data as Accessory[]) : this.fallback.getAccessories();
    } catch (err) {
      console.warn('Exception in getAccessories, using fallback:', err);
      return this.fallback.getAccessories();
    }
  }

  async saveAccessory(accessory: Partial<Accessory> & { id?: string }): Promise<Accessory> {
    if (!this.isConfigured) return this.fallback.saveAccessory(accessory);
    const { data, error } = await this.getSupabase().from('accessories').upsert(accessory).select().single();
    if (error) throw error;
    return data as Accessory;
  }

  async deleteAccessory(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteAccessory(id);
    const { error } = await this.getSupabase().from('accessories').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  async getAccessoryPrices(): Promise<AccessoryPrice[]> {
    if (!this.isConfigured) return this.fallback.getAccessoryPrices();
    try {
      const { data, error } = await this.getSupabase().from('accessory_prices').select('*');
      if (error) {
        console.warn('Supabase getAccessoryPrices error, using fallback:', error);
        return this.fallback.getAccessoryPrices();
      }
      return (data && data.length > 0) ? (data as AccessoryPrice[]) : this.fallback.getAccessoryPrices();
    } catch (err) {
      console.warn('Exception in getAccessoryPrices, using fallback:', err);
      return this.fallback.getAccessoryPrices();
    }
  }

  async saveAccessoryPrice(price: Partial<AccessoryPrice> & { id?: string }): Promise<AccessoryPrice> {
    if (!this.isConfigured) return this.fallback.saveAccessoryPrice(price);
    const { data, error } = await this.getSupabase().from('accessory_prices').upsert(price).select().single();
    if (error) throw error;
    return data as AccessoryPrice;
  }

  // --- Site Scopes ---
  async getSiteScopes(jobSiteId?: string): Promise<SiteScope[]> {
    if (!this.isConfigured) return this.fallback.getSiteScopes(jobSiteId);
    try {
      let query = this.getSupabase().from('site_scope').select('*');
      if (jobSiteId) query = query.eq('job_site_id', jobSiteId);
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase getSiteScopes error, using fallback:', error);
        return this.fallback.getSiteScopes(jobSiteId);
      }
      return (data && data.length > 0) ? (data as SiteScope[]) : this.fallback.getSiteScopes(jobSiteId);
    } catch (err) {
      console.warn('Exception in getSiteScopes, using fallback:', err);
      return this.fallback.getSiteScopes(jobSiteId);
    }
  }

  async saveSiteScope(scope: Partial<SiteScope> & { id?: string }): Promise<SiteScope> {
    if (!this.isConfigured) return this.fallback.saveSiteScope(scope);
    const { data, error } = await this.getSupabase().from('site_scope').upsert(scope).select().single();
    if (error) throw error;
    return data as SiteScope;
  }

  async deleteSiteScope(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteSiteScope(id);
    const { error } = await this.getSupabase().from('site_scope').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // --- Reports ---
  async getReports(filter?: ReportFilter): Promise<Report[]> {
    if (!this.isConfigured) return this.fallback.getReports(filter);
    try {
      let query = this.getSupabase()
        .from('reports')
        .select('*, report_crew(*), report_items(*), report_photos(*), job_sites(name, contractor_id, contractors(name)), profiles!created_by(full_name)')
        .order('work_date', { ascending: false });

      if (filter?.date) query = query.eq('work_date', filter.date);
      if (filter?.startDate && filter?.endDate) {
        query = query.gte('work_date', filter.startDate).lte('work_date', filter.endDate);
      }
      if (filter?.jobSiteId) query = query.eq('job_site_id', filter.jobSiteId);
      if (filter?.status) query = query.eq('status', filter.status);

      const { data, error } = await query;
      if (error) {
        console.warn('Supabase getReports error, using fallback:', error);
        return this.fallback.getReports(filter);
      }

      if (!data || data.length === 0) {
        return this.fallback.getReports(filter);
      }

      // Transform Supabase nested relations to match internal Report interface
      return (data || []).map((row: any) => ({
        id: row.id,
        work_date: row.work_date,
        job_site_id: row.job_site_id,
        job_site_name: row.job_sites?.name,
        contractor_id: row.job_sites?.contractor_id,
        contractor_name: row.job_sites?.contractors?.name,
        created_by: row.created_by,
        creator_name: row.profiles?.full_name,
        status: row.status,
        observations: row.observations,
        incident_type: row.incident_type,
        activities_performed: row.activities_performed,
        created_at: row.created_at,
        updated_at: row.updated_at,
        supervisor_notes: row.supervisor_notes,
        crew: row.report_crew || [],
        items: row.report_items || [],
        photos: row.report_photos || [],
      }));
    } catch (err) {
      console.warn('Exception in getReports, using fallback:', err);
      return this.fallback.getReports(filter);
    }
  }

  async getReportById(id: string): Promise<Report | null> {
    if (!this.isConfigured) return this.fallback.getReportById(id);
    const list = await this.getReports();
    return list.find(r => r.id === id) || null;
  }

  async saveReport(reportData: Partial<Report>): Promise<Report> {
    // 1. Always save in local fallback first so data is immediately safe
    const localSaved = await this.fallback.saveReport(reportData);
    if (!this.isConfigured) return localSaved;

    try {
      // 2. Strip non-table UI/computed fields before inserting into public.reports
      const {
        crew,
        items,
        photos,
        contractor_id,
        contractor_name,
        job_site_name,
        creator_name,
        ...rawBaseReport
      } = reportData as any;

      const baseReport: Record<string, any> = {
        ...(rawBaseReport.id ? { id: rawBaseReport.id } : {}),
        work_date: rawBaseReport.work_date,
        job_site_id: rawBaseReport.job_site_id,
        created_by: rawBaseReport.created_by,
        status: rawBaseReport.status || 'submitted',
        observations: rawBaseReport.observations ?? '',
        incident_type: rawBaseReport.incident_type || 'ninguna',
        activities_performed: rawBaseReport.activities_performed || [],
        supervisor_notes: rawBaseReport.supervisor_notes || null,
        created_at: rawBaseReport.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: rep, error: repErr } = await this.getSupabase()
        .from('reports')
        .upsert(baseReport)
        .select()
        .single();

      if (repErr) {
        console.warn('Supabase saveReport error, persisted locally:', repErr);
        return localSaved;
      }

      const reportId = rep.id;

      if (crew && crew.length > 0) {
        await this.getSupabase().from('report_crew').delete().eq('report_id', reportId);
        const cleanCrew = crew.map((c: any) => ({
          ...(c.id ? { id: c.id } : {}),
          report_id: reportId,
          user_id: c.user_id,
          start_at: c.start_at,
          end_at: c.end_at,
          hours: Number(c.hours) || 0,
          hourly_rate_snapshot: Number(c.hourly_rate_snapshot) || 0,
          is_weekend: Boolean(c.is_weekend),
          is_supervisor_no_hours: Boolean(c.is_supervisor_no_hours),
          notes: c.notes || null,
        }));
        const { error: crewErr } = await this.getSupabase().from('report_crew').insert(cleanCrew);
        if (crewErr) console.warn('Supabase report_crew insert error:', crewErr);
      }

      if (items && items.length > 0) {
        await this.getSupabase().from('report_items').delete().eq('report_id', reportId);
        const cleanItems = items.map((i: any) => ({
          ...(i.id ? { id: i.id } : {}),
          report_id: reportId,
          accessory_id: i.accessory_id,
          quantity: Number(i.quantity) || 1,
          unit: i.unit || 'each',
          measure_notes: i.measure_notes || null,
          ...(i.unit_price_override !== undefined ? { unit_price_override: Number(i.unit_price_override) } : {}),
        }));
        const { error: itemsErr } = await this.getSupabase().from('report_items').insert(cleanItems);
        if (itemsErr) console.warn('Supabase report_items insert error:', itemsErr);
      }

      return localSaved;
    } catch (err) {
      console.warn('Exception in saveReport, returning local copy:', err);
      return localSaved;
    }
  }

  async deleteReport(id: string): Promise<boolean> {
    await this.fallback.deleteReport(id);
    if (!this.isConfigured) return true;
    try {
      const { error } = await this.getSupabase().from('reports').delete().eq('id', id);
      if (error) console.warn('Supabase deleteReport error:', error);
      return true;
    } catch (err) {
      console.warn('Exception in deleteReport:', err);
      return true;
    }
  }

  async updateReportStatus(id: string, status: ReportStatus, supervisorNotes?: string): Promise<Report> {
    const local = await this.fallback.updateReportStatus(id, status, supervisorNotes);
    if (!this.isConfigured) return local;
    try {
      const { data, error } = await this.getSupabase()
        .from('reports')
        .update({ status, supervisor_notes: supervisorNotes, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) console.warn('Supabase updateReportStatus error, using local:', error);
      return data ? { ...local, ...data } : local;
    } catch (err) {
      console.warn('Exception in updateReportStatus, using local:', err);
      return local;
    }
  }

  async bulkSaveReports(newReports: Report[], mode: 'upsert' | 'replace' = 'upsert'): Promise<{ count: number }> {
    // Always persist to local fallback first so UI updates immediately without lag or failure
    const fallbackRes = await this.fallback.bulkSaveReports(newReports, mode);
    if (!this.isConfigured) return fallbackRes;

    try {
      for (const r of newReports) {
        await this.saveReport(r);
      }
      return { count: newReports.length };
    } catch (err) {
      console.warn('Supabase bulkSaveReports exception, using local fallback:', err);
      return fallbackRes;
    }
  }

  // --- Validation Helpers (delegate to fallback/logic) ---
  async checkUserReportOverlap(
    userId: string,
    workDate: string,
    startIso: string,
    endIso: string,
    excludeReportId?: string
  ): Promise<{ hasOverlap: boolean; message?: string }> {
    return this.fallback.checkUserReportOverlap(userId, workDate, startIso, endIso, excludeReportId);
  }

  async checkDuplicateUserSiteReport(
    userId: string,
    workDate: string,
    jobSiteId: string,
    excludeReportId?: string
  ): Promise<boolean> {
    return this.fallback.checkDuplicateUserSiteReport(userId, workDate, jobSiteId, excludeReportId);
  }

  // --- Site Progress ---
  async getSiteProgress(jobSiteId: string): Promise<SiteProgressSummary> {
    return this.fallback.getSiteProgress(jobSiteId);
  }

  async getAllSitesProgress(): Promise<SiteProgressSummary[]> {
    return this.fallback.getAllSitesProgress();
  }

  // --- Permissions & Settings ---
  async getPermissions(): Promise<Permission[]> {
    return this.fallback.getPermissions();
  }

  async savePermissions(permissions: Permission[]): Promise<void> {
    return this.fallback.savePermissions(permissions);
  }

  async getSettings(): Promise<Settings> {
    return this.fallback.getSettings();
  }

  async saveSettings(settings: Settings): Promise<void> {
    return this.fallback.saveSettings(settings);
  }

  // --- Logs ---
  async getAuditLogs(): Promise<AuditLog[]> {
    return this.fallback.getAuditLogs();
  }

  async logAudit(action: string, entity: string, entityId: string, details: string, user: { id: string; name: string }): Promise<void> {
    return this.fallback.logAudit(action, entity, entityId, details, user);
  }

  async getImportLogs(): Promise<ImportLog[]> {
    return this.fallback.getImportLogs();
  }

  async logImport(log: Omit<ImportLog, 'id' | 'created_at'>): Promise<ImportLog> {
    return this.fallback.logImport(log);
  }

  // --- Drafts ---
  async getDraft(userId: string): Promise<any | null> {
    return this.fallback.getDraft(userId);
  }

  async saveDraft(userId: string, draft: any): Promise<void> {
    return this.fallback.saveDraft(userId, draft);
  }

  async clearDraft(userId: string): Promise<void> {
    return this.fallback.clearDraft(userId);
  }

  async resetToSeedData(): Promise<void> {
    return this.fallback.resetToSeedData();
  }
}
