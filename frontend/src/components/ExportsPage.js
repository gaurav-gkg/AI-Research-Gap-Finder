import React, { useState } from "react";

/* ── SVG Icons ── */
const PdfExportIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f28b82"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const DocxExportIcon = () => (
  <svg
    width="22"
    height="22"
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

const CsvIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#81c995"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const JsonIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c58af9"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3H6a2 2 0 00-2 2v2" />
    <path d="M16 3h2a2 2 0 012 2v2" />
    <path d="M8 21H6a2 2 0 01-2-2v-2" />
    <path d="M16 21h2a2 2 0 002-2v-2" />
    <path d="M9 12h6" />
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

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Export Format Card ── */
const ExportFormatCard = ({
  icon,
  title,
  desc,
  tag,
  tagColor,
  selected,
  onClick,
}) => (
  <div
    className={`page-card export-format-card ${selected ? "selected" : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer", position: "relative" }}
  >
    {selected && (
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "var(--blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--bg)",
        }}
      >
        <CheckIcon />
      </div>
    )}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
        gap: 10,
      }}
    >
      {icon}
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-pri)" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--text-sec)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {desc}
      </div>
      <span
        style={{
          fontSize: 11,
          padding: "3px 10px",
          borderRadius: 20,
          background: `${tagColor}15`,
          color: tagColor,
        }}
      >
        {tag}
      </span>
    </div>
  </div>
);

/* ── Mock export history ── */
const exportHistory = [
  {
    id: 1,
    name: "transformer_gaps_analysis.pdf",
    format: "PDF",
    date: "Feb 17, 2026",
    size: "342 KB",
    dotColor: "#f28b82",
  },
  {
    id: 2,
    name: "climate_review_insights.docx",
    format: "DOCX",
    date: "Feb 16, 2026",
    size: "128 KB",
    dotColor: "#8ab4f8",
  },
  {
    id: 3,
    name: "nlp_benchmark_data.csv",
    format: "CSV",
    date: "Feb 15, 2026",
    size: "67 KB",
    dotColor: "#81c995",
  },
  {
    id: 4,
    name: "quantum_analysis.json",
    format: "JSON",
    date: "Feb 14, 2026",
    size: "45 KB",
    dotColor: "#c58af9",
  },
];

function ExportsPage() {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeSources, setIncludeSources] = useState(true);

  const formats = [
    {
      id: "pdf",
      icon: <PdfExportIcon />,
      title: "PDF Report",
      desc: "Formatted document with charts and styling",
      tag: "Most Popular",
      tagColor: "var(--red)",
    },
    {
      id: "docx",
      icon: <DocxExportIcon />,
      title: "Word Document",
      desc: "Editable document for further refinement",
      tag: "Editable",
      tagColor: "var(--blue)",
    },
    {
      id: "csv",
      icon: <CsvIcon />,
      title: "CSV Spreadsheet",
      desc: "Tabular data for analysis in Excel or Sheets",
      tag: "Data Only",
      tagColor: "var(--green)",
    },
    {
      id: "json",
      icon: <JsonIcon />,
      title: "JSON Data",
      desc: "Structured data for programmatic use",
      tag: "Developer",
      tagColor: "var(--purple)",
    },
  ];

  return (
    <div className="anim-hero">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">Exports</h1>
        <p className="page-subtitle">
          Export your analysis results in various formats.
        </p>
      </div>

      {/* Format Selection */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-sec)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Choose Export Format
        </div>
        <div className="export-formats-grid">
          {formats.map((f) => (
            <ExportFormatCard
              key={f.id}
              {...f}
              selected={selectedFormat === f.id}
              onClick={() => setSelectedFormat(f.id)}
            />
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div
        className="page-card"
        style={{ padding: "20px 24px", marginBottom: 20 }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-pri)",
            marginBottom: 16,
          }}
        >
          Export Options
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-pri)",
                }}
              >
                Include Charts & Visuals
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--text-sec)",
                  marginTop: 2,
                }}
              >
                Add visual representations of findings
              </div>
            </div>
            <div
              className={`toggle-track ${includeCharts ? "on" : "off"}`}
              onClick={() => setIncludeCharts(!includeCharts)}
            >
              <div className="toggle-thumb" />
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-pri)",
                }}
              >
                Include Source References
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--text-sec)",
                  marginTop: 2,
                }}
              >
                Append source citations to the export
              </div>
            </div>
            <div
              className={`toggle-track ${includeSources ? "on" : "off"}`}
              onClick={() => setIncludeSources(!includeSources)}
            >
              <div className="toggle-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button className="run-btn" style={{ marginBottom: 24 }}>
        <DownloadIcon />
        Export as {selectedFormat.toUpperCase()}
      </button>

      {/* Export History */}
      <div className="page-card" style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{ fontSize: 15, fontWeight: 600, color: "var(--text-pri)" }}
          >
            Export History
          </span>
          <span style={{ fontSize: 12, color: "var(--text-ter)" }}>
            {exportHistory.length} exports
          </span>
        </div>
        {exportHistory.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom:
                i < exportHistory.length - 1
                  ? "1px solid var(--border)"
                  : "none",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.dotColor,
                flexShrink: 0,
              }}
            />
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
                {item.name}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--text-ter)", marginTop: 2 }}
              >
                {item.format} · {item.size} · {item.date}
              </div>
            </div>
            <button className="icon-action-btn" title="Re-download">
              <DownloadIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExportsPage;
