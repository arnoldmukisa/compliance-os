import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { EvidenceCollectionChart } from './charts/EvidenceCollectionChart';
import { EvidenceCollectionTable } from './tables/EvidenceCollectionTable';
import { Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EvidenceCollectionReport() {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  const { toast } = useToast();

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    toast({
      title: 'Export Started',
      description: `Exporting evidence collection report as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <EvidenceCollectionChart dateRange={dateRange} />
        </Card>
        <Card className="p-6">
          <EvidenceCollectionTable dateRange={dateRange} />
        </Card>
      </div>
    </div>
  );
}