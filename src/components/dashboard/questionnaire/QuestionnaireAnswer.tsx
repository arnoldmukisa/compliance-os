import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Question, QuestionnaireResponse } from '@/types/questionnaire';
import { ChevronLeft, ChevronRight, Save, Send, Paperclip } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuestionnaireAnswerProps {
  questions: Question[];
  templateId: string;
  onSave: (response: QuestionnaireResponse) => void;
  onSubmit: (response: QuestionnaireResponse) => void;
  onClose: () => void;
}

export function QuestionnaireAnswer({
  questions,
  templateId,
  onSave,
  onSubmit,
  onClose,
}: QuestionnaireAnswerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<Record<string, File[]>>({});
  const { toast } = useToast();

  const currentQuestion = questions[currentIndex];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleAttachment = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setAttachments({
      ...attachments,
      [currentQuestion.id]: [...(attachments[currentQuestion.id] || []), ...newFiles],
    });
  };

  const handleSave = () => {
    const response: QuestionnaireResponse = {
      id: crypto.randomUUID(),
      templateId,
      answers,
      status: 'draft',
    };
    onSave(response);
    toast({
      title: 'Progress Saved',
      description: 'Your answers have been saved as a draft.',
    });
  };

  const handleSubmit = () => {
    const response: QuestionnaireResponse = {
      id: crypto.randomUUID(),
      templateId,
      answers,
      status: 'submitted',
      submittedBy: 'Current User', // TODO: Get from auth context
      submittedAt: new Date().toISOString(),
    };
    onSubmit(response);
    toast({
      title: 'Questionnaire Submitted',
      description: 'Your answers have been submitted successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onClose}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Questionnaires
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{currentQuestion.category}</Badge>
              {currentQuestion.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="ml-2">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
          </div>

          <Textarea
            placeholder="Enter your answer here..."
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="min-h-[200px]"
          />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                <Paperclip className="mr-2 h-4 w-4" />
                Attach Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleAttachment(e.target.files)}
              />
            </div>
            {attachments[currentQuestion.id]?.map((file, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                {file.name}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}