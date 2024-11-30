import { supabase } from '@/lib/supabase';
import { EvidenceMapping } from '@/types/evidence-mapping';

export class EvidenceMappingService {
  private organizationId: string;

  constructor(organizationId: string) {
    this.organizationId = organizationId;
  }

  async createMapping(mapping: Omit<EvidenceMapping, 'id' | 'mappedAt'>) {
    const { data, error } = await supabase
      .from('evidence_mappings')
      .insert({
        ...mapping,
        organization_id: this.organizationId,
        mapped_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMapping(mappingId: string, updates: Partial<EvidenceMapping>) {
    const { error } = await supabase
      .from('evidence_mappings')
      .update(updates)
      .eq('id', mappingId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }

  async deleteMapping(mappingId: string) {
    const { error } = await supabase
      .from('evidence_mappings')
      .update({ status: 'archived' })
      .eq('id', mappingId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }

  async getMappingsForControl(controlId: string) {
    const { data, error } = await supabase
      .from('evidence_mappings')
      .select(\`
        *,
        evidence:evidence_id(*)
      \`)
      .eq('control_id', controlId)
      .eq('organization_id', this.organizationId)
      .eq('status', 'active');

    if (error) throw error;
    return data;
  }

  async getMappingsForEvidence(evidenceId: string) {
    const { data, error } = await supabase
      .from('evidence_mappings')
      .select(\`
        *,
        control:control_id(*)
      \`)
      .eq('evidence_id', evidenceId)
      .eq('organization_id', this.organizationId)
      .eq('status', 'active');

    if (error) throw error;
    return data;
  }
}