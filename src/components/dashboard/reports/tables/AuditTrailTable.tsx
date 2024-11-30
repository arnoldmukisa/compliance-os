import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Settings, UserCircle } from 'lucide-react';

interface AuditTrailTableProps {
  searchQuery: string;
  dateRange: [Date, Date];
}

export function AuditTrailTable({ searchQuery, dateRange }: AuditTrailTableProps) {
  // Mock data - replace with actual data from your backend
  const auditLogs = [
    {
      id: '1',
      action: 'Evidence Upload',
      user: 'John Doe',
      timestamp: '2024-03-15 10:30:00',
      details: 'Uploaded security policy document',
      category: 'evidence',
    },
    {
      id: '2',
      action: 'Control Update',
      user: 'Jane Smith',
      timestamp: '2024-03-15 09:45:00',
      details: 'Updated CC1.1 control status',
      category: 'control',
    },
    {
      id: '3',
      action: 'User Login',
      user: 'Mike Johnson',
      timestamp: '2024-03-15 09:00:00',
      details: 'Successful login from 192.168.1.1',
      category: 'user',
    },
  ];

  const getActionIcon = (category: string) => {
    switch (category) {
      case 'evidence':
        return <FileText className="h-4 w-4" />;
      case 'control':
        return <Settings className="h-4 w-4" />;
      case 'user':
        return <UserCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Audit Trail</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getActionIcon(log.category)}
                  <span>{log.action}</span>
                </div>
              </TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}