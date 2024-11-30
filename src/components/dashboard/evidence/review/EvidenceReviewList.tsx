import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Evidence } from '@/types/evidence';
import { FileText, Image, Database, FileBarChart } from 'lucide-react';

interface EvidenceReviewListProps {
  evidence: Evidence[];
  selectedId: string | undefined;
  onSelect: (evidence: Evidence) => void;
}

export function EvidenceReviewList({
  evidence,
  selectedId,
  onSelect,
}: EvidenceReviewListProps) {
  const getTypeIcon = (type: Evidence['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'screenshot':
        return <Image className="h-4 w-4" />;
      case 'configuration':
        return <Database className="h-4 w-4" />;
      case 'report':
        return <FileBarChart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Evidence Queue</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evidence.map((item) => (
            <TableRow
              key={item.id}
              className={`cursor-pointer hover:bg-muted/50 ${
                selectedId === item.id ? 'bg-muted' : ''
              }`}
              onClick={() => onSelect(item)}
            >
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.sourceSystem}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}