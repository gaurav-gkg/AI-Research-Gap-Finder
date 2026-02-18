import React from "react";

/* ── SVG Icons ── */
const GearIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8ab4f8"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="config-cell">
    <label className="config-label">{label}</label>
    <div className="custom-select">
      <select value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="custom-select-arrow">
        <ChevronDown />
      </span>
    </div>
  </div>
);

function AnalysisConfig({ settings, setSettings }) {
  const update = (key) => (e) =>
    setSettings({ ...settings, [key]: e.target.value });

  return (
    <div className="config-card anim-config">
      {/* Header */}
      <div className="config-header">
        <GearIcon />
        <span
          style={{ fontSize: 15, fontWeight: 600, color: "var(--text-pri)" }}
        >
          Analysis Configuration
        </span>
      </div>

      {/* 3×2 Grid */}
      <div className="config-grid">
        <SelectField
          label="Document Type"
          value={settings.documentType}
          onChange={update("documentType")}
          options={[
            { value: "auto", label: "Auto Detect" },
            { value: "research", label: "Research Paper" },
            { value: "review", label: "Review Article" },
            { value: "conference", label: "Conference Paper" },
            { value: "thesis", label: "Thesis/Dissertation" },
          ]}
        />
        <SelectField
          label="Domain"
          value={settings.domain}
          onChange={update("domain")}
          options={[
            { value: "auto", label: "Auto Detect" },
            { value: "cs", label: "Computer Science" },
            { value: "medicine", label: "Medicine & Health" },
            { value: "physics", label: "Physics & Engineering" },
            { value: "social", label: "Social Sciences" },
            { value: "biology", label: "Biology & Life Sciences" },
          ]}
        />
        <SelectField
          label="Analysis Depth"
          value={settings.analysisDepth}
          onChange={update("analysisDepth")}
          options={[
            { value: "standard", label: "Standard" },
            { value: "comprehensive", label: "Comprehensive" },
            { value: "quick", label: "Quick Scan" },
            { value: "deep", label: "Deep Dive" },
          ]}
        />
        <SelectField
          label="Include Citations"
          value={settings.includeCitations}
          onChange={update("includeCitations")}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <SelectField
          label="Output Style"
          value={settings.outputStyle}
          onChange={update("outputStyle")}
          options={[
            { value: "bullets", label: "Bullet Points" },
            { value: "paragraph", label: "Paragraph" },
            { value: "structured", label: "Structured Report" },
            { value: "table", label: "Table View" },
          ]}
        />
        <SelectField
          label="Output Language"
          value={settings.outputLanguage}
          onChange={update("outputLanguage")}
          options={[
            { value: "english", label: "English" },
            { value: "hindi", label: "Hindi" },
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
            { value: "german", label: "German" },
          ]}
        />
      </div>
    </div>
  );
}

export default AnalysisConfig;
