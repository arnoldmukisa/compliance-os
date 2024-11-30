import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function Overview() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Overall Compliance</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
          <Progress value={85} className="mt-4" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Open Issues</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Controls Passed</p>
              <p className="text-2xl font-bold">156/184</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {/* Task items would go here */}
            <p className="text-sm text-muted-foreground">No upcoming tasks</p>
          </div>
        </Card>
      </div>
    </div>
  );
}