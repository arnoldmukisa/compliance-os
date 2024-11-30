export type IntegrationCategory =
  | 'cloud'
  | 'identity'
  | 'monitoring'
  | 'communication'
  | 'security'
  | 'development';

export type IntegrationStatus = 'connected' | 'disconnected' | 'pending' | 'error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  icon: string;
  lastSync?: string;
  connectedBy?: string;
}