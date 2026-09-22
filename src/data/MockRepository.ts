import {
  IDataRepository,
  ReportFilter,
  SiteProgressItem,
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
import {
  SEED_PROFILES,
  SEED_CONTRACTORS,
  SEED_JOB_SITES,
  SEED_ACCESSORIES,
  SEED_ACCESSORY_PRICES,
  SEED_SITE_SCOPES,
  SEED_PERMISSIONS,
  SEED_SETTINGS,
  SEED_REPORTS,
  SEED_AUDIT_LOGS,
} from './seedData';
import { intervalsOverlap } from '../utils/dateUtils';

const STORAGE_KEY_PREFIX = 'ap_install_';

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}`, e);
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving localStorage for ${key}`, e);
  }
}

export class MockRepository implements IDataRepository {
  private profiles: Profile[];
  private contractors: Contractor[];
  private jobSites: JobSite[];
  private accessories: Accessory[];
  private accessoryPrices: AccessoryPrice[];
  private siteScopes: SiteScope[];
  private reports: Report[];
  private permissions: Permission[];
  private settings: Settings;
  private auditLogs: AuditLog[];
  private importLogs: ImportLog[];

  constructor() {
    const DATA_VERSION = 'v12_consolidated_historical_reports_all_sheets_and_jan10';
    const currentVersion = localStorage.getItem(STORAGE_KEY_PREFIX + 'version');

    if (currentVersion !== DATA_VERSION) {
      this.profiles = [...SEED_PROFILES];
      this.contractors = [...SEED_CONTRACTORS];
      this.jobSites = [...SEED_JOB_SITES];
      this.accessories = [...SEED_ACCESSORIES];
      this.accessoryPrices = [...SEED_ACCESSORY_PRICES];
      this.siteScopes = [...SEED_SITE_SCOPES];
      this.reports = [...SEED_REPORTS];
      this.permissions = [...SEED_PERMISSIONS];
      this.settings = { ...SEED_SETTINGS };
      this.auditLogs = [...SEED_AUDIT_LOGS];
      this.importLogs = [];
      this.persistAll();
      localStorage.setItem(STORAGE_KEY_PREFIX + 'version', DATA_VERSION);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'initialized', 'true');
    } else {
      this.profiles = getStorage('profiles', SEED_PROFILES);
      this.contractors = getStorage('contractors', SEED_CONTRACTORS);
      this.jobSites = getStorage('jobSites', SEED_JOB_SITES);
      this.accessories = getStorage('accessories', SEED_ACCESSORIES);
      this.accessoryPrices = getStorage('accessoryPrices', SEED_ACCESSORY_PRICES);
      this.siteScopes = getStorage('siteScopes', SEED_SITE_SCOPES);
      this.reports = getStorage('reports', SEED_REPORTS);
      this.permissions = getStorage('permissions', SEED_PERMISSIONS);
      this.settings = getStorage('settings', SEED_SETTINGS);
      this.auditLogs = getStorage('auditLogs', SEED_AUDIT_LOGS);
      this.importLogs = getStorage('importLogs', []);
    }

    // Ensure all permission modules exist and have scope
    let updatedPerms = false;
    for (const seedP of SEED_PERMISSIONS) {
      const existing = this.permissions.find(p => p.role === seedP.role && p.module === seedP.module);
      if (!existing) {
        this.permissions.push({ ...seedP });
        updatedPerms = true;
      } else if (existing.scope === undefined && seedP.scope !== undefined) {
        existing.scope = seedP.scope;
        updatedPerms = true;
      }
    }
    if (updatedPerms) {
      setStorage('permissions', this.permissions);
    }

    // Strict rules and data integrity sanitization:
    // 1. Pedro worked strictly up to April 24, 2026. After that date, he must not appear in any report or crew.
    // 2. Efraín worked strictly up to June 5, 2026. After that date, he must not appear in any report or crew.
    // 3. Purge legacy synthetic demo/future reports (e.g. rep-20260924-01).
    // 4. Correct any legacy timestamps skewed by the UTC-4 local timezone bug (10:30 -> 06:30, 11:00 -> 07:00, 19:00 -> 15:00, 19:30 -> 15:30).
    const FAKE_REPORT_IDS = new Set([
      'rep-20260921-01',
      'rep-20260924-01',
    ]);
    const initialReportCount = this.reports.length;
    this.reports = this.reports.filter(r => !FAKE_REPORT_IDS.has(r.id) && r.work_date <= '2026-09-21');
    let sanitizedReports = this.reports.length !== initialReportCount;

    this.reports = this.reports.map(rep => {
      let modified = false;
      let newRep = { ...rep };

      // Check Efrain post June 5, 2026
      if (newRep.work_date > '2026-06-05') {
        if (newRep.created_by === 'usr-efrain') {
          newRep.created_by = 'usr-antony';
          newRep.creator_name = 'Antony';
          modified = true;
        }
        if (newRep.crew.some(c => c.user_id === 'usr-efrain')) {
          newRep.crew = newRep.crew.filter(c => c.user_id !== 'usr-efrain');
          modified = true;
        }
      }

      // Check Pedro post April 24, 2026
      if (newRep.work_date > '2026-04-24') {
        if (newRep.created_by === 'usr-pedro') {
          newRep.created_by = 'usr-antony';
          newRep.creator_name = 'Antony';
          modified = true;
        }
        if (newRep.crew.some(c => c.user_id === 'usr-pedro')) {
          newRep.crew = newRep.crew.filter(c => c.user_id !== 'usr-pedro');
          modified = true;
        }
      }

      // Sanitize legacy timestamps skewed by +4 hours UTC offset
      newRep.crew = newRep.crew.map(c => {
        let changed = false;
        let start = c.start_at;
        let end = c.end_at;

        if (start && start.includes('T10:30:')) {
          start = start.replace('T10:30:', 'T06:30:');
          changed = true;
        } else if (start && start.includes('T11:00:')) {
          start = start.replace('T11:00:', 'T07:00:');
          changed = true;
        }

        if (end && end.includes('T19:00:')) {
          end = end.replace('T19:00:', 'T15:00:');
          changed = true;
        } else if (end && end.includes('T19:30:')) {
          end = end.replace('T19:30:', 'T15:30:');
          changed = true;
        }

        if (changed) {
          modified = true;
          return { ...c, start_at: start, end_at: end };
        }
        return c;
      });

      if (modified) {
        sanitizedReports = true;
        return newRep;
      }
      return rep;
    });

    // Also ensure Pedro and Efrain are inactive in profiles if cached
    this.profiles = this.profiles.map(p => {
      if ((p.id === 'usr-pedro' || p.id === 'usr-efrain') && p.active) {
        return { ...p, active: false };
      }
      return p;
    });

    if (sanitizedReports) {
      setStorage('reports', this.reports);
      setStorage('profiles', this.profiles);
    }
  }

  private persistAll(): void {
    setStorage('profiles', this.profiles);
    setStorage('contractors', this.contractors);
    setStorage('jobSites', this.jobSites);
    setStorage('accessories', this.accessories);
    setStorage('accessoryPrices', this.accessoryPrices);
    setStorage('siteScopes', this.siteScopes);
    setStorage('reports', this.reports);
    setStorage('permissions', this.permissions);
    setStorage('settings', this.settings);
    setStorage('auditLogs', this.auditLogs);
    setStorage('importLogs', this.importLogs);
  }

  // --- Profiles ---
  async getProfiles(): Promise<Profile[]> {
    return [...this.profiles];
  }

  async getProfileById(id: string): Promise<Profile | null> {
    const profile = this.profiles.find(p => p.id === id);
    return profile ? { ...profile } : null;
  }

  async saveProfile(profile: Partial<Profile> & { id?: string }): Promise<Profile> {
    if (profile.id) {
      const idx = this.profiles.findIndex(p => p.id === profile.id);
      if (idx >= 0) {
        this.profiles[idx] = { ...this.profiles[idx], ...profile } as Profile;
        this.persistAll();
        return { ...this.profiles[idx] };
      }
    }
    const newProfile: Profile = {
      id: profile.id || `usr-${Date.now()}`,
      full_name: profile.full_name || 'Nuevo Usuario',
      role: profile.role || 'installer',
      email: profile.email || '',
      phone: profile.phone || '',
      active: profile.active !== undefined ? profile.active : true,
      default_hourly_rate: profile.default_hourly_rate || 20,
    };
    this.profiles.push(newProfile);
    this.persistAll();
    return { ...newProfile };
  }

  async deleteProfile(id: string): Promise<boolean> {
    this.profiles = this.profiles.filter(p => p.id !== id);
    this.persistAll();
    return true;
  }

  // --- Contractors ---
  async getContractors(): Promise<Contractor[]> {
    return [...this.contractors];
  }

  async saveContractor(contractor: Partial<Contractor> & { id?: string }): Promise<Contractor> {
    if (contractor.id) {
      const idx = this.contractors.findIndex(c => c.id === contractor.id);
      if (idx >= 0) {
        this.contractors[idx] = { ...this.contractors[idx], ...contractor } as Contractor;
        this.persistAll();
        return { ...this.contractors[idx] };
      }
    }
    const newCont: Contractor = {
      id: contractor.id || `cont-${Date.now()}`,
      name: contractor.name || 'Nuevo Contratista',
    };
    this.contractors.push(newCont);
    this.persistAll();
    return { ...newCont };
  }

  async deleteContractor(id: string): Promise<boolean> {
    this.contractors = this.contractors.filter(c => c.id !== id);
    this.persistAll();
    return true;
  }

  // --- Job Sites ---
  async getJobSites(): Promise<JobSite[]> {
    // augment with contractor_name
    return this.jobSites.map(site => {
      const cont = this.contractors.find(c => c.id === site.contractor_id);
      return {
        ...site,
        contractor_name: cont?.name || 'Desconocido',
      };
    });
  }

  async saveJobSite(site: Partial<JobSite> & { id?: string }): Promise<JobSite> {
    if (site.id) {
      const idx = this.jobSites.findIndex(s => s.id === site.id);
      if (idx >= 0) {
        this.jobSites[idx] = { ...this.jobSites[idx], ...site } as JobSite;
        this.persistAll();
        return { ...this.jobSites[idx] };
      }
    }
    const newSite: JobSite = {
      id: site.id || `site-${Date.now()}`,
      name: site.name || 'Nuevo Sitio',
      contractor_id: site.contractor_id || this.contractors[0]?.id || '',
      active: site.active !== undefined ? site.active : true,
    };
    this.jobSites.push(newSite);
    this.persistAll();
    return { ...newSite };
  }

  async deleteJobSite(id: string): Promise<boolean> {
    this.jobSites = this.jobSites.filter(s => s.id !== id);
    this.persistAll();
    return true;
  }

  // --- Accessories & Catalogues ---
  async getAccessories(): Promise<Accessory[]> {
    return [...this.accessories];
  }

  async saveAccessory(accessory: Partial<Accessory> & { id?: string }): Promise<Accessory> {
    if (accessory.id) {
      const idx = this.accessories.findIndex(a => a.id === accessory.id);
      if (idx >= 0) {
        this.accessories[idx] = { ...this.accessories[idx], ...accessory } as Accessory;
        this.persistAll();
        return { ...this.accessories[idx] };
      }
    }
    const code = accessory.code || (accessory.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const newAcc: Accessory = {
      id: accessory.id || `acc-${Date.now()}`,
      code: code || `acc-code-${Date.now()}`,
      name: accessory.name || 'Nuevo Accesorio',
      category: accessory.category || 'Varios',
      unit: accessory.unit || 'each',
      item_type: accessory.item_type || 'product',
      aliases: accessory.aliases || [],
      default_price: accessory.default_price || null,
      active: accessory.active !== undefined ? accessory.active : true,
    };
    this.accessories.push(newAcc);
    this.persistAll();
    return { ...newAcc };
  }

  async deleteAccessory(id: string, forceHardDelete: boolean = false): Promise<boolean> {
    // Check if in use in reports
    const inUse = this.reports.some(r => r.items.some(i => i.accessory_id === id));
    if (inUse && !forceHardDelete) {
      // Safely deactivate instead of hard delete
      const acc = this.accessories.find(a => a.id === id);
      if (acc) {
        acc.active = false;
        this.persistAll();
      }
      return false; // Indicating deactivated rather than purged
    }
    // Remove accessory
    this.accessories = this.accessories.filter(a => a.id !== id);
    // Also cleanup related siteScopes and accessoryPrices
    this.siteScopes = this.siteScopes.filter(s => s.accessory_id !== id);
    this.accessoryPrices = this.accessoryPrices.filter(p => p.accessory_id !== id);
    this.persistAll();
    return true;
  }

  async getAccessoryPrices(): Promise<AccessoryPrice[]> {
    return [...this.accessoryPrices];
  }

  async saveAccessoryPrice(price: Partial<AccessoryPrice> & { id?: string }): Promise<AccessoryPrice> {
    if (price.id) {
      const idx = this.accessoryPrices.findIndex(p => p.id === price.id);
      if (idx >= 0) {
        this.accessoryPrices[idx] = { ...this.accessoryPrices[idx], ...price } as AccessoryPrice;
        this.persistAll();
        return { ...this.accessoryPrices[idx] };
      }
    }
    const newPrice: AccessoryPrice = {
      id: price.id || `pr-${Date.now()}`,
      accessory_id: price.accessory_id || '',
      contractor_id: price.contractor_id || null,
      unit_price: price.unit_price || 0,
      valid_from: price.valid_from || new Date().toISOString().split('T')[0],
    };
    this.accessoryPrices.push(newPrice);
    this.persistAll();
    return { ...newPrice };
  }

  // --- Site Scopes ---
  async getSiteScopes(jobSiteId?: string): Promise<SiteScope[]> {
    if (jobSiteId) {
      return this.siteScopes.filter(s => s.job_site_id === jobSiteId);
    }
    return [...this.siteScopes];
  }

  async saveSiteScope(scope: Partial<SiteScope> & { id?: string }): Promise<SiteScope> {
    if (scope.id) {
      const idx = this.siteScopes.findIndex(s => s.id === scope.id);
      if (idx >= 0) {
        this.siteScopes[idx] = { ...this.siteScopes[idx], ...scope } as SiteScope;
        this.persistAll();
        return { ...this.siteScopes[idx] };
      }
    }
    const newScope: SiteScope = {
      id: scope.id || `sc-${Date.now()}`,
      job_site_id: scope.job_site_id || '',
      accessory_id: scope.accessory_id || '',
      planned_qty: scope.planned_qty || 0,
      unit: scope.unit || 'each',
      area_label: scope.area_label || '',
      notes: scope.notes || '',
    };
    this.siteScopes.push(newScope);
    this.persistAll();
    return { ...newScope };
  }

  async deleteSiteScope(id: string): Promise<boolean> {
    this.siteScopes = this.siteScopes.filter(s => s.id !== id);
    this.persistAll();
    return true;
  }

  // --- Reports ---
  async getReports(filter?: ReportFilter): Promise<Report[]> {
    let result = [...this.reports];

    if (filter?.date) {
      result = result.filter(r => r.work_date === filter.date);
    }
    if (filter?.startDate && filter?.endDate) {
      result = result.filter(r => r.work_date >= filter.startDate! && r.work_date <= filter.endDate!);
    }
    if (filter?.jobSiteId) {
      result = result.filter(r => r.job_site_id === filter.jobSiteId);
    }
    if (filter?.contractorId) {
      result = result.filter(r => r.contractor_id === filter.contractorId);
    }
    if (filter?.userId) {
      result = result.filter(r => r.created_by === filter.userId || r.crew.some(c => c.user_id === filter.userId));
    }
    if (filter?.status) {
      result = result.filter(r => r.status === filter.status);
    }

    // Sort descending by date, then created_at
    result.sort((a, b) => {
      const cmp = b.work_date.localeCompare(a.work_date);
      if (cmp !== 0) return cmp;
      return b.created_at.localeCompare(a.created_at);
    });

    return result;
  }

  async getReportById(id: string): Promise<Report | null> {
    const rep = this.reports.find(r => r.id === id);
    return rep ? { ...rep } : null;
  }

  async saveReport(reportData: Partial<Report>): Promise<Report> {
    const site = this.jobSites.find(s => s.id === reportData.job_site_id);
    const contractor = site ? this.contractors.find(c => c.id === site.contractor_id) : undefined;
    const creator = this.profiles.find(p => p.id === reportData.created_by);

    const now = new Date().toISOString();

    if (reportData.id) {
      const idx = this.reports.findIndex(r => r.id === reportData.id);
      if (idx >= 0) {
        const existing = this.reports[idx];
        const updated: Report = {
          ...existing,
          ...reportData,
          job_site_name: site?.name || existing.job_site_name,
          contractor_id: site?.contractor_id || existing.contractor_id,
          contractor_name: contractor?.name || existing.contractor_name,
          creator_name: creator?.full_name || existing.creator_name,
          updated_at: now,
          crew: reportData.crew ? [...reportData.crew] : existing.crew,
          items: reportData.items ? [...reportData.items] : existing.items,
        };
        this.reports[idx] = updated;
        this.persistAll();
        return { ...updated };
      }
    }

    const newReport: Report = {
      id: reportData.id || `rep-${Date.now()}`,
      work_date: reportData.work_date || now.split('T')[0],
      job_site_id: reportData.job_site_id || '',
      job_site_name: site?.name || 'Sitio',
      contractor_id: site?.contractor_id || '',
      contractor_name: contractor?.name || '',
      created_by: reportData.created_by || '',
      creator_name: creator?.full_name || '',
      status: reportData.status || 'submitted',
      observations: reportData.observations || '',
      incident_type: reportData.incident_type || 'ninguna',
      activities_performed: reportData.activities_performed || [],
      created_at: now,
      updated_at: now,
      crew: (reportData.crew || []).map((c, i) => {
        const u = this.profiles.find(p => p.id === c.user_id);
        return {
          ...c,
          id: c.id || `cr-${Date.now()}-${i}`,
          user_name: u?.full_name || c.user_name || 'Instalador',
        };
      }),
      items: (reportData.items || []).map((it, i) => {
        const acc = this.accessories.find(a => a.id === it.accessory_id);
        const unitPrice = it.unit_price_override !== undefined ? it.unit_price_override : (acc?.default_price || 0);
        return {
          ...it,
          id: it.id || `it-${Date.now()}-${i}`,
          accessory_name: acc?.name || it.accessory_name || '',
          accessory_unit: acc?.unit || it.unit,
          line_total: (it.quantity || 0) * (unitPrice || 0),
        };
      }),
    };

    this.reports.unshift(newReport);
    this.persistAll();
    return { ...newReport };
  }

  async deleteReport(id: string): Promise<boolean> {
    this.reports = this.reports.filter(r => r.id !== id);
    this.persistAll();
    return true;
  }

  async updateReportStatus(id: string, status: ReportStatus, supervisorNotes?: string): Promise<Report> {
    const report = this.reports.find(r => r.id === id);
    if (!report) throw new Error(`Report ${id} not found`);

    report.status = status;
    if (supervisorNotes !== undefined) {
      report.supervisor_notes = supervisorNotes;
    }
    report.updated_at = new Date().toISOString();
    this.persistAll();
    return { ...report };
  }

  async bulkSaveReports(newReports: Report[], mode: 'upsert' | 'replace' = 'upsert'): Promise<{ count: number }> {
    if (mode === 'replace') {
      this.reports = [...newReports];
    } else {
      for (const rep of newReports) {
        const idx = this.reports.findIndex(r => r.id === rep.id || (r.work_date === rep.work_date && r.job_site_id === rep.job_site_id));
        if (idx >= 0) {
          this.reports[idx] = { ...this.reports[idx], ...rep, updated_at: new Date().toISOString() };
        } else {
          this.reports.push(rep);
        }
      }
    }
    // Sort descending
    this.reports.sort((a, b) => b.work_date.localeCompare(a.work_date));
    this.persistAll();
    return { count: newReports.length };
  }

  // --- Validation Helpers ---
  async checkUserReportOverlap(
    userId: string,
    workDate: string,
    startIso: string,
    endIso: string,
    excludeReportId?: string
  ): Promise<{ hasOverlap: boolean; message?: string }> {
    // Find all reports on this work_date (or adjacent day for overnight shifts)
    const candidates = this.reports.filter(r => {
      if (excludeReportId && r.id === excludeReportId) return false;
      // Allow draft or submitted reports
      return r.work_date === workDate;
    });

    for (const report of candidates) {
      const member = report.crew.find(c => c.user_id === userId);
      if (member) {
        if (intervalsOverlap(startIso, endIso, member.start_at, member.end_at)) {
          const user = this.profiles.find(p => p.id === userId);
          return {
            hasOverlap: true,
            message: `${user?.full_name || 'El instalador'} ya tiene un turno registrado en ${report.job_site_name} que se traslapa con este horario.`,
          };
        }
      }
    }

    return { hasOverlap: false };
  }

  async checkDuplicateUserSiteReport(
    userId: string,
    workDate: string,
    jobSiteId: string,
    excludeReportId?: string
  ): Promise<boolean> {
    return this.reports.some(r => {
      if (excludeReportId && r.id === excludeReportId) return false;
      return (
        r.work_date === workDate &&
        r.job_site_id === jobSiteId &&
        (r.created_by === userId || r.crew.some(c => c.user_id === userId))
      );
    });
  }

  // --- Site Progress Computation ---
  async getSiteProgress(jobSiteId: string): Promise<SiteProgressSummary> {
    const site = this.jobSites.find(s => s.id === jobSiteId);
    if (!site) throw new Error(`Job site ${jobSiteId} not found`);

    const scopes = this.siteScopes.filter(s => s.job_site_id === jobSiteId);
    const countMode = this.settings.progress_counts; // 'approved' or 'approved_and_submitted'

    // Get relevant reports for this site
    const siteReports = this.reports.filter(r => {
      if (r.job_site_id !== jobSiteId) return false;
      if (countMode === 'approved') {
        return r.status === 'approved';
      } else {
        // approved_and_submitted: include approved, in_review, submitted
        return r.status !== 'draft';
      }
    });

    // Map installed items
    // key: accessory_id
    const installedMap = new Map<
      string,
      {
        approvedQty: number;
        submittedQty: number;
        contributing: Array<{
          reportId: string;
          workDate: string;
          quantity: number;
          unit: string;
          installers: string[];
          status: ReportStatus;
        }>;
      }
    >();

    for (const report of siteReports) {
      for (const item of report.items) {
        if (!installedMap.has(item.accessory_id)) {
          installedMap.set(item.accessory_id, { approvedQty: 0, submittedQty: 0, contributing: [] });
        }
        const entry = installedMap.get(item.accessory_id)!;
        const qty = item.quantity || 0;

        if (report.status === 'approved') {
          entry.approvedQty += qty;
        } else {
          entry.submittedQty += qty;
        }

        entry.contributing.push({
          reportId: report.id,
          workDate: report.work_date,
          quantity: qty,
          unit: item.unit,
          installers: report.crew.map(c => c.user_name || 'Instalador'),
          status: report.status,
        });
      }
    }

    // Build planned items list
    const plannedItems: SiteProgressItem[] = [];
    const plannedAccIds = new Set<string>();

    let totalPlannedVal = 0;
    let totalInstalledVal = 0;
    let sumPercentages = 0;
    let totalPlannedCount = 0;
    let totalInstalledCount = 0;

    for (const sc of scopes) {
      plannedAccIds.add(sc.accessory_id);
      const acc = this.accessories.find(a => a.id === sc.accessory_id);
      const installed = installedMap.get(sc.accessory_id) || { approvedQty: 0, submittedQty: 0, contributing: [] };

      const totalInstalled = installed.approvedQty + installed.submittedQty;
      const planned = sc.planned_qty || 0;
      const remaining = Math.max(0, planned - totalInstalled);
      const pct = planned > 0 ? (totalInstalled / planned) * 100 : 0;

      // Price weighting
      const price = acc?.default_price || 0;
      const plannedVal = planned * price;
      const installedVal = Math.min(totalInstalled, planned) * price;

      totalPlannedVal += plannedVal;
      totalInstalledVal += installedVal;
      sumPercentages += Math.min(100, pct);
      totalPlannedCount += planned;
      totalInstalledCount += totalInstalled;

      plannedItems.push({
        accessoryId: sc.accessory_id,
        accessoryCode: acc?.code || '',
        accessoryName: acc?.name || 'Accesorio',
        category: acc?.category || 'General',
        unit: sc.unit,
        planned,
        approvedInstalled: installed.approvedQty,
        submittedInstalled: installed.submittedQty,
        totalInstalled,
        remaining,
        percentage: pct,
        isUnplanned: false,
        unitPrice: price,
        plannedValue: plannedVal,
        installedValue: installedVal,
        contributingReports: installed.contributing,
      });
    }

    // Unplanned items (reported on site but not in site_scope)
    const unplannedItems: SiteProgressItem[] = [];
    installedMap.forEach((installed, accId) => {
      if (!plannedAccIds.has(accId)) {
        const acc = this.accessories.find(a => a.id === accId);
        const totalInstalled = installed.approvedQty + installed.submittedQty;
        unplannedItems.push({
          accessoryId: accId,
          accessoryCode: acc?.code || '',
          accessoryName: acc?.name || 'Accesorio extra',
          category: acc?.category || 'Sin planificar',
          unit: acc?.unit || 'each',
          planned: 0,
          approvedInstalled: installed.approvedQty,
          submittedInstalled: installed.submittedQty,
          totalInstalled,
          remaining: 0,
          percentage: 100,
          isUnplanned: true,
          unitPrice: acc?.default_price || 0,
          contributingReports: installed.contributing,
        });
      }
    });

    // Calculate overall percentage
    let overallPercentage = 0;
    let methodUsed: 'value_weighted' | 'average' = 'average';

    if (totalPlannedVal > 0) {
      overallPercentage = (totalInstalledVal / totalPlannedVal) * 100;
      methodUsed = 'value_weighted';
    } else if (plannedItems.length > 0) {
      overallPercentage = sumPercentages / plannedItems.length;
      methodUsed = 'average';
    }

    return {
      jobSite: site,
      overallPercentage: Math.min(100, Math.round(overallPercentage * 10) / 10),
      methodUsed,
      totalPlannedItems: totalPlannedCount,
      totalInstalledItems: totalInstalledCount,
      totalMissingItems: Math.max(0, totalPlannedCount - totalInstalledCount),
      items: plannedItems,
      unplannedItems,
    };
  }

  async getAllSitesProgress(): Promise<SiteProgressSummary[]> {
    const sites = await this.getJobSites();
    const results: SiteProgressSummary[] = [];
    for (const site of sites) {
      results.push(await this.getSiteProgress(site.id));
    }
    return results;
  }

  // --- Permissions & Settings ---
  async getPermissions(): Promise<Permission[]> {
    return [...this.permissions];
  }

  async savePermissions(newPermissions: Permission[]): Promise<void> {
    this.permissions = [...newPermissions];
    this.persistAll();
  }

  async getSettings(): Promise<Settings> {
    return { ...this.settings };
  }

  async saveSettings(settings: Settings): Promise<void> {
    this.settings = { ...settings };
    this.persistAll();
  }

  // --- Logs ---
  async getAuditLogs(): Promise<AuditLog[]> {
    return [...this.auditLogs].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async logAudit(action: string, entity: string, entityId: string, details: string, user: { id: string; name: string }): Promise<void> {
    const entry: AuditLog = {
      id: `aud-${Date.now()}`,
      user_id: user.id,
      user_name: user.name,
      action,
      entity,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(entry);
    this.persistAll();
  }

  async getImportLogs(): Promise<ImportLog[]> {
    return [...this.importLogs].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async logImport(log: Omit<ImportLog, 'id' | 'created_at'>): Promise<ImportLog> {
    const entry: ImportLog = {
      ...log,
      id: `imp-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.importLogs.unshift(entry);
    this.persistAll();
    return entry;
  }

  // --- Drafts (LocalStorage per user) ---
  async getDraft(userId: string): Promise<any | null> {
    return getStorage(`draft_${userId}`, null);
  }

  async saveDraft(userId: string, draft: any): Promise<void> {
    setStorage(`draft_${userId}`, draft);
  }

  async clearDraft(userId: string): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + `draft_${userId}`);
    } catch (e) {
      console.warn('Error clearing draft', e);
    }
  }

  async resetToSeedData(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'initialized');
    this.profiles = [...SEED_PROFILES];
    this.contractors = [...SEED_CONTRACTORS];
    this.jobSites = [...SEED_JOB_SITES];
    this.accessories = [...SEED_ACCESSORIES];
    this.accessoryPrices = [...SEED_ACCESSORY_PRICES];
    this.siteScopes = [...SEED_SITE_SCOPES];
    this.reports = [...SEED_REPORTS];
    this.permissions = [...SEED_PERMISSIONS];
    this.settings = { ...SEED_SETTINGS };
    this.auditLogs = [...SEED_AUDIT_LOGS];
    this.importLogs = [];
    this.persistAll();
  }
}
