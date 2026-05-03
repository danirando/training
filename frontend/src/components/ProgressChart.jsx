import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ProgressChart({ sessions }) {
  if (sessions.length === 0) return null;

  const data = [...sessions]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((s) => ({
      data: new Date(s.created_at).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
      }),
      kcal: parseFloat(s.total_kcal).toFixed(1),
      durata: Math.floor(s.duration_seconds / 60),
    }));

  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Progressi nel tempo</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis
            yAxisId="kcal"
            label={{ value: "Kcal", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="durata"
            orientation="right"
            label={{ value: "Min", angle: 90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="kcal" dataKey="kcal" fill="#e74c3c" name="Kcal" />
          <Bar
            yAxisId="durata"
            dataKey="durata"
            fill="#3498db"
            name="Durata (min)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
