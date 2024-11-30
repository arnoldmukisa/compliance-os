import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Integration } from '@/types/integrations';
import { useState } from 'react';

interface IntegrationConfigDialogProps {
  integration: Integration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: Record<string, string>) => void;
}

const CONFIG_FIELDS: Record<string, Record<string, { label: string; type: string; placeholder: string }>> = {
  'ms-teams': {
    webhookUrl: {
      label: 'Webhook URL',
      type: 'text',
      placeholder: 'https://outlook.office.com/webhook/...',
    },
    channelId: {
      label: 'Channel ID',
      type: 'text',
      placeholder: 'Enter channel ID',
    },
  },
  'ms-365': {
    tenantId: {
      label: 'Tenant ID',
      type: 'text',
      placeholder: 'Enter your Microsoft 365 tenant ID',
    },
    clientId: {
      label: 'Client ID',
      type: 'text',
      placeholder: 'Enter your application client ID',
    },
    clientSecret: {
      label: 'Client Secret',
      type: 'password',
      placeholder: 'Enter your application client secret',
    },
  },
  digitalocean: {
    apiToken: {
      label: 'API Token',
      type: 'password',
      placeholder: 'Enter your DigitalOcean API token',
    },
    region: {
      label: 'Default Region',
      type: 'text',
      placeholder: 'nyc1',
    },
  },
};

export function IntegrationConfigDialog({ integration, open, onOpenChange, onSave }: IntegrationConfigDialogProps) {
  const [config, setConfig] = useState<Record<string, string>>({});

  if (!integration) return null;

  const fields = CONFIG_FIELDS[integration.id] || {};

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure {integration.name}</DialogTitle>
          <DialogDescription>
            Enter the required configuration details to set up the integration.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(fields).map(([key, field]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {field.label}
              </Label>
              <Input
                id={key}
                type={field.type}
                placeholder={field.placeholder}
                className="col-span-3"
                value={config[key] || ''}
                onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}