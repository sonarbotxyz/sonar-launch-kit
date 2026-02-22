"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-base-gray-light">
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-base-blue font-medium">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full h-2 bg-base-dark-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-base-blue to-base-blue-light rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                i < currentStep
                  ? "bg-base-blue text-white"
                  : i === currentStep
                  ? "bg-base-blue text-white ring-2 ring-base-blue-light ring-offset-2 ring-offset-base-black"
                  : "bg-base-dark-3 text-base-gray"
              }`}
            >
              {i < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`hidden sm:block w-4 md:w-6 lg:w-8 h-0.5 mx-0.5 transition-all duration-300 ${
                  i < currentStep ? "bg-base-blue" : "bg-base-dark-3"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
