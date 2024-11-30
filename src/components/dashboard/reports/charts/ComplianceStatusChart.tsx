import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ComplianceFramework } from '@/types/compliance';

interface ComplianceStatusChartProps {
  framework: ComplianceFramework;
}

export function ComplianceStatusChart({ framework }: ComplianceStatusChartProps) {
  // Mock data - replace with actual data from your backend
  const data = [
    {
      category: 'Control Environment',
      compliant: 15,
      nonCompliant: 2,
      inProgress: 3,
    },
    {
      category: 'Risk Assessment',
      compliant: 12,
      nonCompliant: 1,
      inProgress: 5,
    },
    {
      category: 'Control Activities',
      compliant: 20,
      nonCompliant: 3,
      inProgress: 7,
    },
    {
      category: 'Monitoring',
      compliant: 18,
      nonCompliant: 2,
      inProgress: 4,
    },
  ];

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Compliance Status by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="compliant"
            name="Compliant"
            stackId="a"
            fill="hsl(var(--chart-1))"
          />
          <Bar
            dataKey="nonCompliant"
            name="Non-Compliant"
            stackId="a"
            fill="hsl(var(--chart-2))"
          />
          <Bar
            dataKey="inProgress"
            name="In Progress"
            stackId="a"
            fill="hsl(var(--chart-3))"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}