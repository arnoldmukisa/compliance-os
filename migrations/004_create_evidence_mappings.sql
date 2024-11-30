-- Create evidence_mappings table
CREATE TABLE IF NOT EXISTS evidence_mappings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    evidence_id UUID REFERENCES evidence(id),
    control_id VARCHAR(255) NOT NULL,
    mapping_type VARCHAR(50) CHECK (mapping_type IN ('primary', 'secondary')) NOT NULL,
    justification TEXT,
    mapped_by VARCHAR(255) NOT NULL,
    mapped_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('active', 'archived')) DEFAULT 'active',
    organization_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_evidence_mappings_evidence ON evidence_mappings(evidence_id);
CREATE INDEX idx_evidence_mappings_control ON evidence_mappings(control_id);
CREATE INDEX idx_evidence_mappings_org ON evidence_mappings(organization_id);
CREATE INDEX idx_evidence_mappings_status ON evidence_mappings(status);

-- Add trigger for updated_at
CREATE TRIGGER update_evidence_mappings_updated_at
    BEFORE UPDATE ON evidence_mappings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();