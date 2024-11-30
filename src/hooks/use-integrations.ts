import { useState, useCallback } from 'react';
import { Integration } from '@/types/integrations';
import { IntegrationManager, IntegrationConfig } from '@/lib/services/integration-service';

// TODO: Replace with actual organization ID from auth context
const ORGANIZATION_ID = 'default-org';
const integrationManager = new IntegrationManager(ORGANIZATION_ID);

export function useIntegrations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (integration: Integration, config: IntegrationConfig) => {
    setLoading(true);
    setError(null);
    try {
      await integrationManager.connect(integration.id, config);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async (integrationId: string) => {
    setLoading(true);
    setError(null);
    try {
      await integrationManager.disconnect(integrationId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sync = useCallback(async (integrationId: string) => {
    setLoading(true);
    setError(null);
    try {
      await integrationManager.sync(integrationId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatus = useCallback(async (integrationId: string) => {
    try {
      return await integrationManager.getStatus(integrationId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    connect,
    disconnect,
    sync,
    getStatus,
  };
}