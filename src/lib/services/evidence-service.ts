import { supabase } from '@/lib/supabase';
import { Evidence, EvidenceType, EvidenceStatus } from '@/types/evidence';

export class EvidenceService {
  private organizationId: string;

  constructor(organizationId: string) {
    this.organizationId = organizationId;
  }

  async collectEvidence(evidence: Omit<Evidence, 'id' | 'status'>) {
    const { data, error } = await supabase
      .from('evidence')
      .insert({
        ...evidence,
        organization_id: this.organizationId,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async uploadEvidenceFile(evidenceId: string, file: File) {
    const filePath = `evidence/${this.organizationId}/${evidenceId}/${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from('evidence-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from('evidence')
      .update({
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
      })
      .eq('id', evidenceId)
      .eq('organization_id', this.organizationId);

    if (updateError) throw updateError;
  }

  async getEvidenceForControl(controlId: string) {
    const { data, error } = await supabase
      .from('evidence')
      .select('*')
      .eq('organization_id', this.organizationId)
      .contains('control_ids', [controlId]);

    if (error) throw error;
    return data;
  }

  async updateEvidenceStatus(evidenceId: string, status: EvidenceStatus) {
    const { error } = await supabase
      .from('evidence')
      .update({ status })
      .eq('id', evidenceId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }

  async deleteEvidence(evidenceId: string) {
    const { error } = await supabase
      .from('evidence')
      .delete()
      .eq('id', evidenceId)
      .eq('organization_id', this.organizationId);

    if (error) throw error;
  }
}