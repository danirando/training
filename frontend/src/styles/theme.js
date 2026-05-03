/**
 * Design System - Linear/Vercel inspired
 * Base unit: 4px
 */

export const theme = {
  // ============================================================================
  // COLOR PALETTE
  // ============================================================================
  colors: {
    // Primary - Blue (main brand color)
    primary: {
      50: "#F0F4FF",
      100: "#E0E9FF",
      200: "#C7D9FF",
      300: "#A8C4FF",
      400: "#7BA3FF",
      500: "#5B7EFF", // Main primary
      600: "#4862FF",
      700: "#3B4EFF",
      800: "#2D3FD6",
      900: "#1F2BA8",
    },

    // Secondary - Purple (accent color)
    secondary: {
      50: "#F8F3FF",
      100: "#F0E5FF",
      200: "#E0CCFF",
      300: "#D1B3FF",
      400: "#B88AFF",
      500: "#A061FF", // Main secondary
      600: "#8B48FF",
      700: "#7B35FF",
      800: "#6A27E3",
      900: "#4A1B99",
    },

    // Grays - Neutral (backgrounds, text, borders)
    gray: {
      50: "#FAFBFC",
      100: "#F5F6F7",
      200: "#E8EAED",
      300: "#DCDFE3",
      400: "#C1C7CE",
      500: "#8B92A1", // Main gray
      600: "#6B7280",
      700: "#4B5563",
      800: "#2F3544",
      900: "#141824",
    },

    // Success - Green
    success: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E", // Main success
      600: "#16A34A",
      700: "#15803D",
      800: "#166534",
      900: "#145231",
    },

    // Error - Red
    error: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#F87171",
      500: "#EF4444", // Main error
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },

    // Warning - Amber
    warning: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B", // Main warning
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },

    // Semantic colors
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",

    // Contextual
    background: "#FAFBFC",
    surface: "#FFFFFF",
    border: "#E8EAED",
    text: {
      primary: "#141824",
      secondary: "#4B5563",
      tertiary: "#8B92A1",
      disabled: "#DCDFE3",
      inverse: "#FFFFFF",
    },
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  typography: {
    // Font family stack
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },

    // Font sizes (px)
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
    },

    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line heights (unitless ratio)
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    // Letter spacing (px)
    letterSpacing: {
      tight: "-0.02em",
      normal: "0em",
      wide: "0.02em",
      wider: "0.04em",
    },

    // Text styles (pre-composed)
    styles: {
      // Headings
      h1: {
        fontSize: "48px",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontSize: "30px",
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h4: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "0em",
      },
      h5: {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0em",
      },

      // Body text
      body: {
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0em",
      },
      bodySm: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0em",
      },
      bodyXs: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0em",
      },

      // Labels & UI
      label: {
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      },
      labelSm: {
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      },

      // Captions
      caption: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: "0em",
      },
    },
  },

  // ============================================================================
  // SPACING (base unit: 4px)
  // ============================================================================
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    32: "128px",
  },

  // ============================================================================
  // BORDER RADIUS
  // ============================================================================
  borderRadius: {
    none: "0px",
    sm: "4px",
    base: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    "3xl": "24px",
    full: "9999px",
  },

  // ============================================================================
  // SHADOWS (depth-based, inspired by Material Design)
  // ============================================================================
  shadows: {
    // No shadow (flat)
    none: "none",

    // Subtle shadows for elevation
    sm: "0 1px 2px 0 rgba(20, 24, 36, 0.05)",
    base: "0 1px 3px 0 rgba(20, 24, 36, 0.08), 0 1px 2px 0 rgba(20, 24, 36, 0.06)",
    md: "0 4px 6px -1px rgba(20, 24, 36, 0.1), 0 2px 4px -1px rgba(20, 24, 36, 0.06)",
    lg: "0 10px 15px -3px rgba(20, 24, 36, 0.1), 0 4px 6px -2px rgba(20, 24, 36, 0.05)",
    xl: "0 20px 25px -5px rgba(20, 24, 36, 0.1), 0 10px 10px -5px rgba(20, 24, 36, 0.04)",
    "2xl": "0 25px 50px -12px rgba(20, 24, 36, 0.15)",

    // Interactive shadows
    inner: "inset 0 2px 4px 0 rgba(20, 24, 36, 0.06)",
    focus: "0 0 0 3px rgba(91, 126, 255, 0.1), 0 0 0 1px rgba(91, 126, 255, 1)",
    focusSecondary:
      "0 0 0 3px rgba(160, 97, 255, 0.1), 0 0 0 1px rgba(160, 97, 255, 1)",
  },

  // ============================================================================
  // BREAKPOINTS (mobile-first)
  // ============================================================================
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // ============================================================================
  // ANIMATIONS & TRANSITIONS
  // ============================================================================
  transitions: {
    duration: {
      fast: "100ms",
      base: "200ms",
      slow: "300ms",
      slower: "500ms",
    },
    timing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // ============================================================================
  // COMPONENT SIZES (for buttons, inputs, etc.)
  // ============================================================================
  sizes: {
    // Button sizes (height)
    button: {
      xs: "28px",
      sm: "32px",
      md: "40px",
      lg: "48px",
      xl: "56px",
    },

    // Input sizes (height)
    input: {
      sm: "32px",
      md: "40px",
      lg: "48px",
    },

    // Icon sizes (width & height)
    icon: {
      xs: "16px",
      sm: "20px",
      md: "24px",
      lg: "32px",
      xl: "40px",
    },
  },

  // ============================================================================
  // Z-INDEX SCALE
  // ============================================================================
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },

  // ============================================================================
  // HELPERS / UTILITY FUNCTIONS
  // ============================================================================
  utils: {
    // Media query helpers
    media: {
      xs: `@media (min-width: 320px)`,
      sm: `@media (min-width: 640px)`,
      md: `@media (min-width: 768px)`,
      lg: `@media (min-width: 1024px)`,
      xl: `@media (min-width: 1280px)`,
      "2xl": `@media (min-width: 1536px)`,
    },

    // Flexbox helpers
    flex: {
      center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      between: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      col: {
        display: "flex",
        flexDirection: "column",
      },
    },

    // Text truncation
    truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    truncateLines: (lines) => ({
      display: "-webkit-box",
      WebkitLineClamp: lines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }),

    // Visually hidden (a11y)
    srOnly: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    },

    // Clearfix
    clearfix: {
      display: "table",
      clear: "both",

      "&::after": {
        content: '""',
        display: "table",
        clear: "both",
      },
    },

    // Focus visible (outline for keyboard navigation)
    focusVisible: {
      outline: "2px solid",
      outlineColor: "#5B7EFF",
      outlineOffset: "2px",
    },
  },
};

/**
 * USAGE EXAMPLES:
 *
 * // In a CSS-in-JS library (styled-components, emotion, etc.):
 * import { theme } from './styles/theme';
 *
 * const StyledButton = styled.button`
 *   background-color: ${theme.colors.primary[500]};
 *   padding: ${theme.spacing[3]} ${theme.spacing[4]};
 *   border-radius: ${theme.borderRadius.md};
 *   font-weight: ${theme.typography.fontWeight.semibold};
 *   box-shadow: ${theme.shadows.md};
 *   transition: all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut};
 *
 *   &:hover {
 *     box-shadow: ${theme.shadows.lg};
 *   }
 *
 *   &:focus-visible {
 *     outline: 2px solid ${theme.colors.primary[500]};
 *   }
 * `;
 *
 * // For responsive design:
 * const Container = styled.div`
 *   padding: ${theme.spacing[4]};
 *
 *   ${theme.utils.media.md} {
 *     padding: ${theme.spacing[6]};
 *   }
 * `;
 */

export default theme;
