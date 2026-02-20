import React from "react";
import HeroSection from "./HeroSection";
import SuggestionChips from "./SuggestionChips";
import { useHistory } from "../contexts/HistoryContext";
import { useAuth } from "../contexts/AuthContext";

/* ── SVG Icons ── */
const DocIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TrendUpIcon = () => (
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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BarChartIcon = () => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

/* ── Stats Card ── */
const StatCard = ({ icon, label, value, change, changeColor, accentColor }) => (
  <div className="page-card" style={{ padding: "20px 24px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: `${accentColor}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accentColor,
        }}
      >
        {icon}
      </div>
      {change && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: changeColor || "var(--green)",
            background: `${changeColor || "var(--green)"}15`,
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          {change}
        </span>
      )}
    </div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 600,
        color: "var(--text-pri)",
        marginBottom: 4,
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 13, color: "var(--text-sec)" }}>{label}</div>
  </div>
);

/* ── Activity Item ── */
const ActivityItem = ({ color, title, time, type }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      borderBottom: "1px solid var(--border)",
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
      }}
    />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--text-pri)",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-ter)", marginTop: 2 }}>
        {time}
      </div>
    </div>
    <span
      style={{
        fontSize: 11.5,
        padding: "3px 10px",
        borderRadius: 20,
        background: "var(--surface2)",
        color: "var(--text-sec)",
      }}
    >
      {type}
    </span>
  </div>
);

/* ── Bar Chart (simple visual) ── */
const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 100,
        paddingTop: 8,
      }}
    >
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            gap: 6,
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: 6,
              height: `${(d.value / max) * 80}px`,
              background: `linear-gradient(180deg, var(--blue), var(--purple))`,
              opacity: 0.7 + (d.value / max) * 0.3,
              transition: "height 0.6s ease",
            }}
          />
          <span style={{ fontSize: 10, color: "var(--text-ter)" }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Domain Breakdown ── */
const DomainBreakdown = ({ items }) =>
  items.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        padding: "24px 0",
        color: "var(--text-ter)",
        fontSize: 13,
      }}
    >
      No domain data yet.
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--text-pri)" }}>
              {item.label}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-sec)" }}>
              {item.count} papers
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "var(--surface3)",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 2,
                background: item.color,
                width: `${item.pct}%`,
                transition: "width 0.8s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

function DashboardPage() {
  const { analyses, documents, dbReady } = useHistory();
  const { user } = useAuth();

  // Weekly activity: count analyses per day of the current week
  const weeklyData = React.useMemo(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    analyses.forEach((a) => {
      const d = new Date(a.created_at || a.date);
      if (d >= weekStart) {
        const key = dayNames[d.getDay()];
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return dayNames.map((d) => ({ label: d, value: counts[d] }));
  }, [analyses]);

  // Domain breakdown derived from analyses
  const domains = React.useMemo(() => {
    const domainColors = [
      "var(--blue)",
      "var(--purple)",
      "var(--green)",
      "var(--yellow)",
      "#f97316",
    ];
    const map = {};
    analyses.forEach((a) => {
      const key = a.domain || "General";
      map[key] = (map[key] || 0) + 1;
    });
    const total = analyses.length || 1;
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count], i) => ({
        label,
        count,
        pct: Math.round((count / total) * 100),
        color: domainColors[i % domainColors.length],
      }));
  }, [analyses]);

  // Recent activity items from analyses
  const recentActivity = React.useMemo(() => {
    const dotColors = [
      "var(--blue)",
      "var(--purple)",
      "var(--green)",
      "var(--yellow)",
      "#f97316",
    ];
    return analyses.slice(0, 5).map((a, i) => ({
      color: a.dot_color || dotColors[i % dotColors.length],
      title: a.title || a.paper_name || "Untitled",
      time: a.created_at
        ? new Date(a.created_at).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : a.date || "",
      type: a.type || "Analysis",
    }));
  }, [analyses]);

  const totalGaps = analyses.reduce((acc, a) => acc + (a.gaps_found || 0), 0);
  const thisWeekCount = weeklyData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="anim-hero">
      {/* Hero Section */}
      <HeroSection />
      <SuggestionChips />

      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="page-title">
          {user ? `Welcome back, ${user.given_name || user.name}` : "Dashboard"}
        </h1>
        <p className="page-subtitle">
          Your research analysis overview at a glance.
        </p>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <StatCard
          icon={<DocIcon />}
          label="Documents Analyzed"
          value={dbReady ? analyses.length : "…"}
          change={`+${thisWeekCount} this week`}
          changeColor="var(--green)"
          accentColor="var(--blue)"
        />
        <StatCard
          icon={<CheckCircleIcon />}
          label="Gaps Identified"
          value={dbReady ? totalGaps : "…"}
          accentColor="var(--green)"
        />
        <StatCard
          icon={<ClockIcon />}
          label="Documents Stored"
          value={dbReady ? documents.length : "…"}
          accentColor="var(--purple)"
        />
        <StatCard
          icon={<TrendUpIcon />}
          label="Last Analyzed"
          value={
            analyses.length > 0
              ? new Date(
                  analyses[0].created_at || analyses[0].date,
                ).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "—"
          }
          accentColor="var(--yellow)"
        />
      </div>

      {/* Two Column Row */}
      <div className="two-col-grid" style={{ marginTop: 20 }}>
        {/* Weekly Activity Chart */}
        <div className="page-card" style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <BarChartIcon />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-pri)",
              }}
            >
              Weekly Activity
            </span>
          </div>
          <MiniBarChart data={weeklyData} />
        </div>

        {/* Domain Breakdown */}
        <div className="page-card" style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <StarIcon />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-pri)",
              }}
            >
              Domain Breakdown
            </span>
          </div>
          <DomainBreakdown items={domains} />
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="page-card"
        style={{ padding: "20px 24px", marginTop: 20 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ClockIcon />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-pri)",
              }}
            >
              Recent Activity
            </span>
          </div>
          <span
            style={{ fontSize: 12, color: "var(--blue)", cursor: "pointer" }}
          >
            View all
          </span>
        </div>
        {recentActivity.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "24px 0",
              color: "var(--text-ter)",
              fontSize: 13,
            }}
          >
            No analyses yet. Run your first analysis to see activity here.
          </div>
        ) : (
          recentActivity.map((item, i) => <ActivityItem key={i} {...item} />)
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
