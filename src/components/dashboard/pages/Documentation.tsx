import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Book, FileJson, Code, GitPullRequest, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const docs = {
  prd: { 
    content: `# Compliance OS - Product Requirements Document

## Overview
Compliance OS is an open-source compliance automation platform designed to help organizations streamline their compliance processes across multiple frameworks (SOC 2, GDPR, ISO 27001, HIPAA).

## Core Features

### 1. Compliance Framework Management
- Support for multiple compliance frameworks
- Framework-specific control mapping and tracking
- Progress monitoring and status reporting
- Control implementation guidance`,
    title: 'Product Requirements', 
    icon: Book 
  },
  architecture: { 
    content: `# Compliance OS - Architecture Documentation

## System Architecture

### Frontend Architecture

#### Component Structure
\`\`\`
src/
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   ├── ui/               # Reusable UI components
│   └── theme-provider.tsx # Theme management
├── hooks/                # Custom React hooks
├── lib/                 # Core utilities and services
└── types/               # TypeScript type definitions
\`\`\``,
    title: 'Architecture', 
    icon: Code 
  },
  api: { 
    content: `# Compliance OS API Documentation

## Authentication

All API requests require authentication using a JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Integrations

#### List Integrations
\`\`\`http
GET /api/v1/integrations
\`\`\``,
    title: 'API Documentation', 
    icon: Code 
  },
  contributing: { 
    content: `# Contributing to Compliance OS

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account`,
    title: 'Contributing', 
    icon: GitPullRequest 
  },
  appFlow: { 
    content: `# Compliance OS - Application Flow Documentation

## User Journeys

### 1. Initial Setup Flow
1. User Registration
2. Framework Selection
3. Integration Setup`,
    title: 'Application Flow', 
    icon: Activity 
  },
  developmentLog: { 
    content: `# Compliance OS - Development Log

## Project Overview
Building an open-source compliance automation platform to help organizations manage compliance across multiple frameworks.

## Completed Features
- Core Application Structure
- Dashboard Layout
- Evidence Management
- Compliance Management`,
    title: 'Development Log', 
    icon: Activity 
  },
  knowledgeGraph: { 
    content: JSON.stringify({
      "project": {
        "name": "Compliance_OS",
        "entityType": "software_project",
        "observations": [
          "Open-source compliance automation platform",
          "Built with React, TypeScript, and Vite",
          "Uses Supabase for backend services"
        ]
      }
    }, null, 2),
    title: 'Knowledge Graph',
    icon: FileJson 
  },
};

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<keyof typeof docs>('prd');

  const filteredContent = docs[activeDoc].content.toLowerCase().includes(
    searchQuery.toLowerCase()
  )
    ? docs[activeDoc].content
    : 'No matching content';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documentation</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs value={activeDoc} onValueChange={(v) => setActiveDoc(v as keyof typeof docs)}>
            <TabsList className="w-full justify-start">
              {Object.entries(docs).map(([key, { title, icon: Icon }]) => (
                <TabsTrigger key={key} value={key} className="flex items-center">
                  <Icon className="h-4 w-4 mr-2" />
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="h-[600px] mt-6 rounded-md border p-4">
              {activeDoc === 'knowledgeGraph' ? (
                <pre className="text-sm">
                  <code>{filteredContent}</code>
                </pre>
              ) : (
                <article className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{filteredContent}</ReactMarkdown>
                </article>
              )}
            </ScrollArea>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}