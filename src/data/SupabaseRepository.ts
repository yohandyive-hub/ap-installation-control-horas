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

  // --- Profiles ---
  async getProfiles(): Promise<Profile[]> {
    if (!this.isConfigured) return this.fallback.getProfiles();
    const { data, error } = await this.getSupabase().from('profiles').select('*').order('full_name');
    if (error) throw error;
    return (data || []) as Profile[];
  }

  async getProfileById(id: string): Promise<Profile | null> {
    if (!this.isConfigured) return this.fallback.getProfileById(id);
    const { data, error } = await this.getSupabase().from('profiles').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data as Profile | null;
  }

  async saveProfile(profile: Partial<Profile> & { id?: string }): Promise<Profile> {
    if (!this.isConfigured) return this.fallback.saveProfile(profile);
    const { data, error } = await this.getSupabase().from('profiles').upsert(profile).select().single();
    if (error) throw error;
    return data as Profile;
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
    const { data, error } = await this.getSupabase().from('contractors').select('*').order('name');
    if (error) throw error;
    return (data || []) as Contractor[];
  }

  async saveContractor(contractor: Partial<Contractor> & { id?: string }): Promise<Contractor> {
    if (!this.isConfigured) return this.fallback.saveContractor(contractor);
    const { data, error } = await this.getSupabase().from('contractors').upsert(contractor).select().single();
    if (error) throw error;
    return data as Contractor;
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
    const { data, error } = await this.getSupabase()
      .from('job_sites')
      .select('*, contractors(name)')
      .order('name');
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      contractor_id: row.contractor_id,
      contractor_name: row.contractors?.name || '',
      active: row.active,
    }));
  }

  async saveJobSite(site: Partial<JobSite> & { id?: string }): Promise<JobSite> {
    if (!this.isConfigured) return this.fallback.saveJobSite(site);
    const { data, error } = await this.getSupabase().from('job_sites').upsert(site).select().single();
    if (error) throw error;
    return data as JobSite;
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
    const { data, error } = await this.getSupabase().from('accessories').select('*').order('name');
    if (error) throw error;
    return (data || []) as Accessory[];
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
    const { data, error } = await this.getSupabase().from('accessory_prices').select('*');
    if (error) throw error;
    return (data || []) as AccessoryPrice[];
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
    let query = this.getSupabase().from('site_scope').select('*');
    if (jobSiteId) query = query.eq('job_site_id', jobSiteId);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as SiteScope[];
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
    if (error) throw error;

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
  }

  async getReportById(id: string): Promise<Report | null> {
    if (!this.isConfigured) return this.fallback.getReportById(id);
    const list = await this.getReports();
    return list.find(r => r.id === id) || null;
  }

  async saveReport(reportData: Partial<Report>): Promise<Report> {
    if (!this.isConfigured) return this.fallback.saveReport(reportData);
    // In Supabase, upsert report row, then crew, then items
    const { crew, items, photos, ...baseReport } = reportData as any;
    const { data: rep, error: repErr } = await this.getSupabase()
      .from('reports')
      .upsert(baseReport)
      .select()
      .single();
    if (repErr) throw repErr;

    const reportId = rep.id;
    if (crew) {
      await this.getSupabase().from('report_crew').delete().eq('report_id', reportId);
      await this.getSupabase().from('report_crew').insert(
        crew.map((c: any) => ({ ...c, report_id: reportId }))
      );
    }
    if (items) {
      await this.getSupabase().from('report_items').delete().eq('report_id', reportId);
      await this.getSupabase().from('report_items').insert(
        items.map((i: any) => ({ ...i, report_id: reportId }))
      );
    }

    return (await this.getReportById(reportId))!;
  }

  async deleteReport(id: string): Promise<boolean> {
    if (!this.isConfigured) return this.fallback.deleteReport(id);
    const { error } = await this.getSupabase().from('reports').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  async updateReportStatus(id: string, status: ReportStatus, supervisorNotes?: string): Promise<Report> {
    if (!this.isConfigured) return this.fallback.updateReportStatus(id, status, supervisorNotes);
    const { data, error } = await this.getSupabase()
      .from('reports')
      .update({ status, supervisor_notes: supervisorNotes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Report;
  }

  async bulkSaveReports(newReports: Report[], mode: 'upsert' | 'replace' = 'upsert'): Promise<{ count: number }> {
    if (!this.isConfigured) return this.fallback.bulkSaveReports(newReports, mode);
    for (const r of newReports) {
      await this.saveReport(r);
    }
    return { count: newReports.length };
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
