# Compliance OS API Documentation

## Authentication

All API requests require authentication using a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Integrations

#### List Integrations
```http
GET /api/v1/integrations
```

Response:
```json
{
  "integrations": [
    {
      "id": "ms-teams",
      "name": "Microsoft Teams",
      "status": "connected",
      "lastSync": "2024-03-15T10:00:00Z"
    }
  ]
}
```

#### Connect Integration
```http
POST /api/v1/integrations/:id/connect
```

Request:
```json
{
  "config": {
    "webhookUrl": "https://...",
    "channelId": "..."
  }
}
```

### Evidence Collection

#### List Evidence
```http
GET /api/v1/evidence
```

Response:
```json
{
  "evidence": [
    {
      "id": "uuid",
      "type": "document",
      "title": "Security Policy",
      "status": "approved"
    }
  ]
}
```

#### Upload Evidence
```http
POST /api/v1/evidence
```

Request:
```json
{
  "type": "document",
  "title": "Security Policy",
  "description": "Annual security policy document",
  "controlIds": ["CC1.1", "CC1.2"]
}
```

### Questionnaires

#### Create Template
```http
POST /api/v1/questionnaires/templates
```

Request:
```json
{
  "name": "SOC 2 Assessment",
  "description": "Annual SOC 2 compliance assessment",
  "categories": ["security", "availability"]
}
```

#### Submit Response
```http
POST /api/v1/questionnaires/responses
```

Request:
```json
{
  "templateId": "uuid",
  "answers": {
    "q1": "Response text",
    "q2": "Response text"
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `INTEGRATION_ERROR`: Integration-specific error

## Rate Limiting

- Rate limit: 1000 requests per hour
- Rate limit header: `X-RateLimit-Remaining`
- Reset header: `X-RateLimit-Reset`

## Webhooks

### Event Types
- `evidence.created`
- `evidence.updated`
- `evidence.deleted`
- `questionnaire.submitted`
- `integration.connected`
- `integration.error`

### Webhook Payload
```json
{
  "event": "evidence.created",
  "timestamp": "2024-03-15T10:00:00Z",
  "data": {
    "id": "uuid",
    "type": "document",
    "title": "Security Policy"
  }
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { ComplianceOS } from '@compliance-os/sdk';

const client = new ComplianceOS({
  apiKey: 'your-api-key',
  organizationId: 'your-org-id'
});

// Connect integration
await client.integrations.connect('ms-teams', {
  webhookUrl: 'https://...',
  channelId: '...'
});

// Upload evidence
await client.evidence.upload({
  type: 'document',
  title: 'Security Policy',
  file: fileObject
});
```

### Python
```python
from compliance_os import ComplianceOS

client = ComplianceOS(
    api_key='your-api-key',
    organization_id='your-org-id'
)

# Connect integration
client.integrations.connect('ms-teams', {
    'webhook_url': 'https://...',
    'channel_id': '...'
})

# Upload evidence
client.evidence.upload({
    'type': 'document',
    'title': 'Security Policy',
    'file': file_object
})
```