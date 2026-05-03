import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateSession } from "../utils/kcalCalculator";
import SessionChart from "../components/SessionChart";
import api from "../lib/axios";
import { theme } from "../styles/theme";
import { Button, Input, Card } from "../components/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NewSession() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const savedParams = JSON.parse(localStorage.getItem("workoutParams")) || {
    weightKg: "",
    age: "",
    gender: "male",
  };
  const [params, setParams] = useState(savedParams);
  const [intervals, setIntervals] = useState([
    { durationMinutes: 30, speedKmh: 8, inclinePercent: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Compute intervals dynamically
  const computedIntervals = intervals.reduce((acc, current, index) => {
    const startSecond = index === 0 ? 0 : acc[index - 1].endSecond;
    const endSecond = startSecond + current.durationMinutes * 60;
    acc.push({
      startSecond,
      endSecond,
      speedKmh: current.speedKmh,
      inclinePercent: current.inclinePercent,
    });
    return acc;
  }, []);

  // Calcolo real-time
  const hasValidParams = params.weightKg && params.age;
  const hasValidData = hasValidParams && computedIntervals.length > 0;

  const { totalKcal, chartPoints } = hasValidData
    ? calculateSession({
        weightKg: parseFloat(params.weightKg),
        age: parseInt(params.age),
        gender: params.gender,
        intervals: computedIntervals,
      })
    : { totalKcal: 0, chartPoints: [] };

  const addInterval = () => {
    const last = intervals[intervals.length - 1];
    setIntervals([
      ...intervals,
      {
        durationMinutes: last.durationMinutes,
        speedKmh: last.speedKmh,
        inclinePercent: last.inclinePercent,
      },
    ]);
  };

  const removeInterval = (index) => {
    if (intervals.length > 1) {
      setIntervals(intervals.filter((_, i) => i !== index));
    }
  };

  const updateInterval = (index, field, value) => {
    const updated = [...intervals];
    updated[index] = { ...updated[index], [field]: parseFloat(value) || 0 };
    setIntervals(updated);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...intervals];
    [updated[draggedIndex], updated[targetIndex]] = [
      updated[targetIndex],
      updated[draggedIndex],
    ];
    setIntervals(updated);
    setDraggedIndex(null);
  };

  const handleNextStep = (next) => {
    if (next === 2 && hasValidParams) {
      localStorage.setItem("workoutParams", JSON.stringify(params));
    }
    setCurrentStep(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const durationSeconds = computedIntervals.reduce(
        (acc, i) => acc + (i.endSecond - i.startSecond),
        0,
      );
      const avgSpeedKmh =
        computedIntervals.reduce((acc, i) => acc + i.speedKmh, 0) / computedIntervals.length;
      const avgIncline =
        computedIntervals.reduce((acc, i) => acc + i.inclinePercent, 0) /
        computedIntervals.length;

      await api.post("/workout-sessions", {
        weight_kg: parseFloat(params.weightKg),
        age: parseInt(params.age),
        gender: params.gender,
        duration_seconds: durationSeconds,
        avg_speed_kmh: avgSpeedKmh,
        incline_percent: avgIncline,
        total_kcal: totalKcal,
        intervals: computedIntervals.map((i) => ({
          start_second: i.startSecond,
          end_second: i.endSecond,
          speed_kmh: i.speedKmh,
          incline_percent: i.inclinePercent,
          kcal: calculateSession({
            weightKg: parseFloat(params.weightKg),
            age: parseInt(params.age),
            gender: params.gender,
            intervals: [i],
          }).totalKcal,
        })),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Errore nel salvataggio.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // STYLES
  // ============================================================================

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[8],
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 24px",
  };

  const stepperStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing[8],
  };

  const stepStyle = (isActive, isCompleted) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[3],
    flex: 1,
  });

  const stepCircleStyle = (isActive, isCompleted) => ({
    width: "48px",
    height: "48px",
    borderRadius: theme.borderRadius.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: theme.typography.fontWeight.bold,
    backgroundColor: isActive
      ? theme.colors.primary[500]
      : isCompleted
        ? theme.colors.success[500]
        : theme.colors.gray[200],
    color:
      isActive || isCompleted ? theme.colors.white : theme.colors.gray[500],
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
  });

  const stepConnectorStyle = {
    flex: 1,
    height: "2px",
    backgroundColor: theme.colors.gray[300],
    margin: `0 ${theme.spacing[2]}`,
  };

  const stepLabelStyle = (isActive) => ({
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: isActive ? theme.colors.primary[600] : theme.colors.text.secondary,
  });

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[4],
  };

  const inputGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: theme.spacing[4],
  };

  const intervalCardStyle = (isDragging) => ({
    backgroundColor: theme.colors.white,
    border: `2px solid ${isDragging ? theme.colors.primary[500] : theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    boxShadow: isDragging ? theme.shadows.lg : theme.shadows.sm,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    cursor: "grab",
    draggable: true,
    opacity: isDragging ? 0.7 : 1,
  });

  const dragHandleStyle = {
    fontSize: "20px",
    cursor: "grab",
    color: theme.colors.gray[400],
    marginRight: theme.spacing[3],
    display: "flex",
    alignItems: "center",
  };

  const intervalHeaderStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing[3],
    gap: theme.spacing[2],
  };

  const kcalDisplayStyle = {
    backgroundColor: `linear-gradient(135deg, ${theme.colors.success[50]} 0%, ${theme.colors.success[100]} 100%)`,
    border: `2px solid ${theme.colors.success[200]}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[8],
    textAlign: "center",
    animation: hasValidData ? "pulse-scale 2s ease-in-out infinite" : "none",
  };

  const kcalValueStyle = {
    fontSize: "48px",
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.success[600],
    margin: 0,
  };

  const kcalLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.success[700],
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing[2],
    margin: 0,
  };

  const errorStyle = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[2],
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.error[50],
    border: `1px solid ${theme.colors.error[200]}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error[700],
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: theme.spacing[3],
    justifyContent: "flex-end",
    marginTop: theme.spacing[8],
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

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
        {/* STEPPER */}
        <div style={stepperStyle}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div
                style={stepCircleStyle(
                  currentStep === step,
                  currentStep > step,
                )}
                onClick={() => currentStep > step && handleNextStep(step)}
                role="button"
                tabIndex={0}>
                {currentStep > step ? "✓" : step}
              </div>
              <div style={stepLabelStyle(currentStep === step)}>
                {["Parametri", "Intervalli", "Riepilogo"][step - 1]}
              </div>
              {step < 3 && <div style={stepConnectorStyle} />}
            </div>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div style={errorStyle}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Parametri utente */}
          {currentStep === 1 && (
            <div style={formGroupStyle}>
              <div>
                <h2
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    margin: `0 0 ${theme.spacing[6]} 0`,
                  }}>
                  Parametri personali
                </h2>
                <p style={{ color: theme.colors.text.tertiary, margin: 0 }}>
                  Questi dati servono per calcolare accuratamente le calorie
                  bruciate
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing[4],
                  maxWidth: "400px",
                  margin: "0 auto",
                  width: "100%",
                }}>
                <Input
                  label="Peso (kg)"
                  type="number"
                  min="30"
                  max="300"
                  step="0.1"
                  placeholder="70"
                  value={params.weightKg}
                  onChange={(e) =>
                    setParams({ ...params, weightKg: e.target.value })
                  }
                  required
                />

                <Input
                  label="Età"
                  type="number"
                  min="10"
                  max="100"
                  placeholder="30"
                  value={params.age}
                  onChange={(e) =>
                    setParams({ ...params, age: e.target.value })
                  }
                  required
                />

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: theme.spacing[2],
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}>
                    Sesso
                  </label>
                  <select
                    value={params.gender}
                    onChange={(e) =>
                      setParams({ ...params, gender: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`,
                      fontSize: theme.typography.fontSize.base,
                      fontFamily: theme.typography.fontFamily.base,
                      cursor: "pointer",
                    }}>
                    <option value="male">Maschio</option>
                    <option value="female">Femmina</option>
                  </select>
                </div>
              </div>

              <div style={buttonGroupStyle}>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => handleNextStep(2)}
                  disabled={!hasValidParams}>
                  Continua →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Intervalli */}
          {currentStep === 2 && (
            <div style={formGroupStyle}>
              <div>
                <h2
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    margin: `0 0 ${theme.spacing[6]} 0`,
                  }}>
                  Configura gli intervalli
                </h2>
                <p style={{ color: theme.colors.text.tertiary, margin: 0 }}>
                  Trascina per riordinare gli intervalli • Modifica velocità e
                  inclinazione
                </p>
              </div>

              {/* Intervalli Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing[3],
                }}>
                {intervals.map((interval, index) => (
                  <div
                    key={index}
                    style={intervalCardStyle(draggedIndex === index)}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}>
                    <div style={intervalHeaderStyle}>
                      <span style={dragHandleStyle}>⋮⋮</span>
                      <span
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.primary[600],
                        }}>
                        Intervallo {index + 1}
                      </span>
                      {intervals.length > 1 && (
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => removeInterval(index)}
                          style={{ marginLeft: "auto" }}>
                          ✕
                        </Button>
                      )}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: theme.spacing[3],
                      }}>
                      <Input
                        label="Durata (min)"
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={interval.durationMinutes}
                        onChange={(e) =>
                          updateInterval(index, "durationMinutes", e.target.value)
                        }
                      />

                      <Input
                        label="Velocità (km/h)"
                        type="number"
                        step="0.1"
                        min="1"
                        max="30"
                        value={interval.speedKmh}
                        onChange={(e) =>
                          updateInterval(index, "speedKmh", e.target.value)
                        }
                      />

                      <Input
                        label="Inclinazione (%)"
                        type="number"
                        step="0.5"
                        min="0"
                        max="30"
                        value={interval.inclinePercent}
                        onChange={(e) =>
                          updateInterval(
                            index,
                            "inclinePercent",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={addInterval}
                style={{ width: "100%" }}>
                ➕ Aggiungi intervallo
              </Button>

              {/* Preview Kcal */}
              {hasValidData && (
                <div style={kcalDisplayStyle}>
                  <p style={kcalValueStyle}>{totalKcal.toFixed(0)}</p>
                  <p style={kcalLabelStyle}>Calorie stimate</p>
                </div>
              )}

              {/* Grafico */}
              {chartPoints.length > 0 && (
                <div
                  style={{
                    backgroundColor: theme.colors.white,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing[4],
                    boxShadow: theme.shadows.sm,
                  }}>
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      margin: `0 0 ${theme.spacing[4]} 0`,
                    }}>
                    📊 Andamento consumo calorie
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartPoints}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.colors.border}
                      />
                      <XAxis
                        dataKey="second"
                        stroke={theme.colors.text.tertiary}
                        style={{ fontSize: "12px" }}
                        tickFormatter={(sec) => `${(sec / 60).toFixed(0)}m`}
                      />
                      <YAxis
                        stroke={theme.colors.success[500]}
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme.colors.white,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: theme.borderRadius.md,
                          boxShadow: theme.shadows.lg,
                        }}
                        cursor={{
                          stroke: theme.colors.success[200],
                          strokeWidth: 2,
                        }}
                        formatter={(value) => value.toFixed(1)}
                      />
                      <Line
                        type="monotone"
                        dataKey="kcalCumulative"
                        stroke={theme.colors.success[500]}
                        strokeWidth={3}
                        dot={false}
                        name="Kcal cumulative"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div style={buttonGroupStyle}>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => handleNextStep(1)}>
                  ← Indietro
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => handleNextStep(3)}
                  disabled={!hasValidData}>
                  Riepilogo →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Riepilogo */}
          {currentStep === 3 && (
            <div style={formGroupStyle}>
              <div>
                <h2
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    margin: `0 0 ${theme.spacing[6]} 0`,
                  }}>
                  Riepilogo sessione
                </h2>
                <p style={{ color: theme.colors.text.tertiary, margin: 0 }}>
                  Controlla i dati prima di salvare
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: theme.spacing[4],
                }}>
                <Card variant="bordered">
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}>
                      Peso
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize["2xl"],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary[600],
                      }}>
                      {params.weightKg} kg
                    </div>
                  </div>
                </Card>

                <Card variant="bordered">
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}>
                      Età
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize["2xl"],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary[600],
                      }}>
                      {params.age} anni
                    </div>
                  </div>
                </Card>

                <Card variant="bordered">
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}>
                      Intervalli
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize["2xl"],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary[600],
                      }}>
                      {intervals.length}
                    </div>
                  </div>
                </Card>

                <Card variant="bordered">
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}>
                      Durata
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize["2xl"],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary[600],
                      }}>
                      {computedIntervals.length > 0 ? Math.floor(
                        computedIntervals[computedIntervals.length - 1].endSecond / 60
                      ) : 0}
                      m
                    </div>
                  </div>
                </Card>
              </div>

              {/* Kcal finale */}
              <div style={kcalDisplayStyle}>
                <p style={kcalValueStyle}>{totalKcal.toFixed(0)}</p>
                <p style={kcalLabelStyle}>Calorie totali stimate</p>
              </div>

              <div style={buttonGroupStyle}>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => handleNextStep(2)}>
                  ← Indietro
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  loading={loading}>
                  {loading ? "Salvataggio..." : "💾 Salva sessione"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
