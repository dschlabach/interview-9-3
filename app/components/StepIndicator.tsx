import { cn } from "@/utils";
import React from "react";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-1 w-6 rounded-full",
            index < currentStep ? "bg-emerald-800" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
