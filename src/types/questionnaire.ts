export type QuestionCategory = 
  | 'security'
  | 'privacy'
  | 'infrastructure'
  | 'compliance'
  | 'operations'
  | 'business';

export type QuestionStatus = 'pending' | 'in-review' | 'approved' | 'rejected';

export interface Question {
  id: string;
  category: QuestionCategory;
  question: string;
  answer?: string;
  status: QuestionStatus;
  assignee?: string;
  reviewer?: string;
  lastUpdated: string;
  supportingDocs?: string[];
  tags?: string[];
}

export interface QuestionnaireTemplate {
  id: string;
  name: string;
  description: string;
  categories: QuestionCategory[];
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionnaireResponse {
  id: string;
  templateId: string;
  answers: Record<string, string>;
  status: 'draft' | 'submitted' | 'completed';
  submittedBy?: string;
  submittedAt?: string;
  completedAt?: string;
}