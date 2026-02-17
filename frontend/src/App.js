import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import AnalysisSettings from "./components/AnalysisSettings";
import AnalysisResults from "./components/AnalysisResults";
import AnalysisProgress from "./components/AnalysisProgress";
import PlaceholderPage from "./components/PlaceholderPage";
import { AlertCircle } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [selectedFile, setSelectedFile] = useState(null);
  const [useOnlyDocument, setUseOnlyDocument] = useState(true);
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(-1);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const analysisSteps = [
    {
      label: "Uploading document",
      description: "Processing your research paper...",
      duration: "2s",
    },
    {
      label: "Extracting text",
      description: "Reading document content...",
      duration: "3s",
    },
    {
      label: "Creating embeddings",
      description: "Generating vector representations...",
      duration: "8s",
    },
    {
      label: "Analyzing content",
      description: "Identifying research gaps...",
      duration: "15s",
    },
    {
      label: "Generating report",
      description: "Formatting results...",
      duration: "5s",
    },
  ];

  const [settings, setSettings] = useState({
    documentType: "auto",
    domain: "auto",
    analysisDepth: "standard",
    includeCitations: "yes",
    outputStyle: "bullets",
  });

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload a document first");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setAnalysisStep(0);

    // Simulate progress steps
    const progressInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("query_type", "Research Gaps");

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      clearInterval(progressInterval);

      if (data.success) {
        setAnalysisStep(analysisSteps.length - 1);
        setTimeout(() => {
          setResults(data);
          setAnalysisStep(-1);
        }, 1000);
      } else {
        setError(data.error || "An error occurred during analysis");
        setAnalysisStep(-1);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError(
        "Failed to connect to the server. Make sure the backend is running on port 8000.",
      );
      setAnalysisStep(-1);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "analyze":
        return (
          <>
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Research Gap Analyzer
              </h1>

              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5">
                <p className="text-sm text-blue-900">
                  Upload a research paper to automatically identify unexplored
                  areas, missing evaluations, and future research opportunities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Upload & Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upload Section - More Prominent */}
                <FileUpload
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                  useOnlyDocument={useOnlyDocument}
                  setUseOnlyDocument={setUseOnlyDocument}
                />

                {/* Run Analysis Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || loading}
                  className={`w-full px-6 py-3.5 rounded-lg font-semibold text-base transition-colors ${
                    !selectedFile || loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-academic-green text-white hover:bg-green-600 shadow-sm"
                  }`}
                >
                  {loading ? "Analyzing Document..." : "Run Gap Analysis"}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle
                        className="text-red-600 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                )}

                {/* Analysis Settings - Less Prominent */}
                <AnalysisSettings
                  settings={settings}
                  setSettings={setSettings}
                />
              </div>

              {/* Right Column - Progress & Placeholder */}
              <div className="space-y-6">
                {loading && analysisStep >= 0 && (
                  <AnalysisProgress
                    currentStep={analysisStep}
                    steps={analysisSteps}
                  />
                )}

                {!results && !loading && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-200">
                    <h3 className="text-base font-semibold text-gray-400 mb-2">
                      Analysis Results
                    </h3>
                    <p className="text-sm text-gray-400">
                      Upload and analyze a document to view results here
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Results */}
            {results && (
              <div className="mt-6">
                <AnalysisResults results={results} />
              </div>
            )}
          </>
        );

      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <PlaceholderPage
              title="Dashboard Coming Soon"
              description="View your analysis statistics and recent activity here."
            />
          </>
        );

      case "history":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Previous Analyses
            </h1>
            <PlaceholderPage
              title="No Previous Analyses"
              description="Your analysis history will appear here once you complete your first analysis."
            />
          </>
        );

      case "documents":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Documents
            </h1>
            <PlaceholderPage
              title="No Documents"
              description="Uploaded documents will be stored and managed here."
            />
          </>
        );

      case "exports":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Exports</h1>
            <PlaceholderPage
              title="Export Analysis"
              description="Export your analysis results to PDF, DOCX, or other formats."
            />
          </>
        );

      case "settings":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
            <PlaceholderPage
              title="Settings"
              description="Configure your preferences and account settings."
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FB]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-8 py-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
