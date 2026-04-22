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
  isSameMonth,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ChevronRight, Calendar, X } from "lucide-react";
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
  const displayValue = formatDisplay();

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm mb-1 text-gray-600">
          {label}
        </label>
      )}
      {customTrigger ? (
        <div onClick={() => !disabled && setOpen((prev) => !prev)}>
          {customTrigger(displayValue)}
        </div>
      ) : (
        <div
          className={`border rounded-sm px-4 py-2.5 flex items-center gap-2 transition
            ${error ? "border-red-500" : "border-border"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <Calendar size={16} />

          <span className={value ? "text-black" : "text-gray-400"}>
            {displayValue}
          </span>
        </div>
      )}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 sm:bottom-auto sm:mt-2 inset-x-0 sm:inset-auto w-full sm:w-[320px] bg-white rounded-t-2xl sm:rounded-xl shadow-2xl sm:shadow-lg sm:left-0">
            {/* Mobile Header - Primary background */}
            <div className='flex sm:hidden items-center justify-between bg-primary p-4 text-white'>
              <span className='font-bold text-lg'>Select Date</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className='p-4'>
              <div className="flex justify-between items-center mb-3">
                <button
                  type="button"
                  disabled={isSameMonth(currentMonth, new Date())}
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className='p-1 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-20 disabled:pointer-events-none'
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>

                <span className="font-bold text-slate-800">
                  {format(currentMonth, "MMMM yyyy")}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className='p-1 hover:bg-slate-100 rounded-full transition-colors'
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-xs text-center mb-2 font-bold text-slate-500 uppercase tracking-wider">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1 text-sm">
                {getCalendarDays().map((date, i) => {
                  const inactive = date.getMonth() !== currentMonth.getMonth();
                  const disabledDay = isDisabled(date);
                  const selected = selectedDate && isSameDay(date, selectedDate);

                  return (
                    <div
                      key={i}
                      onClick={() => !disabledDay && handleSelect(date)}
                      className={`text-center py-2.5 rounded-lg cursor-pointer transition-all
                        ${disabledDay ? "text-slate-300 cursor-not-allowed" : ""}
                        ${inactive ? "text-slate-200" : (disabledDay ? "text-slate-300" : "font-bold text-slate-900")}
                        ${selected
                          ? "bg-primary text-white shadow-md font-bold !text-white"
                          : !disabledDay && !inactive ? "hover:bg-slate-100" : ""
                        }
                      `}
                    >
                      {date.getDate()}
                    </div>
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