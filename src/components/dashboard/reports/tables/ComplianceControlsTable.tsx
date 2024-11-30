import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ComplianceFramework } from '@/types/compliance';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ComplianceControlsTableProps {
  framework: ComplianceFramework;
}

export function ComplianceControlsTable({ framework }: ComplianceControlsTableProps) {
  // Mock data - replace with actual data from your backend
  const controls = [
    {
      id: 'CC1.1',
      title: 'Security Policy and Procedures',
      category: 'Control Environment',
      status: 'compliant',
      lastUpdated: '2024-03-15',
    },
    {
      id: 'CC2.1',
      title: 'Risk Assessment Process',
      category: 'Risk Assessment',
      status: 'in-progress',
      lastUpdated: '2024-03-14',
    },
    {
      id: 'CC3.1',
      title: 'Change Management',
      category: 'Control Activities',
      status: 'non-compliant',
      lastUpdated: '2024-03-13',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'non-compliant':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      compliant: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      'non-compliant': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Control Status Details</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.id}>
              <TableCell className="font-medium">{control.id}</TableCell>
              <TableCell>{control.title}</TableCell>
              <TableCell>{control.category}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(control.status)}
                  {getStatusBadge(control.status)}
                </div>
              </TableCell>
              <TableCell>{control.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}