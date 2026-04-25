"use client";

import { useState, useMemo, useCallback } from "react";
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
  isSameMonth,
  parse,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ChevronRight, Calendar, X } from "lucide-react";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";

interface DatePickerProps {
  value?: string; // yyyy-MM-dd
  onChange: (value: string) => void;
  placeholder?: string;
  minSelectableDate?: Date | null;
  excludeDate?: Date | null;
  timezone?: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  customTrigger?: (value: string) => React.ReactNode;
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
  customTrigger,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  // Today in the target timezone
  const todayZoned = useMemo(() => startOfDay(toZonedTime(new Date(), timezone)), [timezone]);

  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(toZonedTime(new Date(), timezone))
  );

  const selectedDate = useMemo(() => {
    if (!value) return null;
    try {
      return parse(value, "yyyy-MM-dd", new Date());
    } catch {
      return null;
    }
  }, [value]);

  const displayValue = useMemo(() => {
    if (!selectedDate) return placeholder;
    return format(selectedDate, "dd MMM yyyy");
  }, [selectedDate, placeholder]);

  const calendarDays = useMemo(() => {
    const startMonth = startOfMonth(currentMonth);
    // Adjust for Monday start: (getDay + 6) % 7
    const startDayOffset = (getDay(startMonth) + 6) % 7;

    const startDate = new Date(startMonth);
    startDate.setDate(startMonth.getDate() - startDayOffset);

    return eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 41 * 86400000),
    });
  }, [currentMonth]);

  const checkIsDisabled = useCallback((date: Date) => {
    const dateStart = startOfDay(toZonedTime(date, timezone));

    if (isBefore(dateStart, todayZoned)) return true;

    if (minSelectableDate) {
      const min = startOfDay(toZonedTime(minSelectableDate, timezone));
      if (isBefore(dateStart, min)) return true;
    }

    if (excludeDate) {
      const ex = startOfDay(toZonedTime(excludeDate, timezone));
      if (isSameDay(dateStart, ex)) return true;
    }

    return false;
  }, [timezone, todayZoned, minSelectableDate, excludeDate]);

  const handleSelect = (date: Date) => {
    const zoned = toZonedTime(date, timezone);
    onChange(format(zoned, "yyyy-MM-dd"));
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm mb-1.5 font-medium text-gray-700">
          {label}
        </label>
      )}

      {customTrigger ? (
        <div onClick={() => !disabled && setOpen((prev) => !prev)}>
          {customTrigger(displayValue)}
        </div>
      ) : (
        <div
          className={`border rounded-md px-4 py-2.5 flex items-center gap-2 transition
            ${error ? "border-red-500 bg-red-50/10" : "border-border hover:border-gray-400"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer bg-white"}
          `}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <Calendar size={16} className={error ? "text-red-500" : "text-gray-400"} />

          <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
            {displayValue}
          </span>
        </div>
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 sm:bottom-auto sm:mt-2 inset-x-0 sm:inset-auto w-full sm:w-[340px] bg-white rounded-t-2xl sm:rounded-xl shadow-2xl border border-border overflow-hidden sm:left-0 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className='p-5'>
              <div className="flex justify-between items-center mb-5">
                <button
                  type="button"
                  disabled={isSameMonth(currentMonth, todayZoned)}
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-20 disabled:pointer-events-none'
                >
                  <ChevronRight size={18} className="rotate-180 text-gray-600" />
                </button>

                <h3 className="font-bold text-gray-900 text-sm">
                  {format(currentMonth, "MMMM yyyy")}
                </h3>

                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-[10px] text-center mb-3 font-bold text-gray-400 uppercase tracking-widest">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm">
                {calendarDays.map((date, i) => {
                  const inactive = !isSameMonth(date, currentMonth);
                  const disabledDay = checkIsDisabled(date);
                  const selected = selectedDate && isSameDay(date, selectedDate);

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleSelect(date)}
                      className={`relative text-center py-2.5 rounded-lg transition-all focus:outline-none
                        ${disabledDay ? "text-gray-200 cursor-not-allowed" : "cursor-pointer"}
                        ${inactive && !disabledDay ? "text-gray-300" : ""}
                        ${!inactive && !disabledDay ? "font-semibold text-gray-700" : ""}
                        ${selected
                          ? "bg-black text-white shadow-lg font-bold"
                          : !disabledDay ? "hover:bg-gray-100" : ""
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}