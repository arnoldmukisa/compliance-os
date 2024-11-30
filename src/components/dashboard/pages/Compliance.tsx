import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceFramework } from '@/types/compliance';
import { ComplianceOverview } from '../compliance/ComplianceOverview';
import { ComplianceControls } from '../compliance/ComplianceControls';
import { ComplianceTimeline } from '../compliance/ComplianceTimeline';

export function Compliance() {
  const [activeFramework, setActiveFramework] = useState<ComplianceFramework>('soc2');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance Management</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <div className="mb-6">
            <select
              value={activeFramework}
              onChange={(e) => setActiveFramework(e.target.value as ComplianceFramework)}
              className="w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="soc2">SOC 2</option>
              <option value="gdpr">GDPR</option>
              <option value="iso27001">ISO 27001</option>
              <option value="hipaa">HIPAA</option>
            </select>
          </div>

          <TabsContent value="overview" className="mt-0">
            <ComplianceOverview framework={activeFramework} />
          </TabsContent>

          <TabsContent value="controls" className="mt-0">
            <ComplianceControls framework={activeFramework} />
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <ComplianceTimeline framework={activeFramework} />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}