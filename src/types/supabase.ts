export interface Database {
  public: {
    Tables: {
      integration_configs: {
        Row: {
          id: string;
          integration_id: string;
          config: Record<string, string>;
          created_at: string;
          updated_at: string;
          organization_id: string;
          status: 'connected' | 'disconnected' | 'pending' | 'error';
          last_sync: string | null;
        };
        Insert: {
          id?: string;
          integration_id: string;
          config: Record<string, string>;
          organization_id: string;
          status?: 'connected' | 'disconnected' | 'pending' | 'error';
          last_sync?: string | null;
        };
        Update: {
          config?: Record<string, string>;
          status?: 'connected' | 'disconnected' | 'pending' | 'error';
          last_sync?: string | null;
        };
      };
    };
  };
}