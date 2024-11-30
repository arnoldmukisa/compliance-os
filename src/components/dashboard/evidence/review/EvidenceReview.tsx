import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Evidence } from '@/types/evidence';
import { FileText, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const MOCK_EVIDENCE: Evidence[] = [
  {
    id: '1',
    type: 'document',
    title: 'Security Policy Document',
    description: 'Annual security policy documentation',
    sourceSystem: 'Microsoft 365',
    collectionDate: '2024-03-15T10:00:00Z',
    status: 'pending',
    metadata: {},
    controlIds: ['CC1.1', 'CC1.2'],
    tags: ['policy', 'security'],
  },
  {
    id: '2',
    type: 'configuration',
    title: 'AWS Security Configuration',
    description: 'Security group and IAM settings',
    sourceSystem: 'AWS',
    collectionDate: '2024-03-14T15:30:00Z',
    status: 'pending',
    metadata: {},
    controlIds: ['CC6.1', 'CC6.2'],
    tags: ['configuration', 'aws'],
  },
];

export function EvidenceReview() {
  const [evidence] = useState<Evidence[]>(MOCK_EVIDENCE);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [reviewComments, setReviewComments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleApprove = async (evidenceId: string) => {
    toast({
      title: 'Evidence Approved',
      description: 'The evidence has been approved successfully.',
    });
  };

  const handleReject = async (evidenceId: string) => {
    toast({
      title: 'Evidence Rejected',
      description: 'The evidence has been rejected.',
    });
  };

  const handleRequestClarification = async (evidenceId: string) => {
    toast({
      title: 'Clarification Requested',
      description: 'A clarification request has been sent.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Evidence Review</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Review Queue</h3>
          <div className="space-y-4">
            {evidence.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 ${
                  selectedEvidence?.id === item.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedEvidence(item)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          {selectedEvidence ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedEvidence.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedEvidence.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Review Comments</label>
                  <Textarea
                    value={reviewComments[selectedEvidence.id] || ''}
                    onChange={(e) =>
                      setReviewComments({
                        ...reviewComments,
                        [selectedEvidence.id]: e.target.value,
                      })
                    }
                    placeholder="Add your review comments here..."
                    className="mt-2"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApprove(selectedEvidence.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedEvidence.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleRequestClarification(selectedEvidence.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Clarification
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>Select evidence to review</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}