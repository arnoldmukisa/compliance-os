import { supabase } from '@/lib/supabase';
import {
  Question,
  QuestionnaireTemplate,
  QuestionnaireResponse,
  QuestionStatus,
} from '@/types/questionnaire';

export class QuestionnaireService {
  private organizationId: string;

  constructor(organizationId: string) {
    this.organizationId = organizationId;
  }

  async createTemplate(template: Omit<QuestionnaireTemplate, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('questionnaire_templates')
      .insert({
        name: template.name,
        description: template.description,
        categories: template.categories,
        organization_id: this.organizationId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async saveResponse(response: QuestionnaireResponse) {
    const { data: responseData, error: responseError } = await supabase
      .from('questionnaire_responses')
      .upsert({
        id: response.id,
        template_id: response.templateId,
        organization_id: this.organizationId,
        status: response.status,
        submitted_by: response.submittedBy,
        submitted_at: response.submittedAt,
      })
      .select()
      .single();

    if (responseError) throw responseError;

    // Save answers
    const answers = Object.entries(response.answers).map(([questionId, answer]) => ({
      response_id: responseData.id,
      question_id: questionId,
      answer,
      status: 'pending',
    }));

    const { error: answersError } = await supabase
      .from('response_answers')
      .upsert(answers);

    if (answersError) throw answersError;

    return responseData;
  }

  async reviewAnswer(
    responseId: string,
    questionId: string,
    status: QuestionStatus,
    comments?: string
  ) {
    const { error } = await supabase
      .from('response_answers')
      .update({
        status,
        reviewer_comments: comments,
        reviewed_by: 'Current User', // TODO: Get from auth context
        reviewed_at: new Date().toISOString(),
      })
      .match({ response_id: responseId, question_id: questionId });

    if (error) throw error;
  }

  async getResponsesForReview() {
    const { data, error } = await supabase
      .from('questionnaire_responses')
      .select(\`
        *,
        template:questionnaire_templates(name),
        answers:response_answers(
          id,
          question_id,
          answer,
          status,
          reviewer_comments,
          reviewed_by,
          reviewed_at
        )
      \`)
      .eq('organization_id', this.organizationId)
      .eq('status', 'submitted');

    if (error) throw error;
    return data;
  }

  async uploadAttachment(
    responseId: string,
    questionId: string,
    file: File
  ) {
    const filePath = \`attachments/\${responseId}/\${questionId}/\${file.name}\`;
    
    const { error: uploadError } = await supabase.storage
      .from('questionnaire-attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { error: dbError } = await supabase
      .from('response_attachments')
      .insert({
        response_id: responseId,
        question_id: questionId,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: 'Current User', // TODO: Get from auth context
      });

    if (dbError) throw dbError;
  }
}