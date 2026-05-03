import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "../styles/theme";
import { Input, Button, Card } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Errore durante il login.";
      setError(errorMsg);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // STYLES
  // ============================================================================

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing[4],
    background: `linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.secondary[50]} 100%)`,
    fontFamily: theme.typography.fontFamily.base,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[8],
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.xl,
    animation: shaking ? "shake 0.6s ease-in-out" : "none",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[3],
    marginBottom: theme.spacing[6],
  };

  const logoIconStyle = {
    fontSize: "48px",
    lineHeight: 1,
  };

  const logoTextStyle = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[600],
  };

  const titleStyle = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing[3],
  };

  const subtitleStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    marginBottom: theme.spacing[6],
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[5],
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[2],
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
    animation: shaking ? "shake 0.6s ease-in-out" : "none",
  };

  const footerStyle = {
    marginTop: theme.spacing[6],
    textAlign: "center",
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  };

  const linkStyle = {
    color: theme.colors.primary[600],
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: `color ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    borderBottom: `1px solid transparent`,

    "&:hover": {
      color: theme.colors.primary[700],
      borderBottomColor: theme.colors.primary[600],
    },
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div style={cardStyle}>
          {/* Logo */}
          <div style={logoStyle}>
            <div style={logoIconStyle}>🏋️</div>
            <div style={logoTextStyle}>Treadmill</div>
          </div>

          {/* Title */}
          <h1 style={titleStyle}>Bentornato!</h1>
          <p style={subtitleStyle}>Accedi al tuo account per continuare</p>

          {/* Error Message */}
          {error && (
            <div style={errorStyle}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={formStyle}>
            <Input
              label="Email"
              type="email"
              placeholder="tue@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              loading={loading}
              style={{ width: "100%" }}>
              {loading ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>

          {/* Footer */}
          <div style={footerStyle}>
            Non hai un account?{" "}
            <Link
              to="/register"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = theme.colors.primary[700];
                e.target.style.borderBottomColor = theme.colors.primary[600];
              }}
              onMouseLeave={(e) => {
                e.target.style.color = theme.colors.primary[600];
                e.target.style.borderBottomColor = "transparent";
              }}>
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
