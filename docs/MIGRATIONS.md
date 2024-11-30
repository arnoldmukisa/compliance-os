# Database Migrations

This document describes the database migrations for the Compliance OS project.

## Running Migrations

### Using Supabase CLI

1. Install Supabase CLI:
   ```bash
   npm install -g supabase-cli
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Run migrations:
   ```bash
   supabase db push
   ```

### Manual Migration

1. Connect to your Supabase database using psql or the SQL editor in the Supabase dashboard
2. Run the migration scripts in order from the `migrations` directory

## Migration Files

### 001_create_integration_configs.sql

Creates the initial `integration_configs` table with:
- UUID primary key
- Integration and organization identifiers
- JSONB config storage
- Status tracking
- Timestamps
- Indexes for performance
- Auto-updating timestamps

## Rollback Procedures

### Rolling Back 001_create_integration_configs.sql

```sql
DROP TRIGGER IF EXISTS update_integration_configs_updated_at ON integration_configs;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS integration_configs;
```

## Best Practices

1. Always backup database before running migrations
2. Test migrations in development environment first
3. Include both up and down migrations
4. Document any manual steps required
5. Version control all migration files