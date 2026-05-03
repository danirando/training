export default function StatsCards({ sessions }) {
  if (sessions.length === 0) return null;

  const totalKcal = sessions.reduce(
    (acc, s) => acc + parseFloat(s.total_kcal),
    0,
  );
  const totalSessions = sessions.length;
  const avgKcal = totalKcal / totalSessions;
  const totalMinutes =
    sessions.reduce((acc, s) => acc + s.duration_seconds, 0) / 60;
  const avgSpeed =
    sessions.reduce((acc, s) => acc + parseFloat(s.avg_speed_kmh), 0) /
    totalSessions;

  return (
    <div
      style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
      <StatCard label="Sessioni totali" value={totalSessions} unit="" />
      <StatCard label="Kcal totali" value={totalKcal.toFixed(0)} unit="kcal" />
      <StatCard
        label="Media per sessione"
        value={avgKcal.toFixed(1)}
        unit="kcal"
      />
      <StatCard
        label="Minuti totali"
        value={totalMinutes.toFixed(0)}
        unit="min"
      />
      <StatCard
        label="Velocità media"
        value={avgSpeed.toFixed(1)}
        unit="km/h"
      />
    </div>
  );
}

function StatCard({ label, value, unit }) {
  return (
    <div
      style={{
        background: "#f8f8f8",
        borderRadius: 8,
        padding: "12px 20px",
        minWidth: 130,
        textAlign: "center",
        flex: 1,
      }}>
      <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>
        {value} <span style={{ fontSize: 14, color: "#888" }}>{unit}</span>
      </p>
    </div>
  );
}
