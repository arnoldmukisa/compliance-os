// Update the existing EvidenceCollection component to include the jobs section

// Add this import at the top
import { EvidenceCollectionJobs } from './EvidenceCollectionJobs';

// Add this to the tabs section in the component
<TabsTrigger value="automated">Automated Collection</TabsTrigger>

// Add this to the TabsContent section
<TabsContent value="automated" className="mt-6">
  <EvidenceCollectionJobs />
</TabsContent>