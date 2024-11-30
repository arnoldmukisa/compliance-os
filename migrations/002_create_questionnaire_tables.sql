-- Create questionnaire_templates table
CREATE TABLE IF NOT EXISTS questionnaire_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    categories TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    organization_id VARCHAR(255) NOT NULL
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID REFERENCES questionnaire_templates(id),
    category VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'in-review', 'approved', 'rejected')) DEFAULT 'pending',
    assignee VARCHAR(255),
    reviewer VARCHAR(255),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tags TEXT[],
    CONSTRAINT fk_template FOREIGN KEY (template_id) REFERENCES questionnaire_templates(id) ON DELETE CASCADE
);

-- Create questionnaire_responses table
CREATE TABLE IF NOT EXISTS questionnaire_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID REFERENCES questionnaire_templates(id),
    organization_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('draft', 'submitted', 'in_review', 'completed', 'rejected')) DEFAULT 'draft',
    submitted_by VARCHAR(255),
    submitted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create response_answers table
CREATE TABLE IF NOT EXISTS response_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    response_id UUID REFERENCES questionnaire_responses(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id),
    answer TEXT,
    reviewer_comments TEXT,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'rejected', 'needs_clarification')) DEFAULT 'pending',
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create response_attachments table
CREATE TABLE IF NOT EXISTS response_attachments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    response_id UUID REFERENCES questionnaire_responses(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id),
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(255),
    uploaded_by VARCHAR(255),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_questionnaire_templates_org ON questionnaire_templates(organization_id);
CREATE INDEX idx_questionnaire_responses_org ON questionnaire_responses(organization_id);
CREATE INDEX idx_questionnaire_responses_template ON questionnaire_responses(template_id);
CREATE INDEX idx_response_answers_response ON response_answers(response_id);
CREATE INDEX idx_response_answers_question ON response_answers(question_id);
CREATE INDEX idx_response_attachments_response ON response_attachments(response_id);

-- Add triggers for updated_at
CREATE TRIGGER update_questionnaire_templates_updated_at
    BEFORE UPDATE ON questionnaire_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questionnaire_responses_updated_at
    BEFORE UPDATE ON questionnaire_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_response_answers_updated_at
    BEFORE UPDATE ON response_answers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();