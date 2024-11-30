import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface EvidenceCollectionChartProps {
  dateRange: [Date, Date];
}

export function EvidenceCollectionChart({ dateRange }: EvidenceCollectionChartProps) {
  // Mock data - replace with actual data from your backend
  const data = [
    { date: '2024-03-01', collected: 12, approved: 10, rejected: 2 },
    { date: '2024-03-02', collected: 15, approved: 13, rejected: 2 },
    { date: '2024-03-03', collected: 8, approved: 7, rejected: 1 },
    { date: '2024-03-04', collected: 20, approved: 17, rejected: 3 },
    { date: '2024-03-05', collected: 16, approved: 14, rejected: 2 },
  ];

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Evidence Collection Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="collected"
            name="Collected"
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
            dataKey="rejected"
            name="Rejected"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}