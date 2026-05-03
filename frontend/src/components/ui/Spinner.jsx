import { theme } from "../../styles/theme";

/**
 * Spinner Component - Loading state indicator
 *
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} variant - 'primary' | 'secondary' | 'gray' (default: 'primary')
 * @param {string} className - Additional CSS classes
 */
export function Spinner({ size = "md", variant = "primary", className = "" }) {
  const sizeMap = {
    sm: "20px",
    md: "32px",
    lg: "48px",
  };

  const colorMap = {
    primary: theme.colors.primary[500],
    secondary: theme.colors.secondary[500],
    gray: theme.colors.gray[400],
  };

  const spinnerSize = sizeMap[size];
  const spinnerColor = colorMap[variant];

  const containerStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spinnerSize,
    height: spinnerSize,
  };

  const keyframes = `
    @keyframes spinner-rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes spinner-dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `;

  const svgStyle = {
    animation: "spinner-rotate 2s linear infinite",
    width: spinnerSize,
    height: spinnerSize,
  };

  const circleStyle = {
    animation: "spinner-dash 1.5s ease-in-out infinite",
    strokeLinecap: "round",
    stroke: spinnerColor,
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle} className={className}>
        <svg
          viewBox="0 0 50 50"
          style={svgStyle}
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            style={circleStyle}
          />
        </svg>
      </div>
    </>
  );
}

/**
 * SkeletonLoader Component - Placeholder for loading content
 *
 * @param {number} lines - Number of skeleton lines (default: 3)
 * @param {boolean} rounded - Rounded corners (default: false)
 */
export function SkeletonLoader({ lines = 3, rounded = false }) {
  const skeletonLineStyle = {
    height: "16px",
    backgroundColor: theme.colors.gray[200],
    borderRadius: rounded ? theme.borderRadius.full : theme.borderRadius.sm,
    marginBottom: theme.spacing[3],
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",

    "&:last-child": {
      marginBottom: 0,
    },
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              ...skeletonLineStyle,
              marginBottom: i < lines - 1 ? theme.spacing[3] : 0,
              width: i === lines - 1 ? "80%" : "100%",
            }}
          />
        ))}
      </div>
    </>
  );
}

/**
 * LoadingOverlay Component - Overlay with spinner
 *
 * @param {boolean} visible - Show/hide overlay
 * @param {string} message - Loading message text
 */
export function LoadingOverlay({
  visible = false,
  message = "Caricamento...",
}) {
  if (!visible) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20, 24, 36, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing[4],
    zIndex: theme.zIndex.modal,
    backdropFilter: "blur(2px)",
  };

  const messageStyle = {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.base,
  };

  return (
    <div style={overlayStyle}>
      <Spinner size="lg" variant="primary" />
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
}

export default Spinner;
