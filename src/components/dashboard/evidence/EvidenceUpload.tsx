import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Evidence, EvidenceType } from '@/types/evidence';

interface EvidenceUploadProps {
  onUpload: (evidence: Omit<Evidence, 'id' | 'status'>, file: File) => void;
}

export function EvidenceUpload({ onUpload }: EvidenceUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EvidenceType>('document');
  const [sourceSystem, setSourceSystem] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [controlIds, setControlIds] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const evidence: Omit<Evidence, 'id' | 'status'> = {
      title,
      description,
      type,
      sourceSystem,
      collectionDate: new Date().toISOString(),
      controlIds,
      tags,
      metadata: {},
    };

    onUpload(evidence, file);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as EvidenceType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="screenshot">Screenshot</SelectItem>
              <SelectItem value="log">Log</SelectItem>
              <SelectItem value="configuration">Configuration</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Source System</Label>
          <Input
            id="source"
            value={sourceSystem}
            onChange={(e) => setSourceSystem(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Evidence File</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <Button type="button" variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button type="submit" disabled={!file}>
          Upload Evidence
        </Button>
      </form>
    </Card>
  );
}