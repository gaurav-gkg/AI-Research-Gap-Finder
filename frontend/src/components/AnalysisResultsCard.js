import React from "react";
import ReactMarkdown from "react-markdown";

/* ── SVG Icon ── */
const ChartDocIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5f6368"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 18v-4" />
    <path d="M12 18v-8" />
    <path d="M15 18v-2" />
  </svg>
);

function AnalysisResultsCard({ results }) {
  if (results) {
    return (
      <div className="results-card results-populated anim-results">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-pri)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#81c995"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Analysis Results
        </h3>
        <div className="results-md">
          <ReactMarkdown>{results.response}</ReactMarkdown>
        </div>
        {results.sources && (
          <div
            style={{
              marginTop: 20,
              padding: "12px 16px",
              background: "var(--surface2)",
              borderRadius: 12,
              fontSize: 13,
              color: "var(--text-sec)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--text-pri)" }}>Sources: </strong>
            {results.sources}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="results-card anim-results">
      <div className="results-icon-container">
        <ChartDocIcon />
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "var(--text-sec)",
          marginBottom: 8,
        }}
      >
        Analysis Results
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--text-ter)",
          lineHeight: 1.6,
          maxWidth: 360,
          margin: "0 auto",
        }}
      >
        Upload a research paper and run the analysis to see research gaps,
        missing evaluations, and future opportunities here.
      </div>
    </div>
  );
}

export default AnalysisResultsCard;
