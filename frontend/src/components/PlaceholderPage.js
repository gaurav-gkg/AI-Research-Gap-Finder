import React from "react";
import { FileText } from "lucide-react";

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <FileText className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;
