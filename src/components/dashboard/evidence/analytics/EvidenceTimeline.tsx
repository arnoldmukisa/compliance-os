import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Evidence } from '@/types/evidence';

interface EvidenceTimelineProps {
  evidence: Evidence[];
}

export function EvidenceTimeline({ evidence }: EvidenceTimelineProps) {
  const timelineData = evidence.reduce((acc, e) => {
    const date = new Date(e.collectionDate).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, total: 0, approved: 0, pending: 0, rejected: 0 };
    }
    acc[date].total += 1;
    acc[date][e.status] += 1;
    return acc;
  }, {} as Record<string, any>);

  const data = Object.values(timelineData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Evidence Collection Timeline</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="approved"
            name="Approved"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="rejected"
            name="Rejected"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}