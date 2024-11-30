import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Evidence } from '@/types/evidence';
import { CheckCircle, XCircle, MessageSquare, Tag, Calendar, Database } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface EvidenceReviewDetailsProps {
  evidence: Evidence;
  reviewComment: string;
  onCommentChange: (comment: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestClarification: () => void;
}

export function EvidenceReviewDetails({
  evidence,
  reviewComment,
  onCommentChange,
  onApprove,
  onReject,
  onRequestClarification,
}: EvidenceReviewDetailsProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">{evidence.title}</h3>
          <p className="text-sm text-muted-foreground">{evidence.description}</p>
        </div>
        <Badge variant="outline" className="ml-2">
          {evidence.type}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Database className="h-4 w-4 mr-2" />
            Source System
          </div>
          <p className="font-medium">{evidence.sourceSystem}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Collection Date
          </div>
          <p className="font-medium">
            {new Date(evidence.collectionDate).toLocaleString()}
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Metadata</h4>
          <Card className="p-4">
            <ScrollArea className="h-32">
              <pre className="text-sm">
                {JSON.stringify(evidence.metadata, null, 2)}
              </pre>
            </ScrollArea>
          </Card>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Associated Controls</h4>
          <div className="flex flex-wrap gap-2">
            {evidence.controlIds.map((controlId) => (
              <Badge key={controlId} variant="secondary">
                {controlId}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {evidence.tags?.map((tag) => (
              <div key={tag} className="flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                <span className="text-sm">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">Review Comments</label>
          <Textarea
            value={reviewComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Add your review comments here..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={onApprove} className="flex-1">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button onClick={onReject} variant="destructive" className="flex-1">
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={onRequestClarification}
            variant="outline"
            className="flex-1"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Request Clarification
          </Button>
        </div>
      </div>
    </div>
  );
}