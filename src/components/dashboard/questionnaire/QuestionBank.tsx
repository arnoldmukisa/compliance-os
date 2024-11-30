import { useState } from 'react';
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
import { Question, QuestionStatus } from '@/types/questionnaire';
import { Edit2, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface QuestionBankProps {
  searchQuery: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    category: 'security',
    question: 'How do you handle password policies and requirements?',
    answer: 'We enforce strong password policies including minimum length, complexity, and regular rotation.',
    status: 'approved',
    assignee: 'John Doe',
    reviewer: 'Jane Smith',
    lastUpdated: '2024-03-15T10:00:00Z',
    tags: ['passwords', 'authentication'],
  },
  {
    id: '2',
    category: 'privacy',
    question: 'What is your data retention policy?',
    status: 'pending',
    assignee: 'Mike Johnson',
    lastUpdated: '2024-03-14T15:30:00Z',
    tags: ['data-retention', 'gdpr'],
  },
];

export function QuestionBank({ searchQuery }: QuestionBankProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredQuestions = MOCK_QUESTIONS.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: QuestionStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
      case 'in-review':
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: QuestionStatus) => {
    const variants: Record<QuestionStatus, string> = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      'in-review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuestions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{question.question}</TableCell>
              <TableCell>
                <Badge variant="secondary">{question.category}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(question.status)}
                  {getStatusBadge(question.status)}
                </div>
              </TableCell>
              <TableCell>{question.assignee}</TableCell>
              <TableCell>
                {new Date(question.lastUpdated).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
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