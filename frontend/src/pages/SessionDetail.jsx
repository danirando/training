import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import SessionChart from "../components/SessionChart";
import { calculateSession } from "../utils/kcalCalculator";
import { theme } from "../styles/theme";
import { Button, Badge } from "../components/ui";

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    api
      .get(`/workout-sessions/${id}`)
      .then((res) => setSession(res.data))
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await api.delete(`/workout-sessions/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Errore durante l'eliminazione", err);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: 24, textAlign: "center" }}>
        <p>Caricamento...</p>
      </div>
    );
  }
  if (!session) return null;

  const intervals = session.intervals.map((i) => ({
    startSecond: i.start_second,
    endSecond: i.end_second,
    speedKmh: i.speed_kmh,
    inclinePercent: i.incline_percent,
  }));

  const { chartPoints } = calculateSession({
    weightKg: session.weight_kg,
    age: session.age,
    gender: session.gender,
    intervals,
  });

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
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

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[8],
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "0 24px",
  };

  const breadcrumbStyle = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[2],
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing[4],
  };

  const breadcrumbLinkStyle = {
    color: theme.colors.primary[500],
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.medium,
  };

  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: theme.spacing[4],
  };

  const heroStyle = {
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[8],
    boxShadow: theme.shadows.md,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: theme.spacing[6],
  };

  const heroStatStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[2],
  };

  const heroLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: theme.typography.letterSpacing.wide,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const heroValueStyle = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  };

  const heroSubvalueStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  };

  const chartContainerStyle = {
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    boxShadow: theme.shadows.md,
    width: "100%",
  };

  const tablesStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.md,
    overflow: "hidden",
  };

  const tableHeaderStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    backgroundColor: theme.colors.gray[50],
    borderBottom: `1px solid ${theme.colors.border}`,
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textTransform: "uppercase",
  };

  const tableRowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    borderBottom: `1px solid ${theme.colors.border}`,
    alignItems: "center",
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.modal,
    animation: "fadeIn 0.2s ease-out",
  };

  const dialogStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[6],
    maxWidth: "400px",
    width: "100%",
    boxShadow: theme.shadows.xl,
    animation: "slideUp 0.3s ease-out",
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .interval-row:hover {
          background-color: ${theme.colors.gray[50]};
        }
        .interval-row:nth-child(even) {
          background-color: #fafbfc;
        }
      `}</style>
      
      <div style={pageStyle}>
        {/* Breadcrumb Navigation */}
        <div style={breadcrumbStyle}>
          <span 
            style={breadcrumbLinkStyle} 
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </span>
          <span>/</span>
          <span>Dettaglio Sessione</span>
        </div>

        {/* Header Title & Actions */}
        <div style={headerContainerStyle}>
          <div>
            <h1 style={{ margin: `0 0 ${theme.spacing[2]} 0`, fontSize: theme.typography.fontSize["3xl"] }}>
              Riepilogo Allenamento
            </h1>
            <p style={{ margin: 0, color: theme.colors.text.secondary }}>
              {formatDate(session.created_at)}
            </p>
          </div>
          <Button variant="danger" size="md" onClick={() => setShowConfirmDelete(true)}>
            Elimina Sessione
          </Button>
        </div>

        {/* Hero Section Stats */}
        <div style={heroStyle}>
          <div style={heroStatStyle}>
            <span style={heroLabelStyle}>Durata Totale</span>
            <span style={heroValueStyle}>{formatDuration(session.duration_seconds)}</span>
          </div>
          <div style={heroStatStyle}>
            <span style={heroLabelStyle}>Kcal Bruciate</span>
            <div>
              <span style={{...heroValueStyle, color: theme.colors.success[500]}}>
                {parseFloat(session.total_kcal).toFixed(0)}
              </span>
              <span style={{...heroSubvalueStyle, marginLeft: theme.spacing[1]}}>kcal</span>
            </div>
          </div>
          <div style={heroStatStyle}>
            <span style={heroLabelStyle}>Velocità Media</span>
            <div>
              <span style={{...heroValueStyle, color: theme.colors.warning[500]}}>
                {parseFloat(session.avg_speed_kmh).toFixed(1)}
              </span>
              <span style={{...heroSubvalueStyle, marginLeft: theme.spacing[1]}}>km/h</span>
            </div>
          </div>
          <div style={heroStatStyle}>
            <span style={heroLabelStyle}>Inclinazione</span>
            <div>
              <span style={heroValueStyle}>{session.incline_percent}</span>
              <span style={{...heroSubvalueStyle, marginLeft: theme.spacing[1]}}>%</span>
            </div>
          </div>
        </div>

        {/* Full-width Chart */}
        {chartPoints.length > 0 && (
          <div style={chartContainerStyle}>
            <SessionChart chartPoints={chartPoints} />
          </div>
        )}

        {/* Intervals Table */}
        <div>
          <h3 style={{ marginBottom: theme.spacing[4], fontSize: theme.typography.fontSize.xl, marginTop: theme.spacing[4] }}>
            Dettaglio Intervalli
          </h3>
          <div style={tablesStyle}>
            <div style={tableHeaderStyle}>
              <div>Da</div>
              <div>A</div>
              <div>Velocità</div>
              <div>Inclinazione</div>
              <div>Kcal</div>
            </div>
            {session.intervals.map((interval, i) => (
              <div key={i} style={tableRowStyle} className="interval-row">
                <div style={{ fontWeight: theme.typography.fontWeight.medium, color: theme.colors.text.primary }}>
                  {formatDuration(interval.start_second)}
                </div>
                <div style={{ color: theme.colors.text.secondary }}>
                  {formatDuration(interval.end_second)}
                </div>
                <div>
                  <Badge variant="warning" size="sm">
                    {interval.speed_kmh} km/h
                  </Badge>
                </div>
                <div style={{ color: theme.colors.text.secondary }}>
                  {interval.incline_percent}%
                </div>
                <div>
                  <Badge variant="success" size="sm">
                    {parseFloat(interval.kcal).toFixed(1)} kcal
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirmDelete && (
        <div style={overlayStyle} onClick={() => setShowConfirmDelete(false)}>
          <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: `0 0 ${theme.spacing[2]} 0`, fontSize: theme.typography.fontSize.xl }}>
              Elimina Sessione
            </h3>
            <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing[6] }}>
              Sei sicuro di voler eliminare questa sessione? Questa azione non può essere annullata.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: theme.spacing[3] }}>
              <Button variant="ghost" onClick={() => setShowConfirmDelete(false)}>
                Annulla
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Elimina
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
