import React from "react";
import { CheckCircle, Loader, Circle } from "lucide-react";

function AnalysisProgress({ currentStep, steps }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Analysis Progress
      </h3>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className="flex items-center gap-3">
              {isCompleted && (
                <CheckCircle
                  className="text-academic-green flex-shrink-0"
                  size={20}
                />
              )}
              {isCurrent && (
                <Loader
                  className="text-academic-blue animate-spin flex-shrink-0"
                  size={20}
                />
              )}
              {isPending && (
                <Circle className="text-gray-300 flex-shrink-0" size={20} />
              )}

              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isCompleted
                      ? "text-gray-900"
                      : isCurrent
                        ? "text-academic-blue"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </p>
                )}
              </div>

              {isCompleted && (
                <span className="text-xs text-gray-500">{step.duration}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalysisProgress;
