import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Settings2, Trash2 } from 'lucide-react';

interface CollectionJob {
  id: string;
  integrationId: string;
  schedule: string;
  collectionType: string;
  configuration: Record<string, any>;
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused';
}

interface JobListProps {
  jobs: CollectionJob[];
  onToggleJob: (jobId: string) => void;
  onConfigureJob: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
}

export function JobList({
  jobs,
  onToggleJob,
  onConfigureJob,
  onDeleteJob,
}: JobListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Integration</TableHead>
          <TableHead>Schedule</TableHead>
          <TableHead>Last Run</TableHead>
          <TableHead>Next Run</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.integrationId}</TableCell>
            <TableCell>{job.schedule}</TableCell>
            <TableCell>
              {job.lastRun ? new Date(job.lastRun).toLocaleString() : 'Never'}
            </TableCell>
            <TableCell>
              {job.nextRun ? new Date(job.nextRun).toLocaleString() : 'Not scheduled'}
            </TableCell>
            <TableCell>
              <Badge
                variant={job.status === 'active' ? 'default' : 'secondary'}
              >
                {job.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onToggleJob(job.id)}
                >
                  {job.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onConfigureJob(job.id)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDeleteJob(job.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}