"use client";

import { useMemo } from "react";
import { useBookingStore } from "@/store/use-booking-store";
import TripRouteDetails from "./trip-route-details";
import { parseAddress, calculateArrivalTime, formatTripDate } from "@/lib/booking-utils";
import { Check, CheckCircle2, Plane, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureTag = ({ label, variant, icon }: { label: string; variant?: "success"; icon: React.ReactNode }) => (
  <div className={cn(
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-colors",
    variant === "success" 
      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
      : "bg-gray-50 text-gray-700 border-gray-200"
  )}>
    {icon}
    {label}
  </div>
);

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
  const hasPickupTime = Boolean(pickupTime);
  const formattedPickupDate = useMemo(() => formatTripDate(pickupDate), [pickupDate]);

  const deliveryTime = useMemo(() => calculateArrivalTime(pickupTime, step1?.durationMinutes), [pickupTime, step1?.durationMinutes]);
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

        <div className="pt-6 border-t border-dashed border-border mt-6 flex flex-wrap gap-2">
          <FeatureTag label="Free cancellation" variant="success" icon={<CheckCircle2 size={14} />} />
          <FeatureTag label="Door-to-door service" icon={<Check size={14} />} />
          <FeatureTag label="Meet & Greet" icon={<Check size={14} />} />
          <FeatureTag label="Flight tracking" icon={<Plane size={14} />} />
          <FeatureTag label="Licensed chauffeurs" icon={<UserCircle size={14} />} />
        </div>
      </div>
    </div>
  );
}

export default SummaryDetails;