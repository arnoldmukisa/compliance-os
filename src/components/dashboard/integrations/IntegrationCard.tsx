import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Integration } from '@/types/integrations';
import { Power, RefreshCw, Settings2 } from 'lucide-react';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onConfigure: (id: string) => void;
}

export function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
  onConfigure,
}: IntegrationCardProps) {
  const getStatusBadge = (status: Integration['status']) => {
    const variants = {
      connected: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      disconnected: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
      pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10">
            <img
              src={integration.icon}
              alt={integration.name}
              className="h-8 w-8"
            />
          </div>
          <div>
            <h3 className="font-semibold">{integration.name}</h3>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
          </div>
        </div>
        {getStatusBadge(integration.status)}
      </div>

      <div className="mt-6 space-y-2">
        {integration.lastSync && (
          <p className="text-sm text-muted-foreground">
            Last synced: {new Date(integration.lastSync).toLocaleString()}
          </p>
        )}
        {integration.connectedBy && (
          <p className="text-sm text-muted-foreground">
            Connected by: {integration.connectedBy}
          </p>
        )}
      </div>

      <div className="mt-6 flex space-x-2">
        {integration.status === 'connected' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect(integration.id)}
            >
              <Power className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onConfigure(integration.id)}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Configure
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => onConnect(integration.id)}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Connect
          </Button>
        )}
      </div>
    </Card>
  );
}