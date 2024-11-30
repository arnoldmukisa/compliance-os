import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Integration, IntegrationCategory } from '@/types/integrations';
import { IntegrationGrid } from '../integrations/IntegrationGrid';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IntegrationConfigDialog } from '../integrations/IntegrationConfigDialog';

const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'ms-teams',
    name: 'Microsoft Teams',
    description: 'Team collaboration and communication platform',
    category: 'communication',
    status: 'disconnected',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
  },
  {
    id: 'ms-365',
    name: 'Microsoft 365',
    description: 'Cloud-based productivity suite',
    category: 'cloud',
    status: 'disconnected',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg',
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    description: 'Cloud infrastructure provider',
    category: 'cloud',
    status: 'disconnected',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg',
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    description: 'Cloud infrastructure and services',
    category: 'cloud',
    status: 'connected',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    lastSync: '2024-03-15T10:30:00Z',
    connectedBy: 'John Doe',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Version control and CI/CD',
    category: 'development',
    status: 'connected',
    icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    lastSync: '2024-03-15T09:45:00Z',
    connectedBy: 'Jane Smith',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and notifications',
    category: 'communication',
    status: 'disconnected',
    icon: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
  },
  {
    id: 'okta',
    name: 'Okta',
    description: 'Identity and access management',
    category: 'identity',
    status: 'connected',
    icon: 'https://www.okta.com/sites/default/files/Okta_Logo_BrightBlue_Medium.png',
    lastSync: '2024-03-15T08:15:00Z',
    connectedBy: 'Mike Johnson',
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Infrastructure monitoring',
    category: 'monitoring',
    status: 'error',
    icon: 'https://imgix.datadoghq.com/img/about/presskit/logo-v/dd_vertical_purple.png',
    lastSync: '2024-03-14T22:10:00Z',
    connectedBy: 'Sarah Wilson',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'Security and CDN services',
    category: 'security',
    status: 'pending',
    icon: 'https://www.cloudflare.com/img/cf-facebook-card.png',
  },
];

const CATEGORIES: { value: IntegrationCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Integrations' },
  { value: 'cloud', label: 'Cloud Services' },
  { value: 'identity', label: 'Identity & Access' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'communication', label: 'Communication' },
  { value: 'security', label: 'Security' },
  { value: 'development', label: 'Development' },
];

export function Integrations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory | 'all'>('all');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const { toast } = useToast();

  const filteredIntegrations = MOCK_INTEGRATIONS.filter((integration) =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (id: string) => {
    const integration = MOCK_INTEGRATIONS.find((i) => i.id === id);
    if (integration) {
      setSelectedIntegration(integration);
      setConfigDialogOpen(true);
    }
  };

  const handleDisconnect = (id: string) => {
    const integration = MOCK_INTEGRATIONS.find((i) => i.id === id);
    if (integration) {
      toast({
        title: 'Integration Disconnected',
        description: `Successfully disconnected from ${integration.name}`,
      });
    }
  };

  const handleConfigure = (id: string) => {
    const integration = MOCK_INTEGRATIONS.find((i) => i.id === id);
    if (integration) {
      setSelectedIntegration(integration);
      setConfigDialogOpen(true);
    }
  };

  const handleSaveConfig = (config: Record<string, string>) => {
    if (selectedIntegration) {
      toast({
        title: 'Configuration Saved',
        description: `Successfully configured ${selectedIntegration.name}`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Integrations</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)}>
            <TabsList className="w-full justify-start">
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6">
              <IntegrationGrid
                integrations={filteredIntegrations}
                category={activeCategory}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onConfigure={handleConfigure}
              />
            </div>
          </Tabs>
        </div>
      </Card>

      <IntegrationConfigDialog
        integration={selectedIntegration}
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={handleSaveConfig}
      />
    </div>
  );
}