import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

/* ── SVG Icons ── */
const UserIcon = () => (
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
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PaletteIcon = () => (
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
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="8" cy="21" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
    <path d="M12 2a10 10 0 010 20 10 10 0 010-20z" />
  </svg>
);

const BrainIcon = () => (
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
    <path d="M12 2a4 4 0 014 4v1a3 3 0 013 3 3 3 0 01-1 5.83V17a4 4 0 01-4 4h-4a4 4 0 01-4-4v-1.17A3 3 0 015 10a3 3 0 013-3V6a4 4 0 014-4z" />
  </svg>
);

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const ShieldIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const KeyIcon = () => (
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
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
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

/* ── Section Component ── */
const SettingsSection = ({ icon, title, description, children }) => (
  <div
    className="page-card"
    style={{
      padding: 0,
      marginBottom: 16,
      overflow: "hidden",
      borderRadius: 20,
    }}
  >
    <div
      style={{
        padding: "18px 24px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{ color: "var(--blue)" }}>{icon}</span>
      <div>
        <div
          style={{ fontSize: 15, fontWeight: 600, color: "var(--text-pri)" }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{ fontSize: 12.5, color: "var(--text-sec)", marginTop: 2 }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
    <div style={{ padding: "16px 24px 20px" }}>{children}</div>
  </div>
);

/* ── Toggle Row ── */
const SettingToggle = ({ label, desc, value, onChange }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
    }}
  >
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-pri)" }}>
        {label}
      </div>
      {desc && (
        <div style={{ fontSize: 12.5, color: "var(--text-sec)", marginTop: 2 }}>
          {desc}
        </div>
      )}
    </div>
    <div
      className={`toggle-track ${value ? "on" : "off"}`}
      onClick={() => onChange(!value)}
    >
      <div className="toggle-thumb" />
    </div>
  </div>
);

/* ── Select Row ── */
const SettingSelect = ({ label, desc, value, onChange, options }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      gap: 16,
    }}
  >
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-pri)" }}>
        {label}
      </div>
      {desc && (
        <div style={{ fontSize: 12.5, color: "var(--text-sec)", marginTop: 2 }}>
          {desc}
        </div>
      )}
    </div>
    <div className="custom-select" style={{ minWidth: 160 }}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
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

/* ── Input Row ── */
const SettingInput = ({
  label,
  desc,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div style={{ padding: "10px 0" }}>
    <div
      style={{
        fontSize: 14,
        fontWeight: 500,
        color: "var(--text-pri)",
        marginBottom: 2,
      }}
    >
      {label}
    </div>
    {desc && (
      <div
        style={{ fontSize: 12.5, color: "var(--text-sec)", marginBottom: 8 }}
      >
        {desc}
      </div>
    )}
    <input
      className="settings-input"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

function SettingsPage() {
  /* Profile */
  const [displayName, setDisplayName] = useState("Researcher");
  const [email, setEmail] = useState("researcher@university.edu");

  /* Appearance */
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  /* AI & Analysis */
  const [defaultModel, setDefaultModel] = useState("llama3.2");
  const [defaultDepth, setDefaultDepth] = useState("standard");
  const [defaultLang, setDefaultLang] = useState("english");
  const [autoDetectDomain, setAutoDetectDomain] = useState(true);
  const [includeCitationsDefault, setIncludeCitationsDefault] = useState(true);

  /* Notifications */
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [analysisAlerts, setAnalysisAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  /* Privacy */
  const [storeDocuments, setStoreDocuments] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="anim-hero">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Manage your account, preferences, and application configuration.
        </p>
      </div>

      {/* Profile */}
      <SettingsSection
        icon={<UserIcon />}
        title="Profile"
        description="Your personal information"
      >
        <SettingInput
          label="Display Name"
          value={displayName}
          onChange={setDisplayName}
          placeholder="Your name"
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingInput
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          type="email"
        />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection
        icon={<PaletteIcon />}
        title="Appearance"
        description="Customize the look and feel"
      >
        <SettingSelect
          label="Theme"
          desc="Select your preferred color scheme"
          value={theme}
          onChange={setTheme}
          options={[
            { value: "dark", label: "Dark (Gemini)" },
            { value: "light", label: "Light" },
            { value: "system", label: "System Default" },
          ]}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingSelect
          label="Font Size"
          desc="Adjust the base text size"
          value={fontSize}
          onChange={setFontSize}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
        />
      </SettingsSection>

      {/* AI & Analysis Defaults */}
      <SettingsSection
        icon={<BrainIcon />}
        title="AI & Analysis"
        description="Default settings for new analyses"
      >
        <SettingSelect
          label="Default Model"
          desc="LLM model used for analysis"
          value={defaultModel}
          onChange={setDefaultModel}
          options={[
            { value: "llama3.2", label: "Llama 3.2" },
            { value: "llama3.1", label: "Llama 3.1" },
            { value: "mistral", label: "Mistral" },
            { value: "gemma2", label: "Gemma 2" },
          ]}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingSelect
          label="Default Analysis Depth"
          value={defaultDepth}
          onChange={setDefaultDepth}
          options={[
            { value: "quick", label: "Quick Scan" },
            { value: "standard", label: "Standard" },
            { value: "comprehensive", label: "Comprehensive" },
            { value: "deep", label: "Deep Dive" },
          ]}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingSelect
          label="Default Output Language"
          value={defaultLang}
          onChange={setDefaultLang}
          options={[
            { value: "english", label: "English" },
            { value: "hindi", label: "Hindi" },
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
            { value: "german", label: "German" },
          ]}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingToggle
          label="Auto-detect Domain"
          desc="Automatically detect the research domain"
          value={autoDetectDomain}
          onChange={setAutoDetectDomain}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingToggle
          label="Include Citations by Default"
          desc="Include citation analysis in results"
          value={includeCitationsDefault}
          onChange={setIncludeCitationsDefault}
        />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={<BellIcon />}
        title="Notifications"
        description="Control how you receive updates"
      >
        <SettingToggle
          label="Email Notifications"
          desc="Receive analysis completion emails"
          value={emailNotifications}
          onChange={setEmailNotifications}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingToggle
          label="Analysis Completion Alerts"
          desc="Browser notifications when analysis finishes"
          value={analysisAlerts}
          onChange={setAnalysisAlerts}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingToggle
          label="Weekly Digest"
          desc="Receive a weekly summary of your research activity"
          value={weeklyDigest}
          onChange={setWeeklyDigest}
        />
      </SettingsSection>

      {/* Privacy & Data */}
      <SettingsSection
        icon={<ShieldIcon />}
        title="Privacy & Data"
        description="Control your data and privacy settings"
      >
        <SettingToggle
          label="Store Documents Locally"
          desc="Keep uploaded documents for future reference"
          value={storeDocuments}
          onChange={setStoreDocuments}
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingToggle
          label="Anonymous Usage Analytics"
          desc="Help improve ResearchAI by sharing anonymous usage data"
          value={analytics}
          onChange={setAnalytics}
        />
      </SettingsSection>

      {/* API Key */}
      <SettingsSection
        icon={<KeyIcon />}
        title="API Configuration"
        description="Manage your Ollama and model settings"
      >
        <SettingInput
          label="Ollama API Endpoint"
          desc="URL for your local Ollama instance"
          value="http://localhost:11434"
          onChange={() => { }}
          placeholder="http://localhost:11434"
        />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SettingInput
          label="Backend API URL"
          desc="URL for the ResearchAI FastAPI server"
          value="http://localhost:8000"
          onChange={() => { }}
          placeholder="http://localhost:8000"
        />
      </SettingsSection>

      {/* Danger Zone */}
      <div
        className="page-card"
        style={{
          padding: 0,
          marginBottom: 20,
          overflow: "hidden",
          borderRadius: 20,
          border: "1px solid rgba(242,139,130,0.2)",
        }}
      >
        <div
          style={{
            padding: "18px 24px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid rgba(242,139,130,0.15)",
          }}
        >
          <span style={{ color: "var(--red)", fontSize: 15, fontWeight: 600 }}>
            Danger Zone
          </span>
        </div>
        <div
          style={{
            padding: "16px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
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
                Clear All Data
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--text-sec)",
                  marginTop: 2,
                }}
              >
                Remove all documents, analyses, and exports
              </div>
            </div>
            <button className="danger-btn">Clear Data</button>
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
                Reset to Defaults
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--text-sec)",
                  marginTop: 2,
                }}
              >
                Restore all settings to their original values
              </div>
            </div>
            <button className="danger-btn">Reset</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="run-btn" style={{ marginBottom: 24 }}>
        Save Settings
      </button>
    </div>
  );
}

export default SettingsPage;
