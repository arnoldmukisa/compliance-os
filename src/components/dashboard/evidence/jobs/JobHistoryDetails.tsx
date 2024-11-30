import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface JobExecutionLog {
  id: string;
  jobId: string;
  integrationId: string;
  startTime: string;
  endTime: string;
  status: 'success' | 'failed' | 'partial';
  itemsCollected: number;
  errorMessage?: string;
  details?: {
    phase: string;
    message: string;
    timestamp: string;
  }[];
}

interface JobHistoryDetailsProps {
  log: JobExecutionLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobHistoryDetails({
  log,
  open,
  onOpenChange,
}: JobHistoryDetailsProps) {
  if (!log) return null;

  const getStatusIcon = (status: JobExecutionLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStatusIcon(log.status)}
            <span>Execution Details</span>
          </DialogTitle>
          <DialogDescription>
            Job execution details for {log.integrationId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Start Time</p>
              <p className="font-medium">
                {new Date(log.startTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Time</p>
              <p className="font-medium">
                {new Date(log.endTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Collected</p>
              <p className="font-medium">{log.itemsCollected}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={
                  log.status === 'success'
                    ? 'default'
                    : log.status === 'failed'
                    ? 'destructive'
                    : 'outline'
                }
              >
                {log.status}
              </Badge>
            </div>
          </div>

          {log.errorMessage && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-destructive">Error Message</p>
              <p className="text-sm">{log.errorMessage}</p>
            </div>
          )}

          {log.details && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Execution Log</p>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                {log.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-2 py-2">
                    <Clock className="h-4 w-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{detail.phase}</p>
                      <p className="text-sm text-muted-foreground">
                        {detail.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(detail.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}