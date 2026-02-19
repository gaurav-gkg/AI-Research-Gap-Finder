import React from "react";
import { useHistory } from "../contexts/HistoryContext";

/* ── SVG Icons ── */
const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="50%" stopColor="#c58af9" />
        <stop offset="100%" stopColor="#e91e63" />
      </linearGradient>
    </defs>
    <path
      d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5Z"
      fill="url(#starGrad)"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8ab4f8"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  >
    <path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const GearIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  const { recentItems } = useHistory();
  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: GridIcon },
    { id: "analyze", label: "Analyze Paper", Icon: SearchIcon },
    { id: "history", label: "Previous Analyses", Icon: ClockIcon },
    { id: "documents", label: "My Documents", Icon: FolderIcon },
    { id: "exports", label: "Exports", Icon: DownloadIcon },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header with Menu Toggle */}
      <div className="sidebar-header">
        <button
          className="menu-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        {!isCollapsed && (
          <div className="sidebar-logo">
            <StarIcon />
            <span className="sidebar-logo-text">ResearchAI</span>
          </div>
        )}
      </div>

      {/* New Analysis Button */}
      {!isCollapsed && (
        <div className="sidebar-new-btn">
          <button onClick={() => setActiveTab("analyze")}>
            <PlusIcon />
            New Analysis
          </button>
        </div>
      )}

      {/* Navigation */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {!isCollapsed && (
          <div className="sidebar-section-label">Navigation</div>
        )}
        {navItems.map((item) => {
          const { Icon } = item;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <Icon />
              {!isCollapsed && item.label}
            </button>
          );
        })}

        {/* Recent Section */}
        {!isCollapsed && (
          <>
            <div className="sidebar-section-label" style={{ marginTop: 8 }}>
              Recent
            </div>
            {recentItems.length === 0 ? (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-ter)",
                  padding: "4px 12px",
                }}
              >
                No recent analyses
              </div>
            ) : (
              recentItems.map((item, i) => (
                <button
                  key={i}
                  className="sidebar-recent-item"
                  onClick={() => setActiveTab("history")}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.text}
                  </span>
                </button>
              ))
            )}
          </>
        )}

        {/* Settings */}
        <button
          className={`sidebar-nav-item ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
          style={{ marginTop: 8 }}
          title={isCollapsed ? "Settings" : ""}
        >
          <GearIcon />
          {!isCollapsed && "Settings"}
        </button>
      </div>

      {/* Bottom Plan Card */}
      {!isCollapsed && (
        <div className="sidebar-bottom">
          <div className="sidebar-plan-card">
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#e3e3e3" }}>
                Free Plan
              </div>
              <div style={{ fontSize: 12, color: "#5f6368", marginTop: 2 }}>
                0 docs analyzed
              </div>
            </div>
            <span className="sidebar-plan-badge">FREE</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
