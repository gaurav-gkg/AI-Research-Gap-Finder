import React from "react";

function AnalysisSettings({ settings, setSettings }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Analysis Configuration
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Document Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Document Type
          </label>
          <select
            value={settings.documentType}
            onChange={(e) =>
              setSettings({ ...settings, documentType: e.target.value })
            }
            className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-academic-blue focus:border-transparent"
          >
            <option value="auto">Auto Detect</option>
            <option value="research">Research Paper</option>
            <option value="survey">Survey Paper</option>
            <option value="thesis">Thesis</option>
          </select>
        </div>

        {/* Domain */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Domain
          </label>
          <select
            value={settings.domain}
            onChange={(e) =>
              setSettings({ ...settings, domain: e.target.value })
            }
            className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-academic-blue focus:border-transparent"
          >
            <option value="auto">Auto Detect</option>
            <option value="cs">Computer Science</option>
            <option value="healthcare">Healthcare</option>
            <option value="social">Social Sciences</option>
          </select>
        </div>

        {/* Analysis Depth */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Analysis Depth
          </label>
          <select
            value={settings.analysisDepth}
            onChange={(e) =>
              setSettings({ ...settings, analysisDepth: e.target.value })
            }
            className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-academic-blue focus:border-transparent"
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="deep">Deep</option>
          </select>
        </div>

        {/* Include Citations */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Include Citations
          </label>
          <select
            value={settings.includeCitations}
            onChange={(e) =>
              setSettings({ ...settings, includeCitations: e.target.value })
            }
            className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-academic-blue focus:border-transparent"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Output Style */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Output Style
          </label>
          <select
            value={settings.outputStyle}
            onChange={(e) =>
              setSettings({ ...settings, outputStyle: e.target.value })
            }
            className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-academic-blue focus:border-transparent"
          >
            <option value="bullets">Bullet Points</option>
            <option value="structured">Structured Report</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AnalysisSettings;
