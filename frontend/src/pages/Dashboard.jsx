import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { theme } from "../styles/theme";
import { Button, Badge, SkeletonLoader } from "../components/ui";
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

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ from: "", to: "", minKcal: "" });

  useEffect(() => {
    api
      .get("/workout-sessions")
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Sei sicuro di voler eliminare questa sessione?")) return;
    await api.delete(`/workout-sessions/${id}`);
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const date = new Date(s.created_at);
      if (filters.from && date < new Date(filters.from)) return false;
      if (filters.to && date > new Date(filters.to + "T23:59:59")) return false;
      if (
        filters.minKcal &&
        parseFloat(s.total_kcal) < parseFloat(filters.minKcal)
      )
        return false;
      return true;
    });
  }, [sessions, filters]);

  const chartData = useMemo(() => {
    return sessions
      .slice()
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((s) => ({
        date: new Date(s.created_at).toLocaleDateString("it-IT", {
          month: "2-digit",
          day: "2-digit",
        }),
        kcal: parseFloat(s.total_kcal),
        km: s.distance_km
          ? parseFloat(s.distance_km)
          : (s.duration_seconds / 3600) * parseFloat(s.avg_speed_kmh),
        speed: parseFloat(s.avg_speed_kmh),
      }));
  }, [sessions]);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalKcal = sessions.reduce(
      (sum, s) => sum + parseFloat(s.total_kcal),
      0,
    );
    const totalDistance = sessions.reduce(
      (sum, s) =>
        sum +
        (s.distance_km
          ? parseFloat(s.distance_km)
          : (s.duration_seconds / 3600) * parseFloat(s.avg_speed_kmh)),
      0,
    );
    const avgSpeed =
      totalSessions > 0
        ? (
            sessions.reduce((sum, s) => sum + parseFloat(s.avg_speed_kmh), 0) /
            totalSessions
          ).toFixed(1)
        : 0;

    return {
      totalSessions,
      totalKcal: totalKcal.toFixed(1),
      totalDistance: totalDistance.toFixed(1),
      avgSpeed,
    };
  }, [sessions]);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================================================
  // STYLES
  // ============================================================================

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[8],
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
  };

  const titleStyle = {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: theme.spacing[4],
    marginBottom: theme.spacing[8],
  };

  const statCardStyle = (color) => ({
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[5],
    boxShadow: theme.shadows.sm,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    animation: "slideUp 0.6s ease-out",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows.md,
    },

    borderTop: `4px solid ${color}`,
  });

  const statIconStyle = (color) => ({
    fontSize: "32px",
    marginBottom: theme.spacing[2],
    display: "block",
  });

  const statLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing[1],
  };

  const statValueStyle = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  };

  const chartContainerStyle = {
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[6],
    boxShadow: theme.shadows.sm,
    marginBottom: theme.spacing[8],
  };

  const chartTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
    margin: 0,
  };

  const sectionHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing[4],
    flexWrap: "wrap",
    gap: theme.spacing[4],
  };

  const filterBarStyle = {
    display: "flex",
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[4],
    flexWrap: "wrap",
    alignItems: "flex-end",
  };

  const filterInputStyle = {
    flex: "0 1 auto",
    minWidth: "150px",
  };

  const tablesStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderCollapse: "collapse",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.sm,
    width: "100%",
    overflow: "hidden",
  };

  const tableHeaderStyle = {
    padding: theme.spacing[4],
    backgroundColor: theme.colors.gray[50],
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    letterSpacing: theme.typography.letterSpacing.wide,
    textAlign: "center",
    borderRight: `1px solid ${theme.colors.border}`,
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const tableCellStyle = {
    padding: theme.spacing[4],
    textAlign: "center",
    borderRight: `1px solid ${theme.colors.border}`,
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const tableRowStyle = {
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,

    "&:hover": {
      backgroundColor: theme.colors.gray[50],
      boxShadow: `inset 0 0 0 1px ${theme.colors.primary[100]}`,
    },
  };

  const emptyStateStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing[12],
    textAlign: "center",
  };

  const emptyIconStyle = {
    fontSize: "64px",
    marginBottom: theme.spacing[4],
    opacity: 0.5,
  };

  const emptyTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  };

  const emptyTextStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing[6],
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={pageStyle}>
        {/* Header */}
        <div>
          <h1 style={titleStyle}>👋 Benvenuto, {user?.name}!</h1>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <SkeletonLoader lines={1} />
        ) : (
          <div style={gridStyle}>
            {/* Total Sessions */}
            <div style={statCardStyle(theme.colors.primary[500])}>
              <span style={statIconStyle(theme.colors.primary[500])}>🏃</span>
              <div style={statLabelStyle}>Sessioni totali</div>
              <div style={statValueStyle}>{stats.totalSessions}</div>
            </div>

            {/* Total Kcal */}
            <div style={statCardStyle(theme.colors.success[500])}>
              <span style={statIconStyle(theme.colors.success[500])}>🔥</span>
              <div style={statLabelStyle}>Calorie bruciate</div>
              <div style={statValueStyle}>{stats.totalKcal}</div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}>
                kcal
              </div>
            </div>

            {/* Total Distance */}
            <div style={statCardStyle(theme.colors.secondary[500])}>
              <span style={statIconStyle(theme.colors.secondary[500])}>📍</span>
              <div style={statLabelStyle}>Distanza totale</div>
              <div style={statValueStyle}>{stats.totalDistance}</div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}>
                km
              </div>
            </div>

            {/* Average Speed */}
            <div style={statCardStyle(theme.colors.warning[500])}>
              <span style={statIconStyle(theme.colors.warning[500])}>⚡</span>
              <div style={statLabelStyle}>Velocità media</div>
              <div style={statValueStyle}>{stats.avgSpeed}</div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}>
                km/h
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {!loading && sessions.length > 0 && (
          <div style={chartContainerStyle}>
            <h2 style={chartTitleStyle}>📊 Andamento progressi</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.colors.border}
                />
                <XAxis
                  dataKey="date"
                  stroke={theme.colors.text.tertiary}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  yAxisId="left"
                  stroke={theme.colors.primary[500]}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={theme.colors.secondary[500]}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.colors.white,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.md,
                    boxShadow: theme.shadows.lg,
                  }}
                  cursor={{ stroke: theme.colors.primary[200], strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ paddingTop: theme.spacing[4] }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="kcal"
                  stroke={theme.colors.success[500]}
                  strokeWidth={2}
                  dot={{ fill: theme.colors.success[500], r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Kcal"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="speed"
                  stroke={theme.colors.secondary[500]}
                  strokeWidth={2}
                  dot={{ fill: theme.colors.secondary[500], r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Velocità (km/h)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Sessions Section */}
        <div>
          <div style={sectionHeaderStyle}>
            <h2 style={{ ...chartTitleStyle, marginBottom: 0 }}>
              📋 Le tue sessioni ({filteredSessions.length})
            </h2>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/workout")}>
              ➕ Nuova sessione
            </Button>
          </div>

          {/* Filters */}
          {!loading && sessions.length > 0 && (
            <div style={filterBarStyle}>
              <div style={filterInputStyle}>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    marginBottom: theme.spacing[1],
                    color: theme.colors.text.secondary,
                  }}>
                  Da
                </label>
                <input
                  type="date"
                  value={filters.from}
                  onChange={(e) =>
                    setFilters({ ...filters, from: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border}`,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                />
              </div>

              <div style={filterInputStyle}>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    marginBottom: theme.spacing[1],
                    color: theme.colors.text.secondary,
                  }}>
                  A
                </label>
                <input
                  type="date"
                  value={filters.to}
                  onChange={(e) =>
                    setFilters({ ...filters, to: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border}`,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                />
              </div>

              <div style={filterInputStyle}>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    marginBottom: theme.spacing[1],
                    color: theme.colors.text.secondary,
                  }}>
                  Min. Kcal
                </label>
                <input
                  type="number"
                  placeholder="Es. 200"
                  value={filters.minKcal}
                  onChange={(e) =>
                    setFilters({ ...filters, minKcal: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border}`,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ from: "", to: "", minKcal: "" })}>
                🔄 Reset
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading && <SkeletonLoader lines={4} />}

          {/* Empty State */}
          {!loading &&
            filteredSessions.length === 0 &&
            sessions.length === 0 && (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>🏃‍♂️</div>
                <div style={emptyTitleStyle}>Nessuna sessione ancora</div>
                <div style={emptyTextStyle}>
                  Inizia a registrare i tuoi allenamenti per tracciare i tuoi
                  progressi
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate("/workout")}>
                  Crea la tua prima sessione
                </Button>
              </div>
            )}

          {/* Empty Filter Result */}
          {!loading && filteredSessions.length === 0 && sessions.length > 0 && (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>🔍</div>
              <div style={emptyTitleStyle}>Nessuna sessione trovata</div>
              <div style={emptyTextStyle}>
                Prova a modificare i filtri per visualizzare altre sessioni
              </div>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setFilters({ from: "", to: "", minKcal: "" })}>
                Cancella filtri
              </Button>
            </div>
          )}

          {/* Sessions Table */}
          {!loading && filteredSessions.length > 0 && (
            <table style={tablesStyle}>
              <thead>
                <tr>
                  {[
                    "Data e Ora",
                    "Durata",
                    "Distanza",
                    "Velocità",
                    "Calorie",
                    "Azioni",
                  ].map((title, i) => {
                    const widths = [
                      "20%",
                      "13.33%",
                      "13.33%",
                      "13.33%",
                      "13.33%",
                      "20%",
                    ];
                    return (
                      <th
                        key={title}
                        style={{
                          ...tableHeaderStyle,
                          width: widths[i],
                          borderRight:
                            i < 5 ? `1px solid ${theme.colors.border}` : "none",
                        }}>
                        {title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} style={tableRowStyle}>
                    <td
                      style={{
                        ...tableCellStyle,
                        borderRight: `1px solid ${theme.colors.border}`,
                      }}>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.text.primary,
                        }}>
                        {formatDate(session.created_at)}
                      </div>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        borderRight: `1px solid ${theme.colors.border}`,
                      }}>
                      <Badge variant="primary" size="sm">
                        ⏱ {formatDuration(session.duration_seconds)}
                      </Badge>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        borderRight: `1px solid ${theme.colors.border}`,
                      }}>
                      <Badge variant="secondary" size="sm">
                        📍{" "}
                        {(session.distance_km
                          ? parseFloat(session.distance_km)
                          : (session.duration_seconds / 3600) *
                            parseFloat(session.avg_speed_kmh)
                        ).toFixed(1)}{" "}
                        km
                      </Badge>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        borderRight: `1px solid ${theme.colors.border}`,
                      }}>
                      <Badge variant="warning" size="sm">
                        ⚡ {parseFloat(session.avg_speed_kmh).toFixed(1)} km/h
                      </Badge>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        borderRight: `1px solid ${theme.colors.border}`,
                      }}>
                      <Badge variant="success" size="sm">
                        🔥 {parseFloat(session.total_kcal).toFixed(0)} kcal
                      </Badge>
                    </td>

                    <td style={tableCellStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: theme.spacing[2],
                          justifyContent: "center",
                        }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/sessions/${session.id}`)}>
                          Dettaglio
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(session.id)}>
                          Elimina
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
