import React, { useState, useRef, useCallback } from "react";

/* ── SVG Icons ── */
const UploadArrow = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9aa0a6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const BrowseIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M16 12l-4 4-4-4M12 8v8" />
  </svg>
);

const FileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#81c995"
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

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const tabList = [
  { id: "upload", label: "Upload Document" },
  { id: "paste", label: "Paste Text" },
  { id: "url", label: "URL / DOI" },
];

function UploadCard({
  activeUploadTab,
  setActiveUploadTab,
  selectedFile,
  onFileSelect,
  useOnlyDocument,
  setUseOnlyDocument,
  pasteText,
  setPasteText,
  urlText,
  setUrlText,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) return;
      if (file.size > 15 * 1024 * 1024) return; // 15 MB max
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderTabContent = () => {
    switch (activeUploadTab) {
      case "paste":
        return (
          <textarea
            className="paste-text-area"
            placeholder="Paste your research paper text here..."
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />
        );
      case "url":
        return (
          <div className="url-input-wrapper">
            <input
              className="url-input"
              type="text"
              placeholder="Enter paper URL or DOI (e.g., https://arxiv.org/abs/... or 10.1234/...)"
              value={urlText}
              onChange={(e) => setUrlText(e.target.value)}
            />
          </div>
        );
      default:
        return (
          <div
            className={`upload-zone ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowse}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />

            {selectedFile ? (
              <div className="file-selected-info">
                <div className="file-icon-wrapper">
                  <FileIcon />
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--text-pri)",
                    }}
                  >
                    {selectedFile.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--text-sec)",
                      marginTop: 2,
                    }}
                  >
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB — Ready
                    for analysis
                  </div>
                </div>
                <button className="file-remove-btn" onClick={handleRemoveFile}>
                  <XIcon />
                </button>
              </div>
            ) : (
              <>
                {/* Animated Orb */}
                <div className="orb-container">
                  <div className="orb-ring" />
                  <div className="orb-inner">
                    <UploadArrow />
                  </div>
                </div>

                <div className="upload-title">
                  {isDragging
                    ? "Drop your file here"
                    : "Drag & drop your research paper"}
                </div>
                <div className="upload-sub">
                  or choose a file from your device
                </div>

                <button
                  className="browse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowse();
                  }}
                >
                  <BrowseIcon />
                  Browse files
                </button>

                <div className="format-pills">
                  <span className="format-pill">PDF</span>
                  <span className="format-pill">DOCX</span>
                  <span className="format-pill">Max 15 MB</span>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="upload-card anim-upload">
      {/* Tabs */}
      <div className="upload-tabs">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            className={`upload-tab ${activeUploadTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveUploadTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Toggle Row */}
      <div className="toggle-row">
        <div>
          <div
            style={{ fontSize: 14, fontWeight: 500, color: "var(--text-pri)" }}
          >
            Use only uploaded document
          </div>
          <div
            style={{ fontSize: 12.5, color: "var(--text-sec)", marginTop: 2 }}
          >
            Analysis stays focused on this paper without external sources
          </div>
        </div>
        <div
          className={`toggle-track ${useOnlyDocument ? "on" : "off"}`}
          onClick={() => setUseOnlyDocument(!useOnlyDocument)}
        >
          <div className="toggle-thumb" />
        </div>
      </div>
    </div>
  );
}

export default UploadCard;
