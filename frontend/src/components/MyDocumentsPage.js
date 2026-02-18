import React, { useState } from "react";

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

const GridViewIcon = () => (
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
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListViewIcon = () => (
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
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const PdfIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f28b82"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const DocxIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8ab4f8"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
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

const UploadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/* ── Mock data ── */
const mockDocs = [];

function MyDocumentsPage({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  const filtered = mockDocs.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalSize = "0 MB";

  return (
    <div className="anim-hero">
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">My Documents</h1>
        <p className="page-subtitle">
          Manage your uploaded research papers and documents.
        </p>
      </div>

      {/* Stats Strip */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 20 }}
      >
        <div
          className="page-card"
          style={{ padding: "16px 20px", textAlign: "center" }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 600, color: "var(--text-pri)" }}
          >
            {mockDocs.length}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-sec)", marginTop: 2 }}>
            Total Documents
          </div>
        </div>
        <div
          className="page-card"
          style={{ padding: "16px 20px", textAlign: "center" }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 600, color: "var(--text-pri)" }}
          >
            {totalSize}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-sec)", marginTop: 2 }}>
            Storage Used
          </div>
        </div>
        <div
          className="page-card"
          style={{ padding: "16px 20px", textAlign: "center" }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 600, color: "var(--text-pri)" }}
          >
            {mockDocs.reduce((s, d) => s + d.analyses, 0)}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-sec)", marginTop: 2 }}>
            Total Analyses
          </div>
        </div>
      </div>

      {/* Search + View Toggle */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div className="page-search-bar" style={{ flex: 1 }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="page-action-btn"
          onClick={() => setActiveTab && setActiveTab("analyze")}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <UploadIcon /> Upload
        </button>
        <div
          style={{
            display: "flex",
            border: "1px solid var(--border2)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <button
            className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <GridViewIcon />
          </button>
          <button
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <ListViewIcon />
          </button>
        </div>
      </div>

      {/* Documents */}
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
            No documents found
          </div>
          <div style={{ fontSize: 13.5, color: "var(--text-ter)" }}>
            Upload a research paper to get started.
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="docs-grid">
          {filtered.map((doc) => (
            <div key={doc.id} className="page-card doc-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 0 12px",
                }}
              >
                {doc.ext === "pdf" ? <PdfIcon /> : <DocxIcon />}
              </div>
              <div style={{ padding: "0 16px 16px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-pri)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 6,
                  }}
                >
                  {doc.name}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--text-ter)",
                    marginBottom: 10,
                  }}
                >
                  {doc.size} · {doc.uploaded}
                </div>
                <div
                  style={{ display: "flex", gap: 6, justifyContent: "center" }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 10px",
                      borderRadius: 20,
                      background:
                        doc.analyses > 0
                          ? "rgba(138,180,248,0.12)"
                          : "var(--surface2)",
                      color:
                        doc.analyses > 0 ? "var(--blue)" : "var(--text-ter)",
                    }}
                  >
                    {doc.analyses} analyses
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <button className="icon-action-btn" title="Download">
                    <DownloadIcon />
                  </button>
                  <button className="icon-action-btn danger" title="Delete">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((doc) => (
            <div key={doc.id} className="page-card analysis-row">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {doc.ext === "pdf" ? <PdfIcon /> : <DocxIcon />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "var(--text-pri)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {doc.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-ter)",
                      marginTop: 2,
                    }}
                  >
                    {doc.size} · {doc.uploaded} · {doc.analyses} analyses
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button className="icon-action-btn" title="Download">
                  <DownloadIcon />
                </button>
                <button className="icon-action-btn danger" title="Delete">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDocumentsPage;
