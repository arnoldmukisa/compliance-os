import { IntegrationService, IntegrationConfig } from '../integration-service';
import { Integration } from '@/types/integrations';

export class DigitalOceanService implements IntegrationService {
  private apiToken?: string;
  private region?: string;
  private connected: boolean = false;

  async connect(config: IntegrationConfig): Promise<void> {
    const { apiToken, region } = config;

    try {
      // Test the API token by making a request to the DigitalOcean API
      const response = await fetch('https://api.digitalocean.com/v2/account', {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid API token');
      }

      this.apiToken = apiToken;
      this.region = region;
      this.connected = true;
    } catch (error) {
      throw new Error(`Failed to connect to DigitalOcean: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    this.apiToken = undefined;
    this.region = undefined;
    this.connected = false;
  }

  async validateConfig(config: IntegrationConfig): Promise<boolean> {
    const { apiToken, region } = config;
    return Boolean(apiToken && region);
  }

  async getStatus(): Promise<Integration['status']> {
    return this.connected ? 'connected' : 'disconnected';
  }

  async sync(): Promise<void> {
    if (!this.connected || !this.apiToken) {
      throw new Error('DigitalOcean is not connected');
    }

    try {
      // Fetch and sync relevant compliance data
      const resources = await Promise.all([
        this.getDroplets(),
        this.getFirewalls(),
        this.getLoadBalancers(),
      ]);

      // Process and store the compliance-related data
    } catch (error) {
      throw new Error(`Failed to sync with DigitalOcean: ${error.message}`);
    }
  }

  // Additional DigitalOcean-specific methods for compliance automation
  private async getDroplets(): Promise<any[]> {
    const response = await fetch('https://api.digitalocean.com/v2/droplets', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch droplets');
    }

    const data = await response.json();
    return data.droplets;
  }

  private async getFirewalls(): Promise<any[]> {
    const response = await fetch('https://api.digitalocean.com/v2/firewalls', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch firewalls');
    }

    const data = await response.json();
    return data.firewalls;
  }

  private async getLoadBalancers(): Promise<any[]> {
    const response = await fetch('https://api.digitalocean.com/v2/load_balancers', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch load balancers');
    }

    const data = await response.json();
    return data.load_balancers;
  }
}