import { supabase } from '@/lib/supabase';
import { Evidence } from '@/types/evidence';
import { IntegrationManager } from './integration-service';

interface CollectionJob {
  id: string;
  integration_id: string;
  schedule: string;
  collection_type: string;
  configuration: Record<string, any>;
  organization_id: string;
}

export class EvidenceCollectionService {
  private organizationId: string;
  private integrationManager: IntegrationManager;

  constructor(organizationId: string) {
    this.organizationId = organizationId;
    this.integrationManager = new IntegrationManager(organizationId);
  }

  async createJob(job: Omit<CollectionJob, 'id' | 'organization_id'>) {
    const { data, error } = await supabase
      .from('evidence_collection_jobs')
      .insert({
        ...job,
        organization_id: this.organizationId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateJob(jobId: string, updates: Partial<CollectionJob>) {
    const { error } = await supabase
      .from('evidence_collection_jobs')
      .update(updates)
      .eq('id', jobId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }

  async deleteJob(jobId: string) {
    const { error } = await supabase
      .from('evidence_collection_jobs')
      .delete()
      .eq('id', jobId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }

  async executeJob(jobId: string): Promise<void> {
    const { data: job, error } = await supabase
      .from('evidence_collection_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('organization_id', this.organizationId)
      .single();

    if (error) throw error;
    if (!job) throw new Error('Job not found');

    const startTime = new Date();
    let status: 'success' | 'failed' | 'partial' = 'success';
    let errorMessage: string | null = null;
    let itemsCollected = 0;

    try {
      const evidence = await this.collectEvidence(job);
      itemsCollected = evidence.length;

      // Store collected evidence
      for (const item of evidence) {
        await this.storeEvidence(item);
      }
    } catch (error) {
      status = 'failed';
      errorMessage = error.message;
    }

    // Log the collection attempt
    await supabase.from('evidence_collection_logs').insert({
      job_id: jobId,
      organization_id: this.organizationId,
      status,
      start_time: startTime.toISOString(),
      end_time: new Date().toISOString(),
      items_collected: itemsCollected,
      error_message: errorMessage,
    });

    // Update job's last run time
    await this.updateJob(jobId, {
      last_run: new Date().toISOString(),
    });
  }

  private async collectEvidence(
    job: CollectionJob
  ): Promise<Omit<Evidence, 'id' | 'status'>[]> {
    const integration = await this.integrationManager.getIntegration(job.integration_id);
    if (!integration) {
      throw new Error('Integration not found');
    }

    switch (job.collection_type) {
      case 'document-policies':
        return this.collectDocumentPolicies(integration, job.configuration);
      case 'security-config':
        return this.collectSecurityConfig(integration, job.configuration);
      case 'access-logs':
        return this.collectAccessLogs(integration, job.configuration);
      default:
        throw new Error(`Unsupported collection type: ${job.collection_type}`);
    }
  }

  private async storeEvidence(evidence: Omit<Evidence, 'id' | 'status'>) {
    const { error } = await supabase.from('evidence').insert({
      ...evidence,
      organization_id: this.organizationId,
      status: 'pending',
    });

    if (error) throw error;
  }

  private async collectDocumentPolicies(
    integration: any,
    config: Record<string, any>
  ): Promise<Omit<Evidence, 'id' | 'status'>[]> {
    // Implementation depends on the integration type
    // Example for MS365:
    if (integration.id === 'ms-365') {
      const documents = await integration.getDocuments(config.folderPath);
      return documents.map((doc: any) => ({
        type: 'document',
        title: doc.name,
        description: `Policy document from ${config.folderPath}`,
        sourceSystem: 'Microsoft 365',
        collectionDate: new Date().toISOString(),
        metadata: {
          path: doc.path,
          lastModified: doc.lastModified,
          author: doc.author,
        },
        controlIds: [], // Map based on document metadata or path
        tags: config.documentTypes,
      }));
    }
    return [];
  }

  private async collectSecurityConfig(
    integration: any,
    config: Record<string, any>
  ): Promise<Omit<Evidence, 'id' | 'status'>[]> {
    // Implementation depends on the integration type
    // Example for AWS:
    if (integration.id === 'aws') {
      const configs = await integration.getSecurityConfigs(config.services, config.regions);
      return configs.map((cfg: any) => ({
        type: 'configuration',
        title: `${cfg.service} Configuration - ${cfg.region}`,
        description: `Security configuration for ${cfg.service}`,
        sourceSystem: 'AWS',
        collectionDate: new Date().toISOString(),
        metadata: {
          service: cfg.service,
          region: cfg.region,
          configurationItems: cfg.items,
        },
        controlIds: [], // Map based on service and configuration type
        tags: [cfg.service, 'security-config', cfg.region],
      }));
    }
    return [];
  }

  private async collectAccessLogs(
    integration: any,
    config: Record<string, any>
  ): Promise<Omit<Evidence, 'id' | 'status'>[]> {
    // Implementation depends on the integration type
    return [];
  }
}