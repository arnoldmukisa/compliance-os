import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

interface EvidenceCollectionTableProps {
  dateRange: [Date, Date];
}

export function EvidenceCollectionTable({ dateRange }: EvidenceCollectionTableProps) {
  // Mock data - replace with actual data from your backend
  const evidence = [
    {
      id: '1',
      title: 'Security Policy Document',
      type: 'document',
      collectionDate: '2024-03-15',
      status: 'approved',
      source: 'Microsoft 365',
    },
    {
      id: '2',
      title: 'Access Control Configuration',
      type: 'configuration',
      collectionDate: '2024-03-14',
      status: 'rejected',
      source: 'AWS',
    },
    {
      id: '3',
      title: 'Incident Response Log',
      type: 'log',
      collectionDate: '2024-03-13',
      status: 'approved',
      source: 'Splunk',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Evidence Collection Details</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Collection Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evidence.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{item.type}</Badge>
              </TableCell>
              <TableCell>{item.source}</TableCell>
              <TableCell>{item.collectionDate}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {item.status === 'approved' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <Badge
                    variant={item.status === 'approved' ? 'default' : 'destructive'}
                  >
                    {item.status}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}