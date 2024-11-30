import { ThemeProvider } from '@/components/theme-provider';
import Dashboard from '@/components/dashboard/Dashboard';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="compliance-theme">
      <main className="min-h-screen bg-background">
        <Dashboard />
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;