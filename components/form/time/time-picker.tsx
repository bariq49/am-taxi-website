"use client";

import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";
import TimeColumn from "./time-column";

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
  placeholder = "Select time",
  error,
  timezone = DEFAULT_TIMEZONE,
  customTrigger,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  
  const getInitialTime = () => {
    const zoned = toZonedTime(new Date(), timezone);
    const h = parseInt(format(zoned, "h"), 10);
    const m = parseInt(format(zoned, "mm"), 10);
    const p = format(zoned, "a").toUpperCase() as "AM" | "PM";
    return { h, m, p };
  };

  const initial = getInitialTime();
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [ampm, setAmPm] = useState<"AM" | "PM">(initial.p);

  useEffect(() => {
    if (!value) {
      const initial = getInitialTime();
      setHour(initial.h);
      setMinute(initial.m);
      setAmPm(initial.p);
      return;
    }

    const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return;

    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const p = match[3].toUpperCase() as "AM" | "PM";

    setHour(h);
    setMinute(m);
    setAmPm(p);
  }, [value, timezone]);

  useEffect(() => {
    if (open && hour !== null && minute !== null) {
      const formatted = `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      onChange(formatted);
    }
  }, [hour, minute, ampm, open, onChange]);
  const displayTime = () => {
    if (!value) return placeholder;
    return value;
  };

  const displayVal = displayTime();

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm mb-1 text-gray-600">
          {label}
        </label>
      )}

      {customTrigger ? (
        <div onClick={() => !disabled && setOpen((prev) => !prev)}>
            {customTrigger(displayVal)}
        </div>
      ) : (
        <div
          className={`border rounded-lg px-4 py-3 flex items-center gap-2 transition
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <Clock size={16} />
  
          <span
            className={
              value ? "text-black" : "text-gray-400"
            }
          >
            {displayVal}
          </span>
        </div>
      )}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 sm:bottom-auto sm:mt-2 inset-x-0 sm:inset-auto w-full sm:w-72 bg-white rounded-t-2xl sm:rounded-xl shadow-2xl sm:shadow-lg overflow-hidden right-0">
             {/* Mobile Header */}
             <div className='flex sm:hidden items-center justify-between bg-primary p-4 text-white'>
              <span className='font-bold text-lg'>Select Time</span>
              <button 
                type="button"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className='p-4'>
              <div className="hidden sm:flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Select Time</span>
                <button onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <TimeColumn
                  label="Hour"
                  values={Array.from({ length: 12 }, (_, i) => i + 1)}
                  selected={hour}
                  onSelect={setHour}
                />

                <TimeColumn
                  label="Minute"
                  values={Array.from({ length: 60 }, (_, i) => i)}
                  selected={minute}
                  onSelect={setMinute}
                />

                <TimeColumn
                  label="AM/PM"
                  values={["AM", "PM"]}
                  selected={ampm}
                  onSelect={setAmPm}
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={hour === null || minute === null}
                className={`mt-6 w-full py-3 sm:py-2 rounded-xl sm:rounded-lg text-base sm:text-sm font-bold transition shadow-md ${
                  hour === null || minute === null
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"
                }`}
              >
                Save Time
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}