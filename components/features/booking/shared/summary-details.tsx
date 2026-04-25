"use client";

import { useMemo } from "react";
import { useBookingStore, useTotalPrice } from "@/store/use-booking-store";
import TripRouteDetails from "./trip-route-details";
import { parseAddress, calculateArrivalTime, formatTripDate, formatPrice } from "@/lib/booking-utils";
import { Check, CheckCircle2, Plane, UserCircle, Users, Luggage } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PaymentMethods from "@/components/shared/payment-methods";
import { IMAGES } from "@/constants/image-constants";

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
  const { category, step1, step3, selectedVehicle } = useBookingStore();
  const totalPrice = useTotalPrice();
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
    <>
      <div className="mx-auto w-full rounded-none lg:rounded-lg border border-border p-4 sm:p-5 shadow-sm mt-2 bg-white">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Your Booking</h2>

          <div className="">
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

          {selectedVehicle && (
            <div className="space-y-3 py-2 border-y border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Your choice</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-12 flex-shrink-0">
                  <Image
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-lg truncate leading-none mb-1">{selectedVehicle.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <p className="text-sm text-gray-500"> Up to </p>
                      <Users className="text-gray-400 h-4 w-4" />
                      <span className="text-sm text-gray-500">{selectedVehicle.passengers} passengers</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Luggage className="text-gray-400 h-4 w-4" />
                      <span className="text-sm text-gray-500">{selectedVehicle.suitcases} suitcases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Price details</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium text-lg leading-none">Total</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <FeatureTag label="Free cancellation" variant="success" icon={<CheckCircle2 className="h-4 w-4" />} />
            <FeatureTag label="Door-to-door service" icon={<Check className="h-4 w-4" />} />
            <FeatureTag label="Meet & Greet" icon={<Check className="h-4 w-4" />} />
            <FeatureTag label="Flight tracking" icon={<Plane className="h-4 w-4" />} />
            <FeatureTag label="Licensed chauffeurs" icon={<UserCircle className="h-4 w-4" />} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <PaymentMethods image={IMAGES.PAYMENT_METHODS} />
      </div>
    </>
  );
}

export default SummaryDetails;