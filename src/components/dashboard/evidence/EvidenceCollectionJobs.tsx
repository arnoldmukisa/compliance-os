import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { JobList } from './jobs/JobList';
import { JobScheduler } from './jobs/JobScheduler';
import { JobConfiguration } from './jobs/JobConfiguration';
import { JobHistory } from './jobs/JobHistory';
import { JobHistoryDetails } from './jobs/JobHistoryDetails';

interface CollectionJob {
  id: string;
  integrationId: string;
  schedule: string;
  collectionType: string;
  configuration: Record<string, any>;
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused';
}

interface JobExecutionLog {
  id: string;
  jobId: string;
  integrationId: string;
  startTime: string;
  endTime: string;
  status: 'success' | 'failed' | 'partial';
  itemsCollected: number;
  errorMessage?: string;
  details?: {
    phase: string;
    message: string;
    timestamp: string;
  }[];
}

const MOCK_JOBS: CollectionJob[] = [
  {
    id: '1',
    integrationId: 'ms-365',
    schedule: '0 0 * * *',
    collectionType: 'document-policies',
    configuration: {
      documentTypes: ['security-policies', 'procedures'],
      folderPath: '/compliance/policies',
    },
    lastRun: '2024-03-15T00:00:00Z',
    nextRun: '2024-03-16T00:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    integrationId: 'aws',
    schedule: '0 */6 * * *',
    collectionType: 'security-config',
    configuration: {
      services: ['iam', 'cloudtrail', 'config'],
      regions: ['us-east-1'],
    },
    lastRun: '2024-03-15T12:00:00Z',
    nextRun: '2024-03-15T18:00:00Z',
    status: 'active',
  },
];

const MOCK_LOGS: JobExecutionLog[] = [
  {
    id: '1',
    jobId: '1',
    integrationId: 'ms-365',
    startTime: '2024-03-15T00:00:00Z',
    endTime: '2024-03-15T00:05:00Z',
    status: 'success',
    itemsCollected: 15,
    details: [
      {
        phase: 'Initialization',
        message: 'Starting document collection',
        timestamp: '2024-03-15T00:00:00Z',
      },
      {
        phase: 'Processing',
        message: 'Collected 15 policy documents',
        timestamp: '2024-03-15T00:04:30Z',
      },
      {
        phase: 'Completion',
        message: 'Successfully completed collection',
        timestamp: '2024-03-15T00:05:00Z',
      },
    ],
  },
  {
    id: '2',
    jobId: '2',
    integrationId: 'aws',
    startTime: '2024-03-15T12:00:00Z',
    endTime: '2024-03-15T12:02:00Z',
    status: 'partial',
    itemsCollected: 8,
    errorMessage: 'Some services were not accessible',
    details: [
      {
        phase: 'Initialization',
        message: 'Starting AWS configuration collection',
        timestamp: '2024-03-15T12:00:00Z',
      },
      {
        phase: 'Warning',
        message: 'Failed to access SecurityHub',
        timestamp: '2024-03-15T12:01:30Z',
      },
      {
        phase: 'Completion',
        message: 'Completed with partial success',
        timestamp: '2024-03-15T12:02:00Z',
      },
    ],
  },
];

export function EvidenceCollectionJobs() {
  const [jobs, setJobs] = useState<CollectionJob[]>(MOCK_JOBS);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');
  const [jobSchedule, setJobSchedule] = useState<string>('');
  const [selectedLog, setSelectedLog] = useState<JobExecutionLog | null>(null);
  const [historyDetailsOpen, setHistoryDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateJob = (config: Record<string, any>) => {
    const newJob: CollectionJob = {
      id: crypto.randomUUID(),
      integrationId: selectedIntegration,
      schedule: jobSchedule,
      collectionType: 'document-policies',
      configuration: config,
      status: 'active',
    };

    setJobs([...jobs, newJob]);
    setCreateDialogOpen(false);
    toast({
      title: 'Collection Job Created',
      description: 'The automated evidence collection job has been created.',
    });
  };

  const handleToggleJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? { ...job, status: job.status === 'active' ? 'paused' : 'active' }
          : job
      )
    );

    toast({
      title: 'Job Status Updated',
      description: `The collection job has been ${
        jobs.find((j) => j.id === jobId)?.status === 'active' ? 'paused' : 'resumed'
      }.`,
    });
  };

  const handleConfigureJob = (jobId: string) => {
    toast({
      title: 'Not Implemented',
      description: 'Job configuration will be implemented in the next iteration.',
    });
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    toast({
      title: 'Job Deleted',
      description: 'The collection job has been deleted.',
    });
  };

  const handleViewLogDetails = (logId: string) => {
    const log = MOCK_LOGS.find((l) => l.id === logId);
    if (log) {
      setSelectedLog(log);
      setHistoryDetailsOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Automated Collection Jobs</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <JobList
            jobs={jobs}
            onToggleJob={handleToggleJob}
            onConfigureJob={handleConfigureJob}
            onDeleteJob={handleDeleteJob}
          />
        </TabsContent>

        <TabsContent value="history">
          <JobHistory logs={MOCK_LOGS} onViewDetails={handleViewLogDetails} />
        </TabsContent>
      </Tabs>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Collection Job</DialogTitle>
            <DialogDescription>
              Configure automated evidence collection from an integration.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="integration" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="integration" className="space-y-4">
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {['ms-365', 'aws'].map((integration) => (
                    <Card
                      key={integration}
                      className={`p-4 cursor-pointer ${
                        selectedIntegration === integration
                          ? 'border-primary'
                          : ''
                      }`}
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <h3 className="font-semibold">{integration}</h3>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <JobScheduler onSchedule={setJobSchedule} />
            </TabsContent>

            <TabsContent value="configuration" className="space-y-4">
              <JobConfiguration
                integrationId={selectedIntegration}
                onSave={handleCreateJob}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <JobHistoryDetails
        log={selectedLog}
        open={historyDetailsOpen}
        onOpenChange={setHistoryDetailsOpen}
      />
    </div>
  );
}