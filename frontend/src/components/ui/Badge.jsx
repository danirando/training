import { theme } from "../../styles/theme";

/**
 * Badge Component
 *
 * @param {string} variant - 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'gray' (default: 'primary')
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {ReactNode} icon - Icon component (left side, optional)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Badge content
 */
export function Badge({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
}) {
  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary[50],
      color: theme.colors.primary[700],
      borderColor: theme.colors.primary[200],
    },
    secondary: {
      backgroundColor: theme.colors.secondary[50],
      color: theme.colors.secondary[700],
      borderColor: theme.colors.secondary[200],
    },
    success: {
      backgroundColor: theme.colors.success[50],
      color: theme.colors.success[700],
      borderColor: theme.colors.success[200],
    },
    error: {
      backgroundColor: theme.colors.error[50],
      color: theme.colors.error[700],
      borderColor: theme.colors.error[200],
    },
    warning: {
      backgroundColor: theme.colors.warning[50],
      color: theme.colors.warning[700],
      borderColor: theme.colors.warning[200],
    },
    gray: {
      backgroundColor: theme.colors.gray[100],
      color: theme.colors.gray[700],
      borderColor: theme.colors.gray[200],
    },
  };

  const sizeStyles = {
    sm: {
      paddingLeft: theme.spacing[2],
      paddingRight: theme.spacing[2],
      paddingTop: theme.spacing[1],
      paddingBottom: theme.spacing[1],
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.semibold,
      height: "20px",
    },
    md: {
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      paddingTop: theme.spacing[1],
      paddingBottom: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      height: "24px",
    },
    lg: {
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[2],
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      height: "32px",
    },
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[1],
    fontFamily: theme.typography.fontFamily.base,
    borderRadius: theme.borderRadius.full,
    border: `1px solid ${variantStyles[variant].borderColor}`,
    whiteSpace: "nowrap",
    userSelect: "none",

    // Variant styles
    ...variantStyles[variant],

    // Size styles
    ...sizeStyles[size],
  };

  const iconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
  };

  return (
    <span style={badgeStyle} className={className}>
      {icon && <span style={iconWrapperStyle}>{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
