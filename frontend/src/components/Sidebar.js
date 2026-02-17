import React from "react";
import {
  LayoutDashboard,
  FileText,
  History,
  FolderOpen,
  Download,
  Settings,
} from "lucide-react";

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analyze", label: "Analyze Paper", icon: FileText },
    { id: "history", label: "Previous Analyses", icon: History },
    { id: "documents", label: "My Documents", icon: FolderOpen },
    { id: "exports", label: "Exports", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
      {/* Brand Section */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Research Gap</h1>
        <h2 className="text-xl font-bold text-academic-blue">Analyzer</h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-academic-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Documents Analyzed</p>
          <p className="text-lg font-semibold text-gray-900">0</p>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500">Free Plan</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
