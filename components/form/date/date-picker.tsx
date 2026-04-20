"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ChevronRight, Calendar } from "lucide-react";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minSelectableDate?: Date | null;
  excludeDate?: Date | null;
  timezone?: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minSelectableDate,
  excludeDate,
  timezone = DEFAULT_TIMEZONE,
  disabled,
  label,
  error,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    toZonedTime(new Date(), timezone)
  );
  const getToday = () => startOfDay(toZonedTime(new Date(), timezone));

  const parseValueDate = () => {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDisplay = () => {
    if (!value) return placeholder;
    const parsed = parseValueDate();
    if (!parsed) return placeholder;
    return format(parsed, "dd MMM yyyy");
  };

  const getCalendarDays = () => {
    const startMonth = startOfMonth(currentMonth);
    const startDay = (getDay(startMonth) + 6) % 7;

    const startDate = new Date(startMonth);
    startDate.setDate(startMonth.getDate() - startDay);

    return eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 41 * 86400000),
    });
  };

  const isDisabled = (date: Date) => {
    const today = getToday();
    const dateStart = startOfDay(toZonedTime(date, timezone));

    if (isBefore(dateStart, today)) return true;

    if (minSelectableDate) {
      const min = startOfDay(toZonedTime(minSelectableDate, timezone));
      if (isBefore(dateStart, min)) return true;
    }

    if (excludeDate) {
      const ex = startOfDay(toZonedTime(excludeDate, timezone));
      if (isSameDay(dateStart, ex)) return true;
    }

    return false;
  };

  const handleSelect = (date: Date) => {
    const zoned = toZonedTime(date, timezone);
    const formatted = format(zoned, "yyyy-MM-dd");
    onChange(formatted);
    setOpen(false);
  };

  const selectedDate = parseValueDate();

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
        <Calendar size={16} />

        <span className={value ? "text-black" : "text-gray-400"}>
          {formatDisplay()}
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
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronRight className="rotate-180" />
              </button>

              <span className="font-medium">
                {format(currentMonth, "MMMM yyyy")}
              </span>

              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-7 text-xs text-center mb-2 text-gray-500">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 text-sm">
              {getCalendarDays().map((date, i) => {
                const inactive = date.getMonth() !== currentMonth.getMonth();
                const disabledDay = isDisabled(date);
                const selected =
                  selectedDate && isSameDay(date, selectedDate);

                return (
                  <div
                    key={i}
                    onClick={() => !disabledDay && handleSelect(date)}
                    className={`text-center py-2 rounded cursor-pointer
                      ${disabledDay ? "text-gray-300 cursor-not-allowed" : ""}
                      ${inactive ? "text-gray-400" : ""}
                      ${selected ? "bg-black text-white" : "hover:bg-gray-100"}
                    `}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full py-2 text-sm bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}