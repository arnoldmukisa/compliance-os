import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Evidence } from '@/types/evidence';

interface EvidenceStatusChartProps {
  evidence: Evidence[];
}

export function EvidenceStatusChart({ evidence }: EvidenceStatusChartProps) {
  const statusCounts = evidence.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));

  const COLORS = {
    Approved: 'hsl(var(--chart-1))',
    Pending: 'hsl(var(--chart-2))',
    Rejected: 'hsl(var(--chart-3))',
    Expired: 'hsl(var(--chart-4))',
  };

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Evidence Status Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}