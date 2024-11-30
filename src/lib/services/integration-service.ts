import { Integration } from '@/types/integrations';
import { MSTeamsService } from './integrations/ms-teams-service';
import { MS365Service } from './integrations/ms-365-service';
import { DigitalOceanService } from './integrations/digital-ocean-service';
import { IntegrationStorage } from './integration-storage';

export interface IntegrationConfig {
  [key: string]: string;
}

export interface IntegrationService {
  connect(config: IntegrationConfig): Promise<void>;
  disconnect(): Promise<void>;
  validateConfig(config: IntegrationConfig): Promise<boolean>;
  getStatus(): Promise<Integration['status']>;
  sync(): Promise<void>;
}

export class IntegrationManager {
  private services: Map<string, IntegrationService> = new Map();
  private storage: IntegrationStorage;

  constructor(organizationId: string) {
    this.storage = new IntegrationStorage(organizationId);
    this.services.set('ms-teams', new MSTeamsService());
    this.services.set('ms-365', new MS365Service());
    this.services.set('digitalocean', new DigitalOceanService());
    this.initializeFromStorage();
  }

  private async initializeFromStorage(): Promise<void> {
    try {
      const configs = await this.storage.getAllConfigs();
      for (const { integration_id, config } of configs) {
        const service = this.services.get(integration_id);
        if (service) {
          await service.connect(config);
        }
      }
    } catch (error) {
      console.error('Failed to initialize integrations:', error);
    }
  }

  async connect(integrationId: string, config: IntegrationConfig): Promise<void> {
    const service = this.services.get(integrationId);
    if (!service) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    const isValid = await service.validateConfig(config);
    if (!isValid) {
      throw new Error('Invalid configuration');
    }

    try {
      await service.connect(config);
      await this.storage.saveConfig(integrationId, config);
      await this.storage.updateStatus(integrationId, 'connected');
    } catch (error) {
      await this.storage.updateStatus(integrationId, 'error');
      throw error;
    }
  }

  async disconnect(integrationId: string): Promise<void> {
    const service = this.services.get(integrationId);
    if (!service) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    await service.disconnect();
    await this.storage.deleteConfig(integrationId);
  }

  async getStatus(integrationId: string): Promise<Integration['status']> {
    const service = this.services.get(integrationId);
    if (!service) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    return service.getStatus();
  }

  async sync(integrationId: string): Promise<void> {
    const service = this.services.get(integrationId);
    if (!service) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    try {
      await service.sync();
      await this.storage.updateLastSync(integrationId);
    } catch (error) {
      await this.storage.updateStatus(integrationId, 'error');
      throw error;
    }
  }
}