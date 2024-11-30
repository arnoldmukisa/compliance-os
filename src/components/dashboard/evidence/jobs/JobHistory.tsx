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
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface JobExecutionLog {
  id: string;
  jobId: string;
  integrationId: string;
  startTime: string;
  endTime: string;
  status: 'success' | 'failed' | 'partial';
  itemsCollected: number;
  errorMessage?: string;
}

interface JobHistoryProps {
  logs: JobExecutionLog[];
  onViewDetails: (logId: string) => void;
}

export function JobHistory({ logs, onViewDetails }: JobHistoryProps) {
  const getStatusIcon = (status: JobExecutionLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: JobExecutionLog['status']) => {
    const variants = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Execution History</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Integration</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items Collected</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => {
            const duration = new Date(log.endTime).getTime() - new Date(log.startTime).getTime();
            const durationMinutes = Math.floor(duration / 1000 / 60);
            
            return (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.integrationId}</TableCell>
                <TableCell>{new Date(log.startTime).toLocaleString()}</TableCell>
                <TableCell>{durationMinutes} minutes</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(log.status)}
                    {getStatusBadge(log.status)}
                  </div>
                </TableCell>
                <TableCell>{log.itemsCollected}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(log.id)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}