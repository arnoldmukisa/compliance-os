import { Integration, IntegrationCategory } from '@/types/integrations';
import { IntegrationCard } from './IntegrationCard';

interface IntegrationGridProps {
  integrations: Integration[];
  category: IntegrationCategory | 'all';
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onConfigure: (id: string) => void;
}

export function IntegrationGrid({
  integrations,
  category,
  onConnect,
  onDisconnect,
  onConfigure,
}: IntegrationGridProps) {
  const filteredIntegrations =
    category === 'all'
      ? integrations
      : integrations.filter((integration) => integration.category === category);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredIntegrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
          onConfigure={onConfigure}
        />
      ))}
    </div>
  );
}