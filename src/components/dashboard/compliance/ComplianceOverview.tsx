import { Progress } from '@/components/ui/progress';
import { ComplianceFramework } from '@/types/compliance';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ComplianceOverviewProps {
  framework: ComplianceFramework;
}

export function ComplianceOverview({ framework }: ComplianceOverviewProps) {
  const stats = {
    soc2: {
      progress: 85,
      controls: { total: 184, passed: 156 },
      issues: 12,
      dueDate: '2024-06-30',
    },
    gdpr: {
      progress: 72,
      controls: { total: 156, passed: 112 },
      issues: 8,
      dueDate: '2024-07-15',
    },
    iso27001: {
      progress: 64,
      controls: { total: 210, passed: 134 },
      issues: 15,
      dueDate: '2024-08-30',
    },
    hipaa: {
      progress: 78,
      controls: { total: 168, passed: 131 },
      issues: 10,
      dueDate: '2024-09-15',
    },
  };

  const currentStats = stats[framework];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Overall Progress</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{currentStats.progress}%</span>
            </div>
            <Progress value={currentStats.progress} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Controls Passed</span>
          </div>
          <span className="text-2xl font-bold">
            {currentStats.controls.passed}/{currentStats.controls.total}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium">Open Issues</span>
          </div>
          <span className="text-2xl font-bold">{currentStats.issues}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Next Due Date</span>
          </div>
          <span className="text-2xl font-bold">
            {new Date(currentStats.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Updates</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Updated security controls documentation (2 days ago)
            </p>
            <p className="text-sm text-muted-foreground">
              • Completed quarterly risk assessment (1 week ago)
            </p>
            <p className="text-sm text-muted-foreground">
              • Updated incident response plan (2 weeks ago)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Annual security training due in 2 weeks
            </p>
            <p className="text-sm text-muted-foreground">
              • Vendor assessment review next month
            </p>
            <p className="text-sm text-muted-foreground">
              • Policy review scheduled for next quarter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}