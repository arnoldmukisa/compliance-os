import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Upload } from 'lucide-react';
import { QuestionnaireList } from '../questionnaire/QuestionnaireList';
import { QuestionBank } from '../questionnaire/QuestionBank';
import { CreateQuestionnaireDialog } from '../questionnaire/CreateQuestionnaireDialog';
import { ImportQuestionnaireDialog } from '../questionnaire/ImportQuestionnaireDialog';

export function Questionnaires() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Questionnaires</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questionnaires and questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs defaultValue="questionnaires">
            <TabsList>
              <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
              <TabsTrigger value="question-bank">Question Bank</TabsTrigger>
            </TabsList>

            <TabsContent value="questionnaires" className="mt-6">
              <QuestionnaireList searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="question-bank" className="mt-6">
              <QuestionBank searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      <CreateQuestionnaireDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <ImportQuestionnaireDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />
    </div>
  );
}