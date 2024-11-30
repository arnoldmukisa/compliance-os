import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Evidence } from '@/types/evidence';
import { FileCheck, AlertTriangle, Clock, Database } from 'lucide-react';
import { EvidenceStatusChart } from './EvidenceStatusChart';
import { EvidenceTypeDistribution } from './EvidenceTypeDistribution';
import { EvidenceTimeline } from './EvidenceTimeline';
import { EvidenceControlCoverage } from './EvidenceControlCoverage';

interface EvidenceAnalyticsProps {
  evidence: Evidence[];
}

export function EvidenceAnalytics({ evidence }: EvidenceAnalyticsProps) {
  const totalEvidence = evidence.length;
  const approvedEvidence = evidence.filter((e) => e.status === 'approved').length;
  const pendingEvidence = evidence.filter((e) => e.status === 'pending').length;
  const rejectedEvidence = evidence.filter((e) => e.status === 'rejected').length;

  const approvalRate = (approvedEvidence / totalEvidence) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Total Evidence</span>
          </div>
          <p className="text-2xl font-bold mt-2">{totalEvidence}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Approved</span>
          </div>
          <p className="text-2xl font-bold mt-2">{approvedEvidence}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Pending Review</span>
          </div>
          <p className="text-2xl font-bold mt-2">{pendingEvidence}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium">Rejected</span>
          </div>
          <p className="text-2xl font-bold mt-2">{rejectedEvidence}</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Evidence Approval Rate</h3>
            <Progress value={approvalRate} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {approvalRate.toFixed(1)}% of evidence has been approved
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <EvidenceStatusChart evidence={evidence} />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <EvidenceTypeDistribution evidence={evidence} />
        </Card>
        <Card className="p-6">
          <EvidenceTimeline evidence={evidence} />
        </Card>
      </div>

      <Card className="p-6">
        <EvidenceControlCoverage evidence={evidence} />
      </Card>
    </div>
  );
}