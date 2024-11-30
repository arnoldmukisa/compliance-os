import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Link, Unlink, FileText } from 'lucide-react';
import { Evidence } from '@/types/evidence';
import { ComplianceControl } from '@/types/compliance';
import { EvidenceMapping } from '@/types/evidence-mapping';

interface EvidenceControlMappingProps {
  control: ComplianceControl;
  evidence: Evidence[];
  mappings: EvidenceMapping[];
  onMapEvidence: (mapping: Omit<EvidenceMapping, 'id' | 'mappedAt'>) => void;
  onUnmapEvidence: (mappingId: string) => void;
}

export function EvidenceControlMapping({
  control,
  evidence,
  mappings,
  onMapEvidence,
  onUnmapEvidence,
}: EvidenceControlMappingProps) {
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [justification, setJustification] = useState('');
  const [mappingType, setMappingType] = useState<'primary' | 'secondary'>('primary');
  const { toast } = useToast();

  const handleMap = () => {
    if (!selectedEvidence) return;

    onMapEvidence({
      evidenceId: selectedEvidence.id,
      controlId: control.id,
      mappingType,
      justification,
      mappedBy: 'Current User', // TODO: Get from auth context
      status: 'active',
    });

    setMapDialogOpen(false);
    setSelectedEvidence(null);
    setJustification('');
    setMappingType('primary');

    toast({
      title: 'Evidence Mapped',
      description: 'Evidence has been successfully mapped to the control.',
    });
  };

  const handleUnmap = (mappingId: string) => {
    onUnmapEvidence(mappingId);
    toast({
      title: 'Evidence Unmapped',
      description: 'Evidence has been removed from the control mapping.',
    });
  };

  const unmappedEvidence = evidence.filter(
    (e) => !mappings.some((m) => m.evidenceId === e.id && m.status === 'active')
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{control.title}</h3>
          <p className="text-sm text-muted-foreground">{control.description}</p>
        </div>
        <Button onClick={() => setMapDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Map Evidence
        </Button>
      </div>

      <div className="space-y-4">
        {mappings
          .filter((m) => m.status === 'active')
          .map((mapping) => {
            const mappedEvidence = evidence.find((e) => e.id === mapping.evidenceId);
            if (!mappedEvidence) return null;

            return (
              <Card key={mapping.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <FileText className="h-5 w-5 mt-1" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{mappedEvidence.title}</h4>
                        <Badge variant="outline">{mapping.mappingType}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mapping.justification}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                        <span>Mapped by {mapping.mappedBy}</span>
                        <span>•</span>
                        <span>{new Date(mapping.mappedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUnmap(mapping.id)}
                  >
                    <Unlink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>

      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Map Evidence to Control</DialogTitle>
            <DialogDescription>
              Select evidence and provide justification for mapping to {control.id}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Evidence</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedEvidence?.id || ''}
                onChange={(e) => {
                  const selected = evidence.find((ev) => ev.id === e.target.value);
                  setSelectedEvidence(selected || null);
                }}
              >
                <option value="">Select evidence...</option>
                {unmappedEvidence.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Mapping Type</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={mappingType}
                onChange={(e) => setMappingType(e.target.value as 'primary' | 'secondary')}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Justification</Label>
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Explain how this evidence supports the control..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMap} disabled={!selectedEvidence || !justification}>
              Map Evidence
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}