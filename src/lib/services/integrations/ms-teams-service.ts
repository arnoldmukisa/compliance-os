import { IntegrationService, IntegrationConfig } from '../integration-service';
import { Integration } from '@/types/integrations';

export class MSTeamsService implements IntegrationService {
  private webhookUrl?: string;
  private channelId?: string;
  private connected: boolean = false;

  async connect(config: IntegrationConfig): Promise<void> {
    const { webhookUrl, channelId } = config;
    
    try {
      // Validate webhook URL
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'message',
          text: 'Compliance OS: Testing webhook connection',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to MS Teams webhook');
      }

      this.webhookUrl = webhookUrl;
      this.channelId = channelId;
      this.connected = true;
    } catch (error) {
      throw new Error(`Failed to connect to MS Teams: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    this.webhookUrl = undefined;
    this.channelId = undefined;
    this.connected = false;
  }

  async validateConfig(config: IntegrationConfig): Promise<boolean> {
    const { webhookUrl, channelId } = config;
    return Boolean(webhookUrl && webhookUrl.startsWith('https://') && channelId);
  }

  async getStatus(): Promise<Integration['status']> {
    return this.connected ? 'connected' : 'disconnected';
  }

  async sync(): Promise<void> {
    if (!this.connected) {
      throw new Error('MS Teams is not connected');
    }

    // Implement sync logic here
    // For example, sync compliance notifications or updates
  }

  async sendNotification(message: string): Promise<void> {
    if (!this.connected || !this.webhookUrl) {
      throw new Error('MS Teams is not connected');
    }

    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'message',
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification to MS Teams');
    }
  }
}