-- Create integration_configs table
CREATE TABLE IF NOT EXISTS integration_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    integration_id VARCHAR(255) NOT NULL,
    config JSONB NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('connected', 'disconnected', 'pending', 'error')) DEFAULT 'disconnected',
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(integration_id, organization_id)
);

-- Create indexes
CREATE INDEX idx_integration_configs_org_id ON integration_configs(organization_id);
CREATE INDEX idx_integration_configs_status ON integration_configs(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_integration_configs_updated_at
    BEFORE UPDATE ON integration_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();