import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { QuestionnaireService } from '@/lib/services/questionnaire-service';
import { CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';

interface ReviewItem {
  id: string;
  templateName: string;
  submittedBy: string;
  submittedAt: string;
  answers: Array<{
    id: string;
    questionId: string;
    answer: string;
    status: string;
    reviewerComments?: string;
  }>;
}

export function QuestionnaireReview() {
  const [selectedResponse, setSelectedResponse] = useState<ReviewItem | null>(null);
  const [reviewComments, setReviewComments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleApprove = async (answerId: string) => {
    try {
      // TODO: Implement with actual service
      toast({
        title: 'Answer Approved',
        description: 'The response has been approved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve the response.',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (answerId: string) => {
    try {
      // TODO: Implement with actual service
      toast({
        title: 'Answer Rejected',
        description: 'The response has been rejected.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject the response.',
        variant: 'destructive',
      });
    }
  };

  const handleRequestClarification = async (answerId: string) => {
    try {
      // TODO: Implement with actual service
      toast({
        title: 'Clarification Requested',
        description: 'A clarification request has been sent.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to request clarification.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Responses for Review</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* TODO: Replace with actual data */}
            <TableRow>
              <TableCell>SOC 2 Security Questionnaire</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>2024-03-15</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending Review</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResponse(null)} // TODO: Set actual response
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {selectedResponse && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Review: {selectedResponse.templateName}
              </h3>
              <Badge variant="outline">
                Submitted by {selectedResponse.submittedBy}
              </Badge>
            </div>

            {selectedResponse.answers.map((answer) => (
              <div key={answer.id} className="space-y-4 border-t pt-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="font-medium">Question ID: {answer.questionId}</p>
                    <p className="text-muted-foreground">{answer.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApprove(answer.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(answer.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRequestClarification(answer.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Request Clarification
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`comments-${answer.id}`}>Review Comments</Label>
                  <Textarea
                    id={`comments-${answer.id}`}
                    value={reviewComments[answer.id] || ''}
                    onChange={(e) =>
                      setReviewComments({
                        ...reviewComments,
                        [answer.id]: e.target.value,
                      })
                    }
                    placeholder="Add your review comments here..."
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}