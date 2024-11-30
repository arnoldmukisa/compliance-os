import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload } from 'lucide-react';
import { EvidenceList } from '../evidence/EvidenceList';
import { EvidenceUpload } from '../evidence/EvidenceUpload';
import { EvidenceCollectionJobs } from '../evidence/EvidenceCollectionJobs';
import { EvidenceReview } from '../evidence/review/EvidenceReview';
import { EvidenceAnalytics } from '../evidence/analytics/EvidenceAnalytics';
import { Evidence, EvidenceStatus } from '@/types/evidence';
import { useToast } from '@/hooks/use-toast';

const MOCK_EVIDENCE: Evidence[] = [
  {
    id: '1',
    type: 'document',
    title: 'Security Policy Document',
    description: 'Annual security policy documentation',
    sourceSystem: 'Microsoft 365',
    collectionDate: '2024-03-15T10:00:00Z',
    status: 'approved',
    metadata: {},
    controlIds: ['CC1.1', 'CC1.2'],
    tags: ['policy', 'security'],
  },
  {
    id: '2',
    type: 'configuration',
    title: 'AWS Security Configuration',
    description: 'Security group and IAM settings',
    sourceSystem: 'AWS',
    collectionDate: '2024-03-14T15:30:00Z',
    status: 'pending',
    metadata: {},
    controlIds: ['CC6.1', 'CC6.2'],
    tags: ['configuration', 'aws'],
  },
];

export function EvidenceCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [evidence, setEvidence] = useState<Evidence[]>(MOCK_EVIDENCE);
  const { toast } = useToast();

  const handleDownload = (evidenceId: string) => {
    toast({
      title: 'Download Started',
      description: 'Your evidence file is being downloaded.',
    });
  };

  const handleDelete = (evidenceId: string) => {
    setEvidence(evidence.filter((e) => e.id !== evidenceId));
    toast({
      title: 'Evidence Deleted',
      description: 'The evidence has been deleted successfully.',
    });
  };

  const handleUpdateStatus = (evidenceId: string, status: EvidenceStatus) => {
    setEvidence(
      evidence.map((e) =>
        e.id === evidenceId ? { ...e, status } : e
      )
    );
    toast({
      title: 'Status Updated',
      description: `Evidence status has been updated to ${status}.`,
    });
  };

  const handleBulkAction = (action: string, evidenceIds: string[]) => {
    switch (action) {
      case 'download':
        toast({
          title: 'Bulk Download Started',
          description: `Downloading ${evidenceIds.length} evidence files.`,
        });
        break;
      case 'archive':
        toast({
          title: 'Bulk Archive Started',
          description: `Archiving ${evidenceIds.length} evidence items.`,
        });
        break;
      case 'delete':
        setEvidence(evidence.filter((e) => !evidenceIds.includes(e.id)));
        toast({
          title: 'Bulk Delete Completed',
          description: `${evidenceIds.length} evidence items have been deleted.`,
        });
        break;
    }
  };

  const handleUpload = (
    evidenceData: Omit<Evidence, 'id' | 'status'>,
    file: File
  ) => {
    const newEvidence: Evidence = {
      ...evidenceData,
      id: crypto.randomUUID(),
      status: 'pending',
    };
    setEvidence([newEvidence, ...evidence]);
    toast({
      title: 'Evidence Uploaded',
      description: 'Your evidence has been uploaded successfully.',
    });
  };

  const filteredEvidence = evidence.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Evidence Collection</h1>
        <Button onClick={() => document.getElementById('evidence-upload')?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Evidence
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs defaultValue="collected">
            <TabsList>
              <TabsTrigger value="collected">Collected Evidence</TabsTrigger>
              <TabsTrigger value="upload">Upload Evidence</TabsTrigger>
              <TabsTrigger value="automated">Automated Collection</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="collected" className="mt-6">
              <EvidenceList
                evidence={filteredEvidence}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onUpdateStatus={handleUpdateStatus}
                onBulkAction={handleBulkAction}
              />
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <EvidenceUpload onUpload={handleUpload} />
            </TabsContent>

            <TabsContent value="automated" className="mt-6">
              <EvidenceCollectionJobs />
            </TabsContent>

            <TabsContent value="review" className="mt-6">
              <EvidenceReview />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <EvidenceAnalytics evidence={evidence} />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}