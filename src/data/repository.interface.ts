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
  UserRole,
} from '../types';

export interface ReportFilter {
  date?: string;
  startDate?: string;
  endDate?: string;
  jobSiteId?: string;
  contractorId?: string;
  userId?: string;
  status?: ReportStatus;
}

export interface SiteProgressItem {
  accessoryId: string;
  accessoryCode: string;
  accessoryName: string;
  category: string;
  unit: string;
  planned: number;
  approvedInstalled: number;
  submittedInstalled: number;
  totalInstalled: number;
  remaining: number;
  percentage: number;
  isUnplanned: boolean;
  unitPrice?: number;
  plannedValue?: number;
  installedValue?: number;
  contributingReports: Array<{
    reportId: string;
    workDate: string;
    quantity: number;
    unit: string;
    installers: string[];
    status: ReportStatus;
  }>;
}

export interface SiteProgressSummary {
  jobSite: JobSite;
  overallPercentage: number;
  methodUsed: 'value_weighted' | 'average';
  totalPlannedItems: number;
  totalInstalledItems: number;
  totalMissingItems: number;
  items: SiteProgressItem[];
  unplannedItems: SiteProgressItem[];
}

export interface IDataRepository {
  // Profiles (Users)
  getProfiles(): Promise<Profile[]>;
  getProfileById(id: string): Promise<Profile | null>;
  saveProfile(profile: Partial<Profile> & { id?: string }): Promise<Profile>;
  deleteProfile(id: string): Promise<boolean>;

  // Contractors & Job Sites
  getContractors(): Promise<Contractor[]>;
  saveContractor(contractor: Partial<Contractor> & { id?: string }): Promise<Contractor>;
  deleteContractor(id: string): Promise<boolean>;

  getJobSites(): Promise<JobSite[]>;
  saveJobSite(site: Partial<JobSite> & { id?: string }): Promise<JobSite>;
  deleteJobSite(id: string): Promise<boolean>;

  // Accessories & Catalogues
  getAccessories(): Promise<Accessory[]>;
  saveAccessory(accessory: Partial<Accessory> & { id?: string }): Promise<Accessory>;
  deleteAccessory(id: string, forceHardDelete?: boolean): Promise<boolean>;
  getAccessoryPrices(): Promise<AccessoryPrice[]>;
  saveAccessoryPrice(price: Partial<AccessoryPrice> & { id?: string }): Promise<AccessoryPrice>;

  // Site Scopes (Base del avance)
  getSiteScopes(jobSiteId?: string): Promise<SiteScope[]>;
  saveSiteScope(scope: Partial<SiteScope> & { id?: string }): Promise<SiteScope>;
  deleteSiteScope(id: string): Promise<boolean>;

  // Reports
  getReports(filter?: ReportFilter): Promise<Report[]>;
  getReportById(id: string): Promise<Report | null>;
  saveReport(report: Partial<Report>): Promise<Report>;
  deleteReport(id: string): Promise<boolean>;
  updateReportStatus(id: string, status: ReportStatus, supervisorNotes?: string): Promise<Report>;

  // Validation helpers for business rules
  checkUserReportOverlap(
    userId: string,
    workDate: string,
    startIso: string,
    endIso: string,
    excludeReportId?: string
  ): Promise<{ hasOverlap: boolean; message?: string }>;

  checkDuplicateUserSiteReport(
    userId: string,
    workDate: string,
    jobSiteId: string,
    excludeReportId?: string
  ): Promise<boolean>;

  // Progress computation
  getSiteProgress(jobSiteId: string): Promise<SiteProgressSummary>;
  getAllSitesProgress(): Promise<SiteProgressSummary[]>;

  // Permissions & Settings
  getPermissions(): Promise<Permission[]>;
  savePermissions(permissions: Permission[]): Promise<void>;
  getSettings(): Promise<Settings>;
  saveSettings(settings: Settings): Promise<void>;

  // Logs
  getAuditLogs(): Promise<AuditLog[]>;
  logAudit(action: string, entity: string, entityId: string, details: string, user: { id: string; name: string }): Promise<void>;
  getImportLogs(): Promise<ImportLog[]>;
  logImport(log: Omit<ImportLog, 'id' | 'created_at'>): Promise<ImportLog>;

  // Drafts (Offline-first support for installer mobile form)
  getDraft(userId: string): Promise<any | null>;
  saveDraft(userId: string, draft: any): Promise<void>;
  clearDraft(userId: string): Promise<void>;

  // Bulk Reports Import
  bulkSaveReports(newReports: Report[], mode?: 'upsert' | 'replace'): Promise<{ count: number }>;

  // Reset to seeds
  resetToSeedData(): Promise<void>;
}
