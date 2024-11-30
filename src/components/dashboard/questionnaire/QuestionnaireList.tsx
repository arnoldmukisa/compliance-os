import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, FileText, Trash2 } from 'lucide-react';
import { QuestionnaireTemplate, QuestionnaireResponse } from '@/types/questionnaire';
import { useState } from 'react';
import { QuestionnaireAnswer } from './QuestionnaireAnswer';

interface QuestionnaireListProps {
  searchQuery: string;
}

const MOCK_QUESTIONNAIRES: QuestionnaireTemplate[] = [
  {
    id: '1',
    name: 'SOC 2 Security Questionnaire',
    description: 'Standard security assessment for SOC 2 compliance',
    categories: ['security', 'compliance'],
    questions: [
      {
        id: 'q1',
        category: 'security',
        question: 'Describe your password policy and requirements.',
        status: 'approved',
        lastUpdated: new Date().toISOString(),
        tags: ['access-control', 'authentication'],
      },
      {
        id: 'q2',
        category: 'security',
        question: 'How do you handle security incident response?',
        status: 'approved',
        lastUpdated: new Date().toISOString(),
        tags: ['incident-response', 'security-operations'],
      },
    ],
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'GDPR Data Privacy Assessment',
    description: 'Comprehensive GDPR compliance questionnaire',
    categories: ['privacy', 'compliance'],
    questions: [
      {
        id: 'q3',
        category: 'privacy',
        question: 'What is your data retention policy?',
        status: 'approved',
        lastUpdated: new Date().toISOString(),
        tags: ['data-retention', 'gdpr'],
      },
      {
        id: 'q4',
        category: 'privacy',
        question: 'How do you handle data subject access requests?',
        status: 'approved',
        lastUpdated: new Date().toISOString(),
        tags: ['data-rights', 'gdpr'],
      },
    ],
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-15T09:45:00Z',
  },
];

export function QuestionnaireList({ searchQuery }: QuestionnaireListProps) {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<QuestionnaireTemplate | null>(null);

  const filteredQuestionnaires = MOCK_QUESTIONNAIRES.filter(
    (q) =>
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnswer = (questionnaire: QuestionnaireTemplate) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const handleSaveResponse = (response: QuestionnaireResponse) => {
    // TODO: Implement save logic
    console.log('Saving response:', response);
  };

  const handleSubmitResponse = (response: QuestionnaireResponse) => {
    // TODO: Implement submit logic
    console.log('Submitting response:', response);
    setSelectedQuestionnaire(null);
  };

  if (selectedQuestionnaire) {
    return (
      <QuestionnaireAnswer
        questions={selectedQuestionnaire.questions}
        templateId={selectedQuestionnaire.id}
        onSave={handleSaveResponse}
        onSubmit={handleSubmitResponse}
        onClose={() => setSelectedQuestionnaire(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuestionnaires.map((questionnaire) => (
            <TableRow key={questionnaire.id}>
              <TableCell className="font-medium">{questionnaire.name}</TableCell>
              <TableCell>{questionnaire.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {questionnaire.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {new Date(questionnaire.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAnswer(questionnaire)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}