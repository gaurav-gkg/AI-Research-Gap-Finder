import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import SuggestionChips from "./components/SuggestionChips";
import UploadCard from "./components/UploadCard";
import AnalysisConfig from "./components/AnalysisConfig";
import AnalysisResultsCard from "./components/AnalysisResultsCard";
import PromptBar from "./components/PromptBar";
import DashboardPage from "./components/DashboardPage";
import PreviousAnalysesPage from "./components/PreviousAnalysesPage";
import MyDocumentsPage from "./components/MyDocumentsPage";
import ExportsPage from "./components/ExportsPage";
import SettingsPage from "./components/SettingsPage";
import UserMenu from "./components/UserMenu";
import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "./contexts/HistoryContext";

/* ── SVG Icons for inline use ── */
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
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

function App() {
  const { isAuthenticated, openSignIn } = useAuth();
  const { addAnalysis } = useHistory();

  /* ── State ── */
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [useOnlyDocument, setUseOnlyDocument] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeUploadTab, setActiveUploadTab] = useState("upload");
  const [pasteText, setPasteText] = useState("");
  const [urlText, setUrlText] = useState("");
  const [settings, setSettings] = useState({
    documentType: "auto",
    domain: "auto",
    analysisDepth: "standard",
    includeCitations: "yes",
    outputStyle: "bullets",
    outputLanguage: "english",
  });

  /* ── Analyze handler ── */
  const handleAnalyze = async () => {
    // Gate: require sign-in before analysis
    if (!isAuthenticated) {
      openSignIn();
      return;
    }

    // Validate based on active tab
    if (activeUploadTab === "upload" && !selectedFile) {
      setError("Please upload a document first");
      return;
    }
    if (activeUploadTab === "paste" && !pasteText.trim()) {
      setError("Please paste your research paper text");
      return;
    }
    if (activeUploadTab === "url" && !urlText.trim()) {
      setError("Please enter a paper URL or DOI");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      let response;

      if (activeUploadTab === "paste") {
        // Pasted text analysis
        response = await fetch("http://localhost:8000/api/analyze-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: pasteText,
            query_type: "Research Gaps",
          }),
        });
      } else if (activeUploadTab === "url") {
        // URL / DOI analysis
        response = await fetch("http://localhost:8000/api/analyze-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: urlText,
            query_type: "Research Gaps",
          }),
        });
      } else {
        // File upload analysis
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("query_type", "Research Gaps");
        response = await fetch("http://localhost:8000/api/analyze", {
          method: "POST",
          body: formData,
        });
      }

      const data = await response.json();

      if (data.success) {
        setResults(data);
        setSessionId(data.session_id);
        setChatMessages([]);

        // ── Save to history ──────────────────────────────────────
        const docName =
          activeUploadTab === "upload"
            ? selectedFile.name
            : activeUploadTab === "paste"
            ? "Pasted Text"
            : (urlText.split("/").pop() || urlText).slice(0, 60);

        const docExt =
          activeUploadTab === "upload"
            ? selectedFile.name.split(".").pop().toLowerCase()
            : activeUploadTab === "paste"
            ? "txt"
            : "url";

        const docSize =
          activeUploadTab === "upload"
            ? selectedFile.size >= 1024 * 1024
              ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
              : `${Math.round(selectedFile.size / 1024)} KB`
            : activeUploadTab === "paste"
            ? `${(pasteText.length / 1024).toFixed(1)} KB`
            : "URL";

        const gapsFound =
          (data.response.match(/^\d+\./gm) || []).length ||
          (data.response.match(/##/g) || []).length ||
          1;

        addAnalysis(
          {
            title: "Research Gap Analysis",
            paperName: docName,
            type: "Research Gaps",
            response: data.response,
            sources: data.sources,
            sessionId: data.session_id,
            gapsFound,
            domain: "General",
          },
          { name: docName, ext: docExt, size: docSize }
        );
        // ────────────────────────────────────────────────────────
      } else {
        setError(data.error || "An error occurred during analysis");
      }
    } catch (err) {
      setError(
        "Failed to connect to the server. Make sure the backend is running on port 8000.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Chat handler ── */
  const handleSendMessage = async (message) => {
    if (!sessionId) return;

    const userMsg = { role: "user", content: message };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message,
          session_id: sessionId,
          chat_history: [...chatMessages, userMsg],
        }),
      });

      const data = await response.json();

      if (data.success) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error || "Failed to get a response."}`,
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to connect to the server. Please try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  /* ── Render content based on active sidebar tab ── */
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage />;
      case "history":
        return <PreviousAnalysesPage setActiveTab={setActiveTab} />;
      case "documents":
        return <MyDocumentsPage setActiveTab={setActiveTab} />;
      case "exports":
        return <ExportsPage results={results} />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <>
            <UploadCard
              activeUploadTab={activeUploadTab}
              setActiveUploadTab={setActiveUploadTab}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              useOnlyDocument={useOnlyDocument}
              setUseOnlyDocument={setUseOnlyDocument}
              pasteText={pasteText}
              setPasteText={setPasteText}
              urlText={urlText}
              setUrlText={setUrlText}
            />

            {/* Run Gap Analysis Button */}
            <div className="anim-run" style={{ marginTop: 20 }}>
              <button
                className="run-btn"
                onClick={handleAnalyze}
                disabled={
                  loading ||
                  (activeUploadTab === "upload" && !selectedFile) ||
                  (activeUploadTab === "paste" && !pasteText.trim()) ||
                  (activeUploadTab === "url" && !urlText.trim())
                }
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SearchIcon />
                    Run Gap Analysis
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  background: "rgba(242,139,130,0.1)",
                  border: "1px solid rgba(242,139,130,0.3)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  color: "var(--red)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <AnalysisConfig settings={settings} setSettings={setSettings} />
            <AnalysisResultsCard results={results} />
          </>
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="main-wrapper">
        {/* Top bar with user avatar / sign-in */}
        <div className="top-bar">
          <div className="top-bar-spacer" />
          <UserMenu />
        </div>
        <div className="main-content">{renderContent()}</div>
        {activeTab === "analyze" && results && (
          <>
            {isChatOpen && (
              <PromptBar
                promptText={promptText}
                setPromptText={setPromptText}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
                chatLoading={chatLoading}
              />
            )}
            <button
              className={`chat-toggle-fab ${isChatOpen ? "open" : ""}`}
              onClick={() => setIsChatOpen((v) => !v)}
              title={isChatOpen ? "Hide chat" : "Ask about this paper"}
            >
              {isChatOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
