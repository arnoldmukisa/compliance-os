import { supabase } from '@/lib/supabase';
import { IntegrationConfig } from './integration-service';
import { Integration } from '@/types/integrations';

export class IntegrationStorage {
  private organizationId: string;

  constructor(organizationId: string) {
    this.organizationId = organizationId;
  }

  async saveConfig(integrationId: string, config: IntegrationConfig): Promise<void> {
    const { error } = await supabase
      .from('integration_configs')
      .upsert({
        integration_id: integrationId,
        config,
        organization_id: this.organizationId,
        status: 'connected',
        last_sync: new Date().toISOString(),
      });

    if (error) {
      throw new Error(`Failed to save integration config: ${error.message}`);
    }
  }

  async getConfig(integrationId: string): Promise<IntegrationConfig | null> {
    const { data, error } = await supabase
      .from('integration_configs')
      .select('config')
      .eq('integration_id', integrationId)
      .eq('organization_id', this.organizationId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to get integration config: ${error.message}`);
    }

    return data?.config || null;
  }

  async updateStatus(
    integrationId: string,
    status: Integration['status']
  ): Promise<void> {
    const { error } = await supabase
      .from('integration_configs')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('integration_id', integrationId)
      .eq('organization_id', this.organizationId);

    if (error) {
      throw new Error(`Failed to update integration status: ${error.message}`);
    }
  }

  async updateLastSync(integrationId: string): Promise<void> {
    const { error } = await supabase
      .from('integration_configs')
      .update({ last_sync: new Date().toISOString() })
      .eq('integration_id', integrationId)
      .eq('organization_id', this.organizationId);

    if (error) {
      throw new Error(`Failed to update last sync: ${error.message}`);
    }
  }

  async deleteConfig(integrationId: string): Promise<void> {
    const { error } = await supabase
      .from('integration_configs')
      .delete()
      .eq('integration_id', integrationId)
      .eq('organization_id', this.organizationId);

    if (error) {
      throw new Error(`Failed to delete integration config: ${error.message}`);
    }
  }

  async getAllConfigs(): Promise<
    Array<{
      integration_id: string;
      config: IntegrationConfig;
      status: Integration['status'];
      last_sync: string | null;
    }>
  > {
    const { data, error } = await supabase
      .from('integration_configs')
      .select('integration_id, config, status, last_sync')
      .eq('organization_id', this.organizationId);

    if (error) {
      throw new Error(`Failed to get integration configs: ${error.message}`);
    }

    return data;
  }
}