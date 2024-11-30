# Compliance OS Documentation

## Overview
Compliance OS is an open-source compliance automation dashboard that helps organizations manage their compliance processes across multiple frameworks (SOC 2, GDPR, ISO 27001, etc.) by integrating with various cloud services and tools.

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Environment variables configured (see `.env.example`)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your Supabase credentials
4. Run database migrations
5. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture

### Technology Stack
- Frontend: React + TypeScript + Vite
- UI Components: shadcn/ui
- State Management: React Hooks
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- Styling: Tailwind CSS

### Key Components

#### Integration System
The integration system is built with a modular architecture:

- `IntegrationManager`: Central manager for all integrations
- `IntegrationService`: Interface for individual integration implementations
- `IntegrationStorage`: Handles persistence of integration configurations
- Individual service implementations (MS Teams, MS 365, DigitalOcean)

#### Database Schema

##### integration_configs
Stores integration configurations and status:

| Column           | Type      | Description                    |
|-----------------|-----------|--------------------------------|
| id              | UUID      | Primary key                    |
| integration_id  | VARCHAR   | Integration identifier         |
| config          | JSONB     | Configuration parameters       |
| organization_id | VARCHAR   | Organization identifier        |
| status          | VARCHAR   | Connection status             |
| last_sync       | TIMESTAMP | Last successful sync          |
| created_at      | TIMESTAMP | Record creation timestamp     |
| updated_at      | TIMESTAMP | Record update timestamp       |

## Features

### Compliance Management
- Framework selection (SOC 2, GDPR, ISO 27001, HIPAA)
- Control tracking and status monitoring
- Timeline view of compliance activities
- Progress tracking and reporting

### Integrations
- Microsoft Teams integration for notifications
- Microsoft 365 integration for document management
- DigitalOcean integration for infrastructure compliance
- Extensible integration framework for adding new services

## Development Guide

### Adding New Integrations
1. Create a new service class implementing `IntegrationService`
2. Add configuration fields to `CONFIG_FIELDS` in `IntegrationConfigDialog`
3. Register the service in `IntegrationManager`
4. Add integration metadata to the integrations list

Example:
```typescript
export class NewIntegrationService implements IntegrationService {
  async connect(config: IntegrationConfig): Promise<void> {
    // Implementation
  }
  // ... other required methods
}
```

### Security Considerations
- All sensitive configuration data is stored encrypted in Supabase
- API tokens and credentials are never logged or exposed
- Regular security audits of dependencies
- Input validation on all configuration parameters

## API Documentation

### Integration Service Interface
```typescript
interface IntegrationService {
  connect(config: IntegrationConfig): Promise<void>;
  disconnect(): Promise<void>;
  validateConfig(config: IntegrationConfig): Promise<boolean>;
  getStatus(): Promise<Integration['status']>;
  sync(): Promise<void>;
}
```

### Storage Service Methods
```typescript
class IntegrationStorage {
  saveConfig(integrationId: string, config: IntegrationConfig): Promise<void>;
  getConfig(integrationId: string): Promise<IntegrationConfig | null>;
  updateStatus(integrationId: string, status: Integration['status']): Promise<void>;
  updateLastSync(integrationId: string): Promise<void>;
  deleteConfig(integrationId: string): Promise<void>;
  getAllConfigs(): Promise<Array<{...}>>;
}
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License
MIT License - See LICENSE file for details