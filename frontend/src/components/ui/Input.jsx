import { theme } from "../../styles/theme";

/**
 * Input Component
 *
 * @param {string} label - Label text
 * @param {string} error - Error message
 * @param {ReactNode} icon - Icon component or SVG (left side)
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {boolean} disabled - Input disabled state
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type (default: 'text')
 * @param {...rest} rest - Other HTML input props (onChange, value, etc.)
 */
export function Input({
  label,
  error,
  icon,
  size = "md",
  disabled = false,
  placeholder,
  type = "text",
  ...rest
}) {
  const sizeStyles = {
    sm: {
      height: theme.sizes.input.sm,
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      height: theme.sizes.input.md,
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      height: theme.sizes.input.lg,
      paddingLeft: theme.spacing[5],
      paddingRight: theme.spacing[5],
      fontSize: theme.typography.fontSize.lg,
    },
  };

  const iconPaddingLeft =
    icon && size === "sm"
      ? theme.spacing[9]
      : icon && size === "md"
        ? theme.spacing[10]
        : icon && size === "lg"
          ? theme.spacing[12]
          : undefined;

  const inputStyle = {
    display: "block",
    width: "100%",
    fontFamily: theme.typography.fontFamily.base,
    backgroundColor: disabled ? theme.colors.gray[50] : theme.colors.white,
    color: disabled ? theme.colors.gray[400] : theme.colors.text.primary,
    border: `1px solid ${error ? theme.colors.error[500] : theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    boxShadow: theme.shadows.none,
    cursor: disabled ? "not-allowed" : "text",

    // Size styles
    ...sizeStyles[size],

    // Icon padding
    ...(icon && { paddingLeft: iconPaddingLeft }),

    // Focus state
    "&:focus": {
      outline: "none",
      borderColor: error ? theme.colors.error[500] : theme.colors.primary[500],
      boxShadow: error
        ? `0 0 0 3px ${theme.colors.error[50]}`
        : `0 0 0 3px ${theme.colors.primary[50]}`,
    },

    // Disabled state
    opacity: disabled ? 0.6 : 1,
  };

  const labelStyle = {
    display: "block",
    marginBottom: theme.spacing[2],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: disabled ? theme.colors.gray[400] : theme.colors.text.primary,
    ...theme.typography.styles.label,
  };

  const errorStyle = {
    display: "block",
    marginTop: theme.spacing[1],
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error[600],
    ...theme.typography.styles.caption,
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
  };

  const iconWrapperStyle = {
    position: "absolute",
    left: theme.spacing[3],
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    color: error ? theme.colors.error[500] : theme.colors.gray[500],
  };

  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={containerStyle}>
        {icon && <div style={iconWrapperStyle}>{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          {...rest}
        />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

export default Input;
