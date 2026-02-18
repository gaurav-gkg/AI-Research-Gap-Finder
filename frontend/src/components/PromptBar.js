import React, { useRef, useEffect } from "react";

/* ── SVG Icons ── */
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

const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="50%" stopColor="#c58af9" />
        <stop offset="100%" stopColor="#e91e63" />
      </linearGradient>
    </defs>
    <path
      d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5Z"
      fill="url(#botGrad)"
    />
  </svg>
);

const UserIcon = () => (
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
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SpinnerIcon = () => (
  <div className="chat-typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

function PromptBar({
  promptText,
  setPromptText,
  chatMessages,
  onSendMessage,
  chatLoading,
}) {
  const hasText = promptText.trim().length > 0;
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  const handleSend = () => {
    if (hasText && !chatLoading) {
      onSendMessage(promptText.trim());
      setPromptText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && hasText && !chatLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="prompt-wrapper anim-prompt">
      {/* Chat Messages Area */}
      {chatMessages.length > 0 && (
        <div className="chat-messages-container">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${msg.role === "user" ? "chat-message-user" : "chat-message-bot"}`}
            >
              <div className="chat-message-avatar">
                {msg.role === "user" ? <UserIcon /> : <BotIcon />}
              </div>
              <div className="chat-message-content">
                <div className="chat-message-role">
                  {msg.role === "user" ? "You" : "ResearchAI"}
                </div>
                <div className="chat-message-text">{msg.content}</div>
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="chat-message chat-message-bot">
              <div className="chat-message-avatar">
                <BotIcon />
              </div>
              <div className="chat-message-content">
                <div className="chat-message-role">ResearchAI</div>
                <SpinnerIcon />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Bar */}
      <div className="prompt-bar">
        <input
          ref={inputRef}
          className="prompt-input"
          type="text"
          placeholder="Ask anything about your research paper..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={chatLoading}
        />

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            className={`prompt-send-btn ${hasText && !chatLoading ? "active" : "inactive"}`}
            title="Send"
            disabled={!hasText || chatLoading}
            onClick={handleSend}
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
