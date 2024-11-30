import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AuditActivityChartProps {
  dateRange: [Date, Date];
}

export function AuditActivityChart({ dateRange }: AuditActivityChartProps) {
  // Mock data - replace with actual data from your backend
  const data = [
    {
      date: '2024-03-01',
      evidenceUpdates: 25,
      controlChanges: 10,
      userActions: 15,
    },
    {
      date: '2024-03-02',
      evidenceUpdates: 30,
      controlChanges: 12,
      userActions: 18,
    },
    {
      date: '2024-03-03',
      evidenceUpdates: 20,
      controlChanges: 8,
      userActions: 12,
    },
    {
      date: '2024-03-04',
      evidenceUpdates: 35,
      controlChanges: 15,
      userActions: 20,
    },
    {
      date: '2024-03-05',
      evidenceUpdates: 28,
      controlChanges: 11,
      userActions: 16,
    },
  ];

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Audit Activity Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="evidenceUpdates"
            name="Evidence Updates"
            stackId="1"
            fill="hsl(var(--chart-1))"
            stroke="hsl(var(--chart-1))"
          />
          <Area
            type="monotone"
            dataKey="controlChanges"
            name="Control Changes"
            stackId="1"
            fill="hsl(var(--chart-2))"
            stroke="hsl(var(--chart-2))"
          />
          <Area
            type="monotone"
            dataKey="userActions"
            name="User Actions"
            stackId="1"
            fill="hsl(var(--chart-3))"
            stroke="hsl(var(--chart-3))"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}