import { useState } from 'react';
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
import { Calendar } from 'lucide-react';

interface JobSchedulerProps {
  onSchedule: (schedule: string) => void;
}

export function JobScheduler({ onSchedule }: JobSchedulerProps) {
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('daily');
  const [customCron, setCustomCron] = useState('');

  const handleSchedule = () => {
    let cronExpression = '';
    switch (frequency) {
      case 'daily':
        cronExpression = '0 0 * * *';
        break;
      case 'weekly':
        cronExpression = '0 0 * * 0';
        break;
      case 'monthly':
        cronExpression = '0 0 1 * *';
        break;
      case 'custom':
        cronExpression = customCron;
        break;
    }
    onSchedule(cronExpression);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Collection Frequency</Label>
        <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="custom">Custom Schedule</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {frequency === 'custom' && (
        <div className="space-y-2">
          <Label>Custom Cron Expression</Label>
          <div className="flex space-x-2">
            <Input
              value={customCron}
              onChange={(e) => setCustomCron(e.target.value)}
              placeholder="0 0 * * *"
            />
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter a valid cron expression (e.g., "0 0 * * *" for daily at midnight)
          </p>
        </div>
      )}

      <Button onClick={handleSchedule} className="w-full">
        Set Schedule
      </Button>
    </div>
  );
}