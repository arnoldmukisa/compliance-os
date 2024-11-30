import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComplianceFramework } from '@/types/compliance';
import { ComplianceStatusChart } from './charts/ComplianceStatusChart';
import { ComplianceControlsTable } from './tables/ComplianceControlsTable';
import { Download, FileBarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ComplianceStatusReport() {
  const [framework, setFramework] = useState<ComplianceFramework>('soc2');
  const { toast } = useToast();

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    toast({
      title: 'Export Started',
      description: `Exporting compliance status report as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select value={framework} onValueChange={(value: ComplianceFramework) => setFramework(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soc2">SOC 2</SelectItem>
              <SelectItem value="gdpr">GDPR</SelectItem>
              <SelectItem value="iso27001">ISO 27001</SelectItem>
              <SelectItem value="hipaa">HIPAA</SelectItem>
            </SelectContent>
          </Select>
          <FileBarChart className="h-5 w-5 text-muted-foreground" />
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
          <ComplianceStatusChart framework={framework} />
        </Card>
        <Card className="p-6">
          <ComplianceControlsTable framework={framework} />
        </Card>
      </div>
    </div>
  );
}