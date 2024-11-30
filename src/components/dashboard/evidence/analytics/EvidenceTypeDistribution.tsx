import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Evidence } from '@/types/evidence';

interface EvidenceTypeDistributionProps {
  evidence: Evidence[];
}

export function EvidenceTypeDistribution({ evidence }: EvidenceTypeDistributionProps) {
  const typeCounts = evidence.reduce(
    (acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(typeCounts).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
  }));

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Evidence Type Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            name="Count"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}