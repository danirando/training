import { theme } from "../../styles/theme";

/**
 * Button Component
 *
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'ghost' (default: 'primary')
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {boolean} disabled - Button disabled state
 * @param {boolean} loading - Show loading state
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Button content
 * @param {...rest} rest - Other HTML button props (onClick, type, etc.)
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  children,
  ...rest
}) {
  const variantStyles = {
    primary: {
      backgroundColor: disabled
        ? theme.colors.gray[200]
        : theme.colors.primary[500],
      color: theme.colors.text.inverse,
      border: `1px solid ${disabled ? theme.colors.gray[300] : theme.colors.primary[600]}`,
      "&:hover": {
        backgroundColor: disabled
          ? theme.colors.gray[200]
          : theme.colors.primary[600],
      },
      "&:active": {
        backgroundColor: disabled
          ? theme.colors.gray[200]
          : theme.colors.primary[700],
      },
    },
    secondary: {
      backgroundColor: disabled
        ? theme.colors.gray[100]
        : theme.colors.gray[100],
      color: disabled ? theme.colors.gray[400] : theme.colors.primary[600],
      border: `1px solid ${disabled ? theme.colors.gray[200] : theme.colors.gray[300]}`,
      "&:hover": {
        backgroundColor: disabled
          ? theme.colors.gray[100]
          : theme.colors.gray[200],
      },
      "&:active": {
        backgroundColor: disabled
          ? theme.colors.gray[100]
          : theme.colors.gray[300],
      },
    },
    danger: {
      backgroundColor: disabled
        ? theme.colors.gray[200]
        : theme.colors.error[500],
      color: theme.colors.text.inverse,
      border: `1px solid ${disabled ? theme.colors.gray[300] : theme.colors.error[600]}`,
      "&:hover": {
        backgroundColor: disabled
          ? theme.colors.gray[200]
          : theme.colors.error[600],
      },
      "&:active": {
        backgroundColor: disabled
          ? theme.colors.gray[200]
          : theme.colors.error[700],
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: disabled ? theme.colors.gray[400] : theme.colors.text.primary,
      border: `1px solid ${disabled ? theme.colors.gray[300] : theme.colors.gray[300]}`,
      "&:hover": {
        backgroundColor: disabled ? "transparent" : theme.colors.gray[100],
      },
      "&:active": {
        backgroundColor: disabled ? "transparent" : theme.colors.gray[200],
      },
    },
  };

  const sizeStyles = {
    sm: {
      height: theme.sizes.button.sm,
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
    },
    md: {
      height: theme.sizes.button.md,
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    lg: {
      height: theme.sizes.button.lg,
      paddingLeft: theme.spacing[6],
      paddingRight: theme.spacing[6],
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
    },
  };

  const buttonStyle = {
    // Base styles
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.base,
    borderRadius: theme.borderRadius.md,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    border: "none",
    boxShadow: theme.shadows.none,
    whiteSpace: "nowrap",
    userSelect: "none",

    // Variant styles
    ...variantStyles[variant],

    // Size styles
    ...sizeStyles[size],

    // Focus state
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      boxShadow: theme.shadows.focus,
    },

    // Disabled state
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      className={className}
      {...rest}>
      {loading && <Spinner size="sm" variant={variant} />}
      {children}
    </button>
  );
}

/**
 * Mini spinner for button loading state
 */
function Spinner({ size = "sm", variant = "primary" }) {
  const spinnerSize = size === "sm" ? "14px" : "18px";
  const spinnerColor =
    variant === "ghost" ? theme.colors.primary[500] : "currentColor";

  return (
    <svg
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={spinnerColor}
      strokeWidth="2"
      style={{
        animation: "spin 1s linear infinite",
      }}>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

export default Button;
