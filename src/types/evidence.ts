export type EvidenceType = 
  | 'document'
  | 'screenshot'
  | 'log'
  | 'configuration'
  | 'report'
  | 'other';

export type EvidenceStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface Evidence {
  id: string;
  type: EvidenceType;
  title: string;
  description?: string;
  sourceSystem: string;
  collectionDate: string;
  expirationDate?: string;
  status: EvidenceStatus;
  metadata: Record<string, any>;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  controlIds: string[];
  tags?: string[];
}