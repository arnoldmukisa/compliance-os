import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';
import { ScheduleDialog } from './scheduler/ScheduleDialog';
import { ScheduleList } from './scheduler/ScheduleList';
import { ScheduledReport } from '@/types/reports';

const INITIAL_SCHEDULES: ScheduledReport[] = [
  {
    id: '1',
    name: 'Weekly Compliance Status',
    type: 'compliance',
    format: 'pdf',
    frequency: 'weekly',
    recipients: ['compliance@example.com'],
    enabled: true,
  },
  {
    id: '2',
    name: 'Daily Evidence Collection',
    type: 'evidence',
    format: 'excel',
    frequency: 'daily',
    recipients: ['evidence@example.com'],
    enabled: true,
  },
];

export function ReportScheduler() {
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<ScheduledReport[]>(INITIAL_SCHEDULES);
  const { toast } = useToast();

  const handleCreateSchedule = (schedule: Omit<ScheduledReport, 'id' | 'enabled'>) => {
    const newSchedule: ScheduledReport = {
      id: crypto.randomUUID(),
      ...schedule,
      enabled: true,
    };

    setSchedules([...schedules, newSchedule]);
    setOpen(false);

    toast({
      title: 'Schedule Created',
      description: 'The report schedule has been created successfully.',
    });
  };

  const handleToggleSchedule = (id: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, enabled: !schedule.enabled }
          : schedule
      )
    );

    const schedule = schedules.find((s) => s.id === id);
    toast({
      title: schedule?.enabled ? 'Schedule Disabled' : 'Schedule Enabled',
      description: `The report schedule has been ${
        schedule?.enabled ? 'disabled' : 'enabled'
      }.`,
    });
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    toast({
      title: 'Schedule Deleted',
      description: 'The report schedule has been deleted.',
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Clock className="mr-2 h-4 w-4" />
        Schedule Reports
      </Button>

      <ScheduleDialog
        open={open}
        onOpenChange={setOpen}
        onSchedule={handleCreateSchedule}
      />

      {schedules.length > 0 && (
        <ScheduleList
          schedules={schedules}
          onToggle={handleToggleSchedule}
          onDelete={handleDeleteSchedule}
        />
      )}
    </>
  );
}