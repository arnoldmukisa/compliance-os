import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Evidence } from '@/types/evidence';

interface EvidenceControlCoverageProps {
  evidence: Evidence[];
}

export function EvidenceControlCoverage({ evidence }: EvidenceControlCoverageProps) {
  const controlCoverage = evidence.reduce((acc, e) => {
    e.controlIds.forEach((controlId) => {
      if (!acc[controlId]) {
        acc[controlId] = {
          total: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
        };
      }
      acc[controlId].total += 1;
      acc[controlId][e.status] += 1;
    });
    return acc;
  }, {} as Record<string, { total: number; approved: number; pending: number; rejected: number }>);

  const coverageData = Object.entries(controlCoverage).map(([controlId, stats]) => ({
    controlId,
    ...stats,
    coverage: (stats.approved / stats.total) * 100,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Control Coverage Analysis</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead>Total Evidence</TableHead>
            <TableHead>Status Distribution</TableHead>
            <TableHead>Coverage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coverageData.map((control) => (
            <TableRow key={control.controlId}>
              <TableCell className="font-medium">{control.controlId}</TableCell>
              <TableCell>{control.total}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Badge variant="secondary">
                    {control.approved} Approved
                  </Badge>
                  <Badge variant="outline">
                    {control.pending} Pending
                  </Badge>
                  <Badge variant="destructive">
                    {control.rejected} Rejected
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Progress value={control.coverage} className="h-2" />
                  <span className="text-sm text-muted-foreground">
                    {control.coverage.toFixed(1)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}