import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";

function FileUpload({
  onFileSelect,
  selectedFile,
  useOnlyDocument,
  setUseOnlyDocument,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = (e) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Upload Research Paper
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload your document to begin analysis
      </p>

      <div
        {...getRootProps()}
        className={`border-3 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-academic-blue bg-blue-50 scale-[1.02]"
            : selectedFile
              ? "border-academic-green bg-green-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <div className="flex items-center justify-center gap-4">
            <FileText className="text-academic-green" size={48} />
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900 text-base">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for
                analysis
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto text-gray-400 mb-4" size={56} />
            <p className="text-gray-900 font-semibold text-lg mb-2">
              {isDragActive
                ? "Drop your file here"
                : "Drag & drop your research paper"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <p className="text-xs text-gray-400">
              Supports: PDF, DOCX (Max size: 15MB)
            </p>
          </div>
        )}
      </div>

      {/* Toggle for using only uploaded document */}
      <div className="mt-6 flex items-start">
        <input
          type="checkbox"
          id="useOnlyDocument"
          checked={useOnlyDocument}
          onChange={(e) => setUseOnlyDocument(e.target.checked)}
          className="mt-1 w-4 h-4 text-academic-blue border-gray-300 rounded focus:ring-academic-blue"
        />
        <label htmlFor="useOnlyDocument" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">
            Use only uploaded document for analysis
          </span>
          <p className="text-gray-500 mt-0.5">
            Analysis will be based solely on this document without external
            sources
          </p>
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
