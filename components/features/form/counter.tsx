"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  disabled = false,
  className,
}) => {
  const resolvedMin = min;
  const resolvedMax = max;
  const parsedValue = Number(value);
  const currentValue = Number.isNaN(parsedValue)
    ? resolvedMin
    : Math.min(resolvedMax, Math.max(resolvedMin, parsedValue));

  const fieldRadiusClass = "rounded-sm";

  return (
    <div className={cn(
      "grid grid-cols-[40px_1fr_40px] h-[46px] items-center border border-border bg-white text-black overflow-hidden transition-colors",
      fieldRadiusClass,
      className
    )}>
      <button
        type="button"
        onClick={() => onChange(Math.max(resolvedMin, currentValue - step))}
        disabled={disabled || currentValue <= resolvedMin}
        className="h-full flex items-center justify-center border-r border-gray-100 text-lg font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <span className="h-full flex items-center justify-center text-sm font-bold tabular-nums">
        {currentValue}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(resolvedMax, currentValue + step))}
        disabled={disabled || currentValue >= resolvedMax}
        className="h-full flex items-center justify-center border-l border-gray-100 text-lg font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
