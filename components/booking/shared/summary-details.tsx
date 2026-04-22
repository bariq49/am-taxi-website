"use client";

import { useMemo } from "react";
import {
  Users,
  Check,
  Luggage,
  MapPin,
  Clock,
} from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { addMinutes, parse, format, isValid, parseISO } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";

function parseAddress(address: string) {
  if (!address) return { name: "", detail: "" };
  const parts = address.split(",");
  if (parts.length > 1) {
    return {
      name: parts[0].trim(),
      detail: parts.slice(1).join(",").trim(),
    };
  }
  return { name: address, detail: "" };
}

function SummaryDetails() {
  const { category, step1, step3 } = useBookingStore();
  const isHourly = category === "hourly";
  const pickup = useMemo(() => parseAddress(step1?.pickupAddress || ""), [step1?.pickupAddress]);
  const delivery = useMemo(() => parseAddress(step1?.deliveryAddress || ""), [step1?.deliveryAddress]);

  const stops = useMemo(
    () => (step1?.stops ?? []).filter((stop) => Boolean(stop.address?.trim())).map(s => parseAddress(s.address)),
    [step1?.stops]
  );

  const pickupDate = (step1?.pickupDate || step3?.pickupDate || "").trim();
  const pickupTime = (step1?.pickupTime || step3?.pickupTime || "").trim();
  const hasPickupDate = Boolean(pickupDate);
  const hasPickupTime = Boolean(pickupTime);
  const formattedPickupDate = useMemo(() => {
    if (!hasPickupDate) return "—";
    try {
      const isoDate = parseISO(pickupDate);
      if (isValid(isoDate)) return format(isoDate, "MM/dd/yyyy");
      const fallbackDate = parse(pickupDate, "yyyy-MM-dd", new Date());
      if (isValid(fallbackDate)) return format(fallbackDate, "MM/dd/yyyy");
      return pickupDate;
    } catch {
      return pickupDate;
    }
  }, [hasPickupDate, pickupDate]);

  const deliveryTime = useMemo(() => {
    if (!hasPickupTime || !pickupTime || typeof step1?.durationMinutes !== "number") return "—";
    try {
      let date = parse(pickupTime, "hh:mm a", new Date());
      if (!isValid(date)) {
        date = parse(pickupTime, "HH:mm", new Date());
      }
      if (!isValid(date)) return "—";

      const arrivalDate = addMinutes(date, step1.durationMinutes);
      return format(arrivalDate, "hh:mm a");
    } catch (e) {
      return "—";
    }
  }, [hasPickupTime, pickupTime, step1?.durationMinutes]);

  return (
    <div className="mx-auto w-full rounded-none lg:rounded-sm border-0 lg:border lg:border-border bg-background p-4 sm:p-5 mb-52 shadow-none">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your Booking</h2>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">Trip</span>
            <span className="text-sm font-medium text-foreground">
              {category === "hourly"
                ? "Hourly"
                : category === "return-trip"
                  ? "Return"
                  : "One Way"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">
              {isHourly ? "Duration" : "Outward"}
            </span>
            <span className="text-sm font-medium text-foreground text-right">
              {isHourly
                ? step1?.duration?.trim() || "—"
                : formattedPickupDate}
            </span>
          </div>
        </div>
        <div
          className={cn("relative pb-1 pt-1", isHourly ? "pl-0" : "pl-9")}
        >
          {!isHourly && (
            <div className="absolute left-[10px] top-[24px] bottom-[35px] w-[4px] bg-gray-200 overflow-visible z-0">
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 h-2.5 w-2.5 rounded-full bg-primary/30"
                style={{ animation: "moveDown 3.5s linear infinite" }}
              />
            </div>
          )}

          {/* Pickup Point */}
          <div className={cn("relative", !isHourly && "mb-8")}>
            {isHourly ? (
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#00283d]" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base">
                    {pickup.name || "Pickup location"}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pickup.detail || "Full address not specified"}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute -left-[32px] top-[6px] h-4 w-4 rounded-full border-[2.5px] border-[#00283d] bg-white z-10" />
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                      {pickup.name || "Pickup location"}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed truncate">
                      {pickup.detail || "Full address not specified"}
                    </p>
                  </div>
                  <span className="whitespace-nowrap pt-1 text-sm font-black text-gray-900 italic tracking-tighter">
                    {hasPickupTime ? pickupTime : "—"}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Intermediate stops */}
          {!isHourly &&
            stops.map((stop, idx) => (
              <div key={idx} className="relative mb-8">
                <div className="absolute -left-[28.5px] top-[8px] h-2.5 w-2.5 rounded-full bg-gray-300 border-[1.5px] border-white z-10" />
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                      {stop.name || `Stop ${idx + 1}`}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500 leading-relaxed truncate">{stop.detail}</p>
                  </div>
                </div>
              </div>
            ))}

          {isHourly &&
            stops.map((stop, idx) => (
              <div key={`hourly-stop-${idx}`} className="mt-6 flex items-start gap-4 border-t border-gray-100 pt-6">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-tight text-gray-800 sm:text-base">
                    {stop.name || `Stop ${idx + 1}`}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{stop.detail}</p>
                </div>
              </div>
            ))}

          {/* Delivery — not shown for hourly charters */}
          {!isHourly && (
            <div className="relative">
              <div className="absolute -left-[32.5px] top-[2px] z-10">
                <MapPin className="h-[20px] w-[20px] text-[#00283d]" strokeWidth={2.5} />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                    {delivery.name || "Delivery location"}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed truncate">
                    {delivery.detail || "Full address not specified"}
                  </p>
                </div>
                <span className="whitespace-nowrap pt-1 text-sm font-black text-gray-900 italic tracking-tighter shrink-0">
                  {hasPickupTime ? deliveryTime : "—"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes moveDown {
          0% { top: 0%; opacity: 0; transform: scale(0.6); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1); }
          100% { top: 100%; opacity: 0; transform: scale(0.6); }
        }
      ` }} />
    </div>
  );
}

export default SummaryDetails;