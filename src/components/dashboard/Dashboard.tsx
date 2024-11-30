import { useState } from 'react';
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { Overview } from './pages/Overview';
import { Compliance } from './pages/Compliance';
import { Integrations } from './pages/Integrations';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Questionnaires } from './pages/Questionnaires';
import { EvidenceCollection } from './pages/Evidence';
import { EvidenceMappingPage } from './pages/EvidenceMapping';
import { Documentation } from './pages/Documentation';

export type DashboardPage = 
  | 'overview' 
  | 'compliance' 
  | 'integrations' 
  | 'reports' 
  | 'settings' 
  | 'questionnaires'
  | 'evidence'
  | 'evidence-mapping'
  | 'documentation';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('overview');

  const pages: Record<DashboardPage, JSX.Element> = {
    overview: <Overview />,
    compliance: <Compliance />,
    integrations: <Integrations />,
    reports: <Reports />,
    settings: <Settings />,
    questionnaires: <Questionnaires />,
    evidence: <EvidenceCollection />,
    'evidence-mapping': <EvidenceMappingPage />,
    documentation: <Documentation />,
  };

  return (
    <Layout>
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 p-8">{pages[currentPage]}</div>
    </Layout>
  );
}