import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Evidence, EvidenceStatus } from '@/types/evidence';
import { FileText, Download, Trash2, CheckCircle, XCircle, Clock, MoreHorizontal, Archive } from 'lucide-react';

interface EvidenceListProps {
  evidence: Evidence[];
  onDownload: (evidenceId: string) => void;
  onDelete: (evidenceId: string) => void;
  onUpdateStatus: (evidenceId: string, status: EvidenceStatus) => void;
  onBulkAction: (action: string, evidenceIds: string[]) => void;
}

export function EvidenceList({
  evidence,
  onDownload,
  onDelete,
  onUpdateStatus,
  onBulkAction,
}: EvidenceListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? evidence.map(e => e.id) : []);
  };

  const handleSelectItem = (evidenceId: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked 
        ? [...prev, evidenceId]
        : prev.filter(id => id !== evidenceId)
    );
  };

  const getStatusIcon = (status: EvidenceStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'expired':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: EvidenceStatus) => {
    const variants = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
          <span className="text-sm">
            {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('download', selectedItems)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('archive', selectedItems)}
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkAction('delete', selectedItems)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedItems.length === evidence.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Collection Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evidence.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{item.type}</Badge>
              </TableCell>
              <TableCell>{item.sourceSystem}</TableCell>
              <TableCell>
                {new Date(item.collectionDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  {getStatusBadge(item.status)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDownload(item.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUpdateStatus(item.id, 'approved')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(item.id, 'rejected')}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(item.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}