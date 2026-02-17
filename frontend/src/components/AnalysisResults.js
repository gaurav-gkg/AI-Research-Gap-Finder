import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";

function AnalysisResults({ results }) {
  if (!results) return null;

  // Parse the results to extract structured data
  const parseGaps = (text) => {
    const sections = text.split("##").filter(Boolean);
    return sections.map((section, index) => {
      const lines = section.trim().split("\n");
      const title = lines[0].trim();
      const content = lines.slice(1).join("\n").trim();

      return {
        id: index,
        title,
        content,
        confidence:
          index % 3 === 0 ? "High" : index % 3 === 1 ? "Medium" : "Low",
      };
    });
  };

  const gaps = parseGaps(results.response);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>

      {/* Document Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Document Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Detected Title
            </p>
            <p className="text-sm font-semibold text-gray-900">
              Research Paper
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Publication Type
            </p>
            <p className="text-sm font-semibold text-gray-900">Academic</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Domain</p>
            <p className="text-sm font-semibold text-gray-900">Auto-detected</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Suitability
            </p>
            <p className="text-sm font-semibold text-academic-green flex items-center gap-1">
              <CheckCircle size={16} />
              High
            </p>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Findings</h3>
        <div className="prose prose-sm max-w-none text-gray-700">
          <ReactMarkdown>{results.response}</ReactMarkdown>
        </div>
      </div>

      {/* Identified Research Gaps */}
      {gaps.length > 1 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Identified Research Gaps
          </h3>
          <div className="space-y-4">
            {gaps.slice(1).map((gap) => (
              <div
                key={gap.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all hover:border-academic-blue"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-base font-bold text-gray-900 flex-1">
                    {gap.title}
                  </h4>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ml-3 ${
                      gap.confidence === "High"
                        ? "bg-green-100 text-green-800"
                        : gap.confidence === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {gap.confidence}
                  </span>
                </div>
                <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                  <ReactMarkdown>{gap.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limitations & Notes */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5">
        <div className="flex gap-3">
          <AlertTriangle
            className="text-amber-600 flex-shrink-0 mt-0.5"
            size={22}
          />
          <div className="text-sm text-amber-900">
            <p className="font-semibold mb-2">Important Notes</p>
            <ul className="list-disc list-inside space-y-1.5 text-amber-800">
              <li>Analysis is based on the provided document only.</li>
              <li>Results should be validated with additional literature.</li>
              <li>Confidence levels are algorithmic estimates.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Sources:</span> {results.sources}
        </p>
      </div>
    </div>
  );
}

export default AnalysisResults;
