"use client";

import { useMemo } from "react";
import {
  Users,
  Check,
  Luggage,
  Clock,
} from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { addMinutes, parse, format, isValid, parseISO } from "date-fns";
import Image from "next/image";
import TripRouteDetails from "./trip-route-details";

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
  const tripTypeLabel =
    category === "hourly"
      ? "Hourly"
      : category === "return-trip"
        ? "Return"
        : "One Way";
  const outwardValue = isHourly ? step1?.duration?.trim() || "—" : formattedPickupDate;

  return (
    <div className="mx-auto w-full rounded-none lg:rounded-sm border-0 lg:border lg:border-border bg-background p-4 sm:p-5 mb-52 shadow-none">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your Booking</h2>
        <TripRouteDetails
          pickup={pickup}
          delivery={delivery}
          stops={stops}
          isHourly={isHourly}
          showTripMeta
          tripType={tripTypeLabel}
          categoryLabel={isHourly ? "Duration" : "Outward"}
          categoryValue={outwardValue}
          pickupTime={hasPickupTime ? pickupTime : undefined}
          deliveryTime={hasPickupTime ? deliveryTime : undefined}
        />
      </div>
    </div>
  );
}

export default SummaryDetails;