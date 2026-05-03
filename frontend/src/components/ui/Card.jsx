import { theme } from "../../styles/theme";

/**
 * Card Component
 *
 * @param {string} variant - 'default' | 'elevated' | 'bordered' (default: 'default')
 * @param {boolean} interactive - Show hover effect
 * @param {boolean} selected - Selected state
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Card content
 * @param {...rest} rest - Other HTML div props (onClick, etc.)
 */
export function Card({
  variant = "default",
  interactive = false,
  selected = false,
  className = "",
  children,
  ...rest
}) {
  const variantStyles = {
    default: {
      backgroundColor: theme.colors.white,
      border: `1px solid ${selected ? theme.colors.primary[300] : theme.colors.border}`,
      boxShadow: selected ? theme.shadows.base : theme.shadows.none,
    },
    elevated: {
      backgroundColor: theme.colors.white,
      border: `1px solid ${selected ? theme.colors.primary[300] : theme.colors.border}`,
      boxShadow: selected ? theme.shadows.lg : theme.shadows.md,
    },
    bordered: {
      backgroundColor: theme.colors.gray[50],
      border: `2px solid ${selected ? theme.colors.primary[500] : theme.colors.gray[200]}`,
      boxShadow: theme.shadows.none,
    },
  };

  const cardStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    cursor: interactive ? "pointer" : "default",

    // Variant styles
    ...variantStyles[variant],

    // Interactive state
    ...(interactive && {
      "&:hover": {
        boxShadow:
          variant === "bordered"
            ? theme.shadows.base
            : variant === "elevated"
              ? theme.shadows.xl
              : theme.shadows.md,
        transform: "translateY(-2px)",
      },
    }),

    // Selected state
    ...(selected && {
      backgroundColor:
        variant === "bordered" ? theme.colors.primary[50] : theme.colors.white,
    }),
  };

  return (
    <div style={cardStyle} className={className} {...rest}>
      {children}
    </div>
  );
}

export default Card;
