import { ComplianceFramework } from '@/types/compliance';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

interface ComplianceTimelineProps {
  framework: ComplianceFramework;
}

export function ComplianceTimeline({ framework }: ComplianceTimelineProps) {
  const timelineEvents = [
    {
      date: '2024-03-15',
      type: 'update',
      title: 'Security Policy Updated',
      description: 'Annual review and update of security policies completed',
      icon: FileText,
      iconColor: 'text-blue-500',
    },
    {
      date: '2024-03-10',
      type: 'success',
      title: 'Control CC2.1 Compliant',
      description: 'Risk assessment process documentation approved',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    {
      date: '2024-03-05',
      type: 'warning',
      title: 'New Issue Identified',
      description: 'Change management process needs review',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    {
      date: '2024-03-01',
      type: 'info',
      title: 'Audit Planning Started',
      description: 'Initial planning for Q2 internal audit',
      icon: Clock,
      iconColor: 'text-blue-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Compliance Timeline</h3>
      
      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`mt-1 ${event.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}