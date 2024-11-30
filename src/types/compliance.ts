export type ComplianceFramework = 'soc2' | 'gdpr' | 'iso27001' | 'hipaa';

export type ComplianceStatus = 'compliant' | 'non-compliant' | 'in-progress' | 'not-started';

export interface ComplianceControl {
  id: string;
  framework: ComplianceFramework;
  category: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  lastUpdated: string;
  assignee?: string;
  dueDate?: string;
}

export interface ComplianceCategory {
  name: string;
  description: string;
  controls: ComplianceControl[];
}