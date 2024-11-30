import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface JobConfigurationProps {
  integrationId: string;
  onSave: (config: Record<string, any>) => void;
}

export function JobConfiguration({ integrationId, onSave }: JobConfigurationProps) {
  const [config, setConfig] = useState<Record<string, any>>({});

  const renderConfigFields = () => {
    switch (integrationId) {
      case 'ms-365':
        return (
          <>
            <div className="space-y-2">
              <Label>Document Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="policies"
                    checked={config.documentTypes?.includes('policies')}
                    onCheckedChange={(checked) => {
                      const types = new Set(config.documentTypes || []);
                      checked ? types.add('policies') : types.delete('policies');
                      setConfig({ ...config, documentTypes: Array.from(types) });
                    }}
                  />
                  <Label htmlFor="policies">Security Policies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="procedures"
                    checked={config.documentTypes?.includes('procedures')}
                    onCheckedChange={(checked) => {
                      const types = new Set(config.documentTypes || []);
                      checked ? types.add('procedures') : types.delete('procedures');
                      setConfig({ ...config, documentTypes: Array.from(types) });
                    }}
                  />
                  <Label htmlFor="procedures">Procedures</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Folder Path</Label>
              <Input
                value={config.folderPath || ''}
                onChange={(e) => setConfig({ ...config, folderPath: e.target.value })}
                placeholder="/compliance/policies"
              />
            </div>
          </>
        );

      case 'aws':
        return (
          <>
            <div className="space-y-2">
              <Label>Services</Label>
              <div className="space-y-2">
                {['IAM', 'CloudTrail', 'Config', 'SecurityHub'].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={config.services?.includes(service.toLowerCase())}
                      onCheckedChange={(checked) => {
                        const services = new Set(config.services || []);
                        checked
                          ? services.add(service.toLowerCase())
                          : services.delete(service.toLowerCase());
                        setConfig({ ...config, services: Array.from(services) });
                      }}
                    />
                    <Label htmlFor={service}>{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Select
                value={config.region || ''}
                onValueChange={(value) => setConfig({ ...config, region: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return (
          <p className="text-sm text-muted-foreground">
            No configuration options available for this integration.
          </p>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderConfigFields()}
      <Button onClick={() => onSave(config)} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
}