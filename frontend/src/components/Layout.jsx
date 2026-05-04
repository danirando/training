import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { theme } from "../styles/theme";
import { Button } from "./ui/Button";

/**
 * Layout Component
 * Main layout wrapper with sidebar, header, and content area
 */
export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      label: "Nuova sessione",
      href: "/workout",
      icon: "🏃",
    },
  ];

  const isActive = (href) => location.pathname === href;

  // ============================================================================
  // STYLES
  // ============================================================================

  const containerStyle = {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: theme.colors.background,
    fontFamily: theme.typography.fontFamily.base,
  };

  const sidebarStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: "260px",
    backgroundColor: theme.colors.white,
    borderRight: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.sm,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,
    zIndex: theme.zIndex.sticky,
    overflowY: "auto",
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",

    // Mobile responsiveness
    "@media (max-width: 768px)": {
      width: "100%",
    },
  };

  const mainAreaStyle = {
    flex: 1,
    marginLeft: sidebarOpen ? "260px" : "0",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: theme.colors.background,
    transition: `margin-left ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,

    // Mobile responsiveness
    "@media (max-width: 768px)": {
      marginLeft: 0,
    },
  };

  const headerStyle = {
    height: "64px",
    backgroundColor: theme.colors.white,
    borderBottom: `1px solid ${theme.colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows.sm,
    zIndex: theme.zIndex.sticky - 1,
  };

  const headerContentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing[4],
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingLeft: theme.spacing[6],
    paddingRight: theme.spacing[6],
    boxSizing: "border-box",

    "@media (max-width: 768px)": {
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      gap: theme.spacing[2],
    },
  };

  const headerCenterStyle = {
    flex: 1,
    textAlign: "center",

    "@media (max-width: 768px)": {
      flex: "none",
      textAlign: "left",
    },
  };

  const headerLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[4],

    "@media (max-width: 768px)": {
      gap: theme.spacing[2],
    },
  };

  const headerRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[2],
    flexShrink: 0,

    "@media (max-width: 768px)": {
      gap: theme.spacing[1],
    },
  };

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[1],
    maxWidth: "150px",

    "@media (max-width: 768px)": {
      display: "none",
    },
  };

  const userNameStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const userEmailStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[6],
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",

    "@media (max-width: 768px)": {
      paddingTop: theme.spacing[4],
      paddingBottom: theme.spacing[4],
    },
  };

  const hamburgerStyle = {
    display: "none",
    width: "40px",
    height: "40px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray[100],
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.lg,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,

    "@media (max-width: 768px)": {
      display: "flex",
    },
  };

  const sidebarLogoStyle = {
    padding: theme.spacing[6],
    borderBottom: `1px solid ${theme.colors.border}`,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[3],
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[600],
  };

  const sidebarNavStyle = {
    padding: theme.spacing[4],
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[2],
  };

  const navItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[3],
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.md,
    cursor: "pointer",
    backgroundColor: active ? theme.colors.primary[50] : "transparent",
    color: active ? theme.colors.primary[600] : theme.colors.text.primary,
    border: `1px solid ${active ? theme.colors.primary[200] : "transparent"}`,
    transition: `all ${theme.transitions.duration.base} ${theme.transitions.timing.easeInOut}`,

    "&:hover": {
      backgroundColor: active
        ? theme.colors.primary[100]
        : theme.colors.gray[50],
    },
  });

  // ============================================================================
  // MEDIA QUERY HOOK (simple CSS-in-JS approach)
  // ============================================================================

  const applyMediaQueries = () => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @media (max-width: 768px) {
          [data-sidebar] {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 100%;
            z-index: ${theme.zIndex.modal};
            transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"};
          }

          [data-main-area] {
            margin-left: 0 !important;
          }
        }
      `;
      document.head.appendChild(style);

      return () => document.head.removeChild(style);
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div style={containerStyle}>
      {/* SIDEBAR */}
      <nav
        style={sidebarStyle}
        data-sidebar
        onClick={(e) => {
          // Close sidebar on mobile when clicking a nav item
          if (window.innerWidth <= 768 && e.target.closest("[data-nav-item]")) {
            setSidebarOpen(false);
          }
        }}>
        {/* Logo */}
        <div style={sidebarLogoStyle}>
          <span>🏋️</span>
          <span>Treadmill</span>
        </div>

        {/* Navigation Items */}
        <div style={sidebarNavStyle}>
          {navigationItems.map((item) => (
            <div
              key={item.href}
              data-nav-item
              style={navItemStyle(isActive(item.href))}
              onClick={() => navigate(item.href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(item.href);
                }
              }}>
              <span style={{ fontSize: theme.typography.fontSize.lg }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* MAIN AREA */}
      <div style={mainAreaStyle} data-main-area>
        {/* HEADER */}
        <header style={headerStyle}>
          <div style={headerContentStyle}>
            <div style={headerLeftStyle}>
              {/* Hamburger Menu (Mobile) */}
              <button
                style={hamburgerStyle}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
                title={sidebarOpen ? "Chiudi menu" : "Apri menu"}>
                ☰
              </button>
            </div>

            {/* Header Title */}
            <div style={headerCenterStyle}>
              <h1
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                  margin: 0,

                  "@media (max-width: 768px)": {
                    fontSize: theme.typography.fontSize.lg,
                  },
                }}>
                Treadmill Tracker
              </h1>
            </div>

            {/* User Info & Logout */}
            <div style={headerRightStyle}>
              {user && (
                <div style={userInfoStyle}>
                  <div style={userNameStyle}>{user.name}</div>
                  <div style={userEmailStyle}>{user.email}</div>
                </div>
              )}

              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={contentStyle}>{children}</main>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: theme.zIndex.sticky - 2,
            display: "none",

            "@media (max-width: 768px)": {
              display: "block",
            },
          }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Layout;
