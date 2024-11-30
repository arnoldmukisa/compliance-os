import { Evidence } from './evidence';
import { ComplianceControl } from './compliance';

export interface EvidenceMapping {
  id: string;
  evidenceId: string;
  controlId: string;
  mappingType: 'primary' | 'secondary';
  justification?: string;
  mappedBy: string;
  mappedAt: string;
  status: 'active' | 'archived';
}

export interface EvidenceControlMapping {
  control: ComplianceControl;
  evidence: Evidence[];
  mappings: EvidenceMapping[];
}