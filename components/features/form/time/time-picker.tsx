"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";
import TimeColumn from "./time-column";
import { Button } from "@/components/ui/button";

interface TimePickerProps {
  value?: string;
  onChange: (val: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  timezone?: string;
  customTrigger?: (value: string) => React.ReactNode;
}

export default function TimePicker({
  value,
  onChange,
  label,
  disabled,
  placeholder = "Select time (24h)",
  error,
  timezone = DEFAULT_TIMEZONE,
  customTrigger,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const getInitialTime = useCallback(() => {
    const zoned = toZonedTime(new Date(), timezone);
    const h = parseInt(format(zoned, "H"), 10);
    const m = parseInt(format(zoned, "mm"), 10);
    return { h, m };
  }, [timezone]);

  // Initialize state based on value or current time
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);

  useEffect(() => {
    if (!value) {
      const initial = getInitialTime();
      setHour(initial.h);
      setMinute(initial.m);
      return;
    }

    const match = value.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
      setHour(parseInt(match[1], 10));
      setMinute(parseInt(match[2], 10));
    }
  }, [value, timezone, getInitialTime]);

  const handleHourSelect = (h: number) => {
    setHour(h);
    if (minute !== null) {
      const formatted = `${h.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      onChange(formatted);
    }
  };

  const handleMinuteSelect = (m: number) => {
    setMinute(m);
    if (hour !== null) {
      const formatted = `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      onChange(formatted);
    }
  };

  const displayVal = value || placeholder;

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm mb-1.5 font-medium text-gray-700">
          {label}
        </label>
      )}

      {customTrigger ? (
        <div onClick={(e) => { e.stopPropagation(); !disabled && setOpen((prev) => !prev); }}>
          {customTrigger(displayVal)}
        </div>
      ) : (
        <div
          className={`border rounded-md px-4 py-2.5 flex items-center gap-2 transition
            ${error ? "border-red-500 bg-red-50/10" : "border-border hover:border-gray-400"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer bg-white"}
          `}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <Clock size={16} className={error ? "text-red-500" : "text-gray-400"} />

          <span
            className={
              value ? "text-gray-900 font-medium" : "text-gray-400"
            }
          >
            {displayVal}
          </span>
        </div>
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 sm:bottom-auto sm:mt-2 inset-x-0 sm:inset-auto w-full sm:w-64 bg-white rounded-t-xl sm:rounded-md border border-border shadow-2xl overflow-hidden sm:left-1/2 sm:-translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className='p-4'>
              <div className="grid grid-cols-2 gap-4">
                <TimeColumn
                  label="Hour (24h)"
                  values={Array.from({ length: 24 }, (_, i) => i)}
                  selected={hour}
                  onSelect={handleHourSelect}
                />

                <TimeColumn
                  label="Minute"
                  values={Array.from({ length: 60 }, (_, i) => i)}
                  selected={minute}
                  onSelect={handleMinuteSelect}
                />
              </div>

              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={hour === null || minute === null}
                className={`mt-2 w-full py-4 sm:py-2 rounded-md text-sm font-bold transition ${hour === null || minute === null
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-black/80"
                  }`}
              >
                Done
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}