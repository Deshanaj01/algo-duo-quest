
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  className, 
  showLabel = false,
  size = "md" 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const heightClass = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };
  
  return (
    <div className={cn("w-full flex flex-col space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>
            {value}/{max} ({percentage}%)
          </span>
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", heightClass[size])}>
        <div 
          className={cn("progress-bar-fill rounded-full bg-gradient-to-r from-algo-purple-500 to-algo-blue-500", heightClass[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
