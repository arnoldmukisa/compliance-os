import { ComplianceFramework } from '@/types/compliance';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, MinusCircle } from 'lucide-react';

interface ComplianceControlsProps {
  framework: ComplianceFramework;
}

export function ComplianceControls({ framework }: ComplianceControlsProps) {
  const controls = [
    {
      id: 'CC1.1',
      title: 'Security Policy and Procedures',
      category: 'Control Environment',
      status: 'compliant',
      lastUpdated: '2024-03-15',
      assignee: 'John Doe',
    },
    {
      id: 'CC2.1',
      title: 'Risk Assessment Process',
      category: 'Risk Assessment',
      status: 'in-progress',
      lastUpdated: '2024-03-10',
      assignee: 'Jane Smith',
    },
    {
      id: 'CC3.1',
      title: 'Change Management',
      category: 'Control Activities',
      status: 'non-compliant',
      lastUpdated: '2024-03-05',
      assignee: 'Mike Johnson',
    },
    {
      id: 'CC4.1',
      title: 'System Monitoring',
      category: 'Monitoring Activities',
      status: 'not-started',
      lastUpdated: '2024-03-01',
      assignee: 'Sarah Wilson',
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
        return <MinusCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      compliant: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      'non-compliant': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Control Requirements</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Assignee</TableHead>
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
              <TableCell>{new Date(control.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>{control.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}