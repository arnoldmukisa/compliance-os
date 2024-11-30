import { useState } from 'react';
import { QuestionnaireService } from '@/lib/services/questionnaire-service';
import { QuestionnaireResponse } from '@/types/questionnaire';

// TODO: Replace with actual organization ID from auth context
const ORGANIZATION_ID = 'default-org';
const questionnaireService = new QuestionnaireService(ORGANIZATION_ID);

export function useQuestionnaire() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveResponse = async (response: QuestionnaireResponse) => {
    setLoading(true);
    setError(null);
    try {
      await questionnaireService.saveResponse(response);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reviewAnswer = async (
    responseId: string,
    questionId: string,
    status: 'approved' | 'rejected' | 'needs_clarification',
    comments?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await questionnaireService.reviewAnswer(responseId, questionId, status, comments);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getResponsesForReview = async () => {
    setLoading(true);
    setError(null);
    try {
      return await questionnaireService.getResponsesForReview();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveResponse,
    reviewAnswer,
    getResponsesForReview,
  };
}