import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImportQuestionnaireDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportQuestionnaireDialog({
  open,
  onOpenChange,
}: ImportQuestionnaireDialogProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleImport = () => {
    // TODO: Implement questionnaire import
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Questionnaire</DialogTitle>
          <DialogDescription>
            Import an existing questionnaire from a CSV or Excel file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="questionnaire-file">Questionnaire File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="questionnaire-file"
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleImport} disabled={!file}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}