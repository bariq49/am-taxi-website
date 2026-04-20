"use client";

import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";
import TimeColumn from "./time-column";
import { toZonedTime, format } from "date-fns-tz";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";

interface TimePickerProps {
  value?: string;
  onChange: (val: string) => void;
  timezone?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

export default function TimePicker({
  value,
  onChange,
  timezone = DEFAULT_TIMEZONE,
  label,
  disabled,
  placeholder = "Select time",
  error,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    if (!value) return;

    const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return;

    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const p = match[3].toUpperCase() as "AM" | "PM";

    setHour(h);
    setMinute(m);
    setAmPm(p);
  }, [value]);

  const handleSave = () => {
    if (hour === null || minute === null) return;

    const formatted = `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    onChange(formatted);
    setOpen(false);
  };
  const displayTime = () => {
    if (!value) return placeholder;

    try {
      const now = new Date();
      const zoned = toZonedTime(now, timezone);
      return format(zoned, "hh:mm a");
    } catch {
      return value;
    }
  };

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm mb-1 text-gray-600">
          {label}
        </label>
      )}

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
          {displayTime()}
        </span>
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Select Time</span>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
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
              onClick={handleSave}
              disabled={hour === null || minute === null}
              className={`mt-4 w-full py-2 rounded text-sm font-medium transition ${hour === null || minute === null
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-black/90"
                }`}
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}