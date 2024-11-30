import { Clock, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScheduledReport } from '@/types/reports';

interface ScheduleListProps {
  schedules: ScheduledReport[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ScheduleList({ schedules, onToggle, onDelete }: ScheduleListProps) {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-sm font-medium">Active Schedules</h3>
      <div className="space-y-2">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div className="space-y-1">
              <p className="font-medium">{schedule.name}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{schedule.frequency}</span>
                <Download className="h-4 w-4 ml-2" />
                <span>{schedule.format.toUpperCase()}</span>
                <Mail className="h-4 w-4 ml-2" />
                <span>{schedule.recipients.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={schedule.enabled}
                onCheckedChange={() => onToggle(schedule.id)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(schedule.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}