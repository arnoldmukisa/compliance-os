export type ReportType = 'compliance' | 'evidence' | 'audit';
export type ReportFormat = 'pdf' | 'csv' | 'excel';
export type ReportFrequency = 'daily' | 'weekly' | 'monthly';

export interface ScheduledReport {
  id: string;
  name: string;
  type: ReportType;
  format: ReportFormat;
  frequency: ReportFrequency;
  recipients: string[];
  enabled: boolean;
}