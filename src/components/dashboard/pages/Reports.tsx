import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceStatusReport } from '../reports/ComplianceStatusReport';
import { EvidenceCollectionReport } from '../reports/EvidenceCollectionReport';
import { AuditTrailReport } from '../reports/AuditTrailReport';
import { ReportScheduler } from '../reports/ReportScheduler';

export function Reports() {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <ReportScheduler />
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
            <TabsTrigger value="evidence">Evidence Collection</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="mt-6">
            <ComplianceStatusReport />
          </TabsContent>

          <TabsContent value="evidence" className="mt-6">
            <EvidenceCollectionReport />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditTrailReport />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}