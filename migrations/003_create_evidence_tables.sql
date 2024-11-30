-- Create evidence table
CREATE TABLE IF NOT EXISTS evidence (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) CHECK (type IN ('document', 'screenshot', 'log', 'configuration', 'report', 'other')) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    source_system VARCHAR(255) NOT NULL,
    collection_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiration_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'rejected', 'expired')) DEFAULT 'pending',
    metadata JSONB DEFAULT '{}',
    file_path TEXT,
    file_size BIGINT,
    mime_type VARCHAR(255),
    control_ids TEXT[] NOT NULL,
    tags TEXT[],
    organization_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create evidence_collection_jobs table
CREATE TABLE IF NOT EXISTS evidence_collection_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    integration_id VARCHAR(255) NOT NULL,
    schedule VARCHAR(255), -- cron expression
    collection_type VARCHAR(50) NOT NULL,
    configuration JSONB NOT NULL,
    last_run TIMESTAMP WITH TIME ZONE,
    next_run TIMESTAMP WITH TIME ZONE,
    organization_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create evidence_collection_logs table
CREATE TABLE IF NOT EXISTS evidence_collection_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES evidence_collection_jobs(id),
    status VARCHAR(50) CHECK (status IN ('success', 'failed', 'partial')) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    items_collected INTEGER,
    error_message TEXT,
    organization_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_evidence_org ON evidence(organization_id);
CREATE INDEX idx_evidence_status ON evidence(status);
CREATE INDEX idx_evidence_collection_date ON evidence(collection_date);
CREATE INDEX idx_evidence_collection_jobs_org ON evidence_collection_jobs(organization_id);
CREATE INDEX idx_evidence_collection_logs_job ON evidence_collection_logs(job_id);

-- Add triggers for updated_at
CREATE TRIGGER update_evidence_updated_at
    BEFORE UPDATE ON evidence
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_collection_jobs_updated_at
    BEFORE UPDATE ON evidence_collection_jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();