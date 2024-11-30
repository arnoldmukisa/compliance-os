import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { ScheduledReport } from '@/types/reports';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (schedule: Omit<ScheduledReport, 'id' | 'enabled'>) => void;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  onSchedule,
}: ScheduleDialogProps) {
  const [newSchedule, setNewSchedule] = useState<Partial<ScheduledReport>>({
    format: 'pdf',
    frequency: 'weekly',
    recipients: [],
  });

  const handleCreate = () => {
    if (!newSchedule.name || !newSchedule.type || !newSchedule.recipients?.length) {
      return;
    }

    onSchedule(newSchedule as Omit<ScheduledReport, 'id' | 'enabled'>);
    setNewSchedule({
      format: 'pdf',
      frequency: 'weekly',
      recipients: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Report Generation</DialogTitle>
          <DialogDescription>
            Configure automated report generation and delivery.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newSchedule.name || ''}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Report Type
            </Label>
            <Select
              value={newSchedule.type}
              onValueChange={(value) =>
                setNewSchedule({ ...newSchedule, type: value as any })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compliance">Compliance Status</SelectItem>
                <SelectItem value="evidence">Evidence Collection</SelectItem>
                <SelectItem value="audit">Audit Trail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Format
            </Label>
            <Select
              value={newSchedule.format}
              onValueChange={(value) =>
                setNewSchedule({ ...newSchedule, format: value as any })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="frequency" className="text-right">
              Frequency
            </Label>
            <Select
              value={newSchedule.frequency}
              onValueChange={(value) =>
                setNewSchedule({ ...newSchedule, frequency: value as any })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipients" className="text-right">
              Recipients
            </Label>
            <Input
              id="recipients"
              placeholder="Enter email addresses (comma-separated)"
              value={newSchedule.recipients?.join(', ') || ''}
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  recipients: e.target.value.split(',').map((email) => email.trim()),
                })
              }
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}