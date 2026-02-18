import React from "react";

/* ── SVG Icons ── */
const PaperclipIcon = () => (
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
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.49" />
  </svg>
);

const MicIcon = () => (
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
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0014 0" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

const ImageIcon = () => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const SendIcon = () => (
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
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

function PromptBar({ promptText, setPromptText }) {
  const hasText = promptText.trim().length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hasText) {
      // Future: handle send
    }
  };

  return (
    <div className="prompt-wrapper anim-prompt">
      <div className="prompt-bar">
        {/* Attach button */}
        <button className="prompt-circle-btn" title="Attach file">
          <PaperclipIcon />
        </button>

        {/* Input */}
        <input
          className="prompt-input"
          type="text"
          placeholder="Ask anything about your research paper..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Right action group */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button className="prompt-circle-btn" title="Voice input">
            <MicIcon />
          </button>
          <button className="prompt-circle-btn" title="Upload image">
            <ImageIcon />
          </button>
          <button
            className={`prompt-send-btn ${hasText ? "active" : "inactive"}`}
            title="Send"
            disabled={!hasText}
          >
            <SendIcon />
          </button>
        </div>
      </div>

      <div className="prompt-footer">
        ResearchAI may make mistakes. Always verify findings with primary
        sources.
      </div>
    </div>
  );
}

export default PromptBar;
