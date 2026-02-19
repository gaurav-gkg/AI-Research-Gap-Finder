import React, { useState } from "react";
import { useHistory } from "../contexts/HistoryContext";

/* ── SVG Icons ── */
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const FilterIcon = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
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

/* ── Mock data removed — now using HistoryContext — */

function PreviousAnalysesPage({ setActiveTab }) {
  const { analyses, removeAnalysis } = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = analyses.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.paperName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || a.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="anim-hero">
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">Previous Analyses</h1>
        <p className="page-subtitle">
          Browse and revisit your completed research gap analyses.
        </p>
      </div>

      {/* Search + Filter Row */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        <div className="page-search-bar" style={{ flex: 1, minWidth: 240 }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search analyses by title, document name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="page-filter-select">
          <FilterIcon />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Research Gaps">Research Gaps</option>
            <option value="Key Insights">Key Insights</option>
            <option value="Citation Analysis">Citation Analysis</option>
          </select>
          <span className="custom-select-arrow">
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ fontSize: 13, color: "var(--text-sec)", marginBottom: 16 }}>
        {filtered.length} {filtered.length === 1 ? "analysis" : "analyses"}{" "}
        found
      </div>

      {/* Analysis List */}
      {filtered.length === 0 ? (
        <div className="page-card" style={{ padding: 48, textAlign: "center" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--text-sec)",
              marginBottom: 8,
            }}
          >
            No analyses found
          </div>
          <div style={{ fontSize: 13.5, color: "var(--text-ter)" }}>
            Try adjusting your search or filter criteria.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((item) => (
            <div key={item.id} className="page-card analysis-row">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: item.dotColor,
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--text-pri)",
                      marginBottom: 4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span className="analysis-meta-pill">{item.paperName}</span>
                    <span className="analysis-meta-pill">{item.domain}</span>
                    <span
                      className="analysis-meta-pill"
                      style={{
                        background: "rgba(138,180,248,0.1)",
                        color: "var(--blue)",
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="analysis-meta-pill">
                      {item.gapsFound} gaps
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-ter)",
                    marginRight: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.date}
                </span>
                <button className="icon-action-btn" title="View analysis">
                  <EyeIcon />
                </button>
                <button className="icon-action-btn" title="Export">
                  <DownloadIcon />
                </button>
                <button className="icon-action-btn danger" title="Delete" onClick={() => removeAnalysis(item.id)}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button
          className="page-action-btn"
          onClick={() => setActiveTab && setActiveTab("analyze")}
        >
          + New Analysis
        </button>
      </div>
    </div>
  );
}

export default PreviousAnalysesPage;
