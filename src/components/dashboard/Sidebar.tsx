import { DashboardPage } from './Dashboard';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import {
  LayoutDashboard,
  Shield,
  Link2,
  FileBarChart,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Monitor,
  ClipboardList,
  FileCheck,
  GitCompare,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  currentPage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'questionnaires', label: 'Questionnaires', icon: ClipboardList },
    { id: 'evidence', label: 'Evidence', icon: FileCheck },
    { id: 'evidence-mapping', label: 'Evidence Mapping', icon: GitCompare },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ] as const;

  return (
    <div className="w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">Compliance OS</span>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentPage === id ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onPageChange(id as DashboardPage)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setTheme(
              theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
            );
          }}
        >
          {theme === 'light' ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : theme === 'dark' ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Monitor className="mr-2 h-4 w-4" />
          )}
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
        </Button>
      </div>
    </div>
  );
}