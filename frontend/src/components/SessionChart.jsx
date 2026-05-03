import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SessionChart({ chartPoints }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3>Grafico sessione</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="second"
            tickFormatter={formatTime}
            label={{ value: "Tempo", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            yAxisId="kcal"
            label={{ value: "Kcal", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="speed"
            orientation="right"
            label={{ value: "km/h", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            labelFormatter={(val) => `Tempo: ${formatTime(val)}`}
            formatter={(value, name) => [value.toFixed(2), name]}
          />
          <Legend />
          <Line
            yAxisId="kcal"
            type="monotone"
            dataKey="kcalCumulative"
            stroke="#e74c3c"
            name="Kcal cumulative"
            dot={false}
          />
          <Line
            yAxisId="speed"
            type="stepAfter"
            dataKey="speedKmh"
            stroke="#3498db"
            name="Velocità (km/h)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
