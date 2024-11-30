import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ComplianceControl } from '@/types/compliance';
import { Evidence } from '@/types/evidence';
import { EvidenceMapping } from '@/types/evidence-mapping';
import { EvidenceControlMapping } from '../evidence/EvidenceControlMapping';
import { useToast } from '@/hooks/use-toast';

const MOCK_CONTROLS: ComplianceControl[] = [
  {
    id: 'CC1.1',
    framework: 'soc2',
    category: 'Control Environment',
    title: 'Security Policy and Procedures',
    description: 'The entity has defined and documented security policies and procedures.',
    status: 'compliant',
    lastUpdated: '2024-03-15T10:00:00Z',
  },
  {
    id: 'CC2.1',
    framework: 'soc2',
    category: 'Risk Assessment',
    title: 'Risk Assessment Process',
    description: 'The entity has a risk assessment process to identify and manage risks.',
    status: 'in-progress',
    lastUpdated: '2024-03-14T15:30:00Z',
  },
];

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
    controlIds: ['CC1.1'],
    tags: ['policy', 'security'],
  },
  {
    id: '2',
    type: 'configuration',
    title: 'Risk Assessment Report',
    description: 'Quarterly risk assessment documentation',
    sourceSystem: 'Internal',
    collectionDate: '2024-03-14T15:30:00Z',
    status: 'approved',
    metadata: {},
    controlIds: ['CC2.1'],
    tags: ['risk', 'assessment'],
  },
];

const MOCK_MAPPINGS: EvidenceMapping[] = [
  {
    id: '1',
    evidenceId: '1',
    controlId: 'CC1.1',
    mappingType: 'primary',
    justification: 'This document directly defines our security policies.',
    mappedBy: 'John Doe',
    mappedAt: '2024-03-15T10:30:00Z',
    status: 'active',
  },
];

export function EvidenceMappingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [controls] = useState<ComplianceControl[]>(MOCK_CONTROLS);
  const [evidence] = useState<Evidence[]>(MOCK_EVIDENCE);
  const [mappings, setMappings] = useState<EvidenceMapping[]>(MOCK_MAPPINGS);
  const { toast } = useToast();

  const handleMapEvidence = (mapping: Omit<EvidenceMapping, 'id' | 'mappedAt'>) => {
    const newMapping: EvidenceMapping = {
      ...mapping,
      id: crypto.randomUUID(),
      mappedAt: new Date().toISOString(),
    };
    setMappings([...mappings, newMapping]);
    toast({
      title: 'Evidence Mapped',
      description: 'Evidence has been successfully mapped to the control.',
    });
  };

  const handleUnmapEvidence = (mappingId: string) => {
    setMappings(mappings.filter((m) => m.id !== mappingId));
    toast({
      title: 'Evidence Unmapped',
      description: 'Evidence has been removed from the control mapping.',
    });
  };

  const filteredControls = controls.filter(
    (control) =>
      control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      control.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      control.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Evidence Mapping</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search controls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="space-y-6">
            {filteredControls.map((control) => (
              <Card key={control.id} className="p-6">
                <EvidenceControlMapping
                  control={control}
                  evidence={evidence}
                  mappings={mappings.filter((m) => m.controlId === control.id)}
                  onMapEvidence={handleMapEvidence}
                  onUnmapEvidence={handleUnmapEvidence}
                />
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}