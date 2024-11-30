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
import { Textarea } from '@/components/ui/textarea';
import { QuestionCategory } from '@/types/questionnaire';
import { useState } from 'react';

interface CreateQuestionnaireDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateQuestionnaireDialog({
  open,
  onOpenChange,
}: CreateQuestionnaireDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<QuestionCategory[]>([]);

  const handleCreate = () => {
    // TODO: Implement questionnaire creation
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Questionnaire</DialogTitle>
          <DialogDescription>
            Create a new questionnaire template for compliance assessments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>
            Create Questionnaire
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}