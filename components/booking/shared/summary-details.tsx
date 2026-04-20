"use client";

import { useMemo } from "react";
import {
  Users,
  Check,
  Luggage,
} from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { addMinutes, parse, format, isValid, parseISO } from "date-fns";
import Image from "next/image";
import { calculateCheckoutPricingBreakdown, formatBookingAmount } from "@/lib/booking-pricing";
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
  const { category, step1, step3, selectedVehicle, bookingSettings } = useBookingStore();
  const isHourly = category === "hourly";

  const pricing = useMemo(() => {
    return calculateCheckoutPricingBreakdown({
      step1,
      step3,
      selectedVehicle,
      bookingSettings,
    });
  }, [step1, step3, selectedVehicle, bookingSettings]);

  const pickup = useMemo(() => parseAddress(step1?.pickupAddress || ""), [step1?.pickupAddress]);
  const delivery = useMemo(() => parseAddress(step1?.deliveryAddress || ""), [step1?.deliveryAddress]);

  const stops = useMemo(
    () => (step1?.stops ?? []).filter((stop) => Boolean(stop.address?.trim())).map(s => parseAddress(s.address)),
    [step1?.stops]
  );

  const formattedDistance = useMemo(() => {
    if (typeof step1?.distanceMiles !== "number") return null;
    const miles = step1.distanceMiles.toFixed(1);
    return `~ ${miles} Mi`;
  }, [step1?.distanceMiles]);

  const formattedDuration = useMemo(() => {
    if (step1?.duration?.trim()) return `~ ${step1.duration.trim()}`;
    if (typeof step1?.durationMinutes === "number") return `~ ${step1.durationMinutes} min`;
    return null;
  }, [step1?.duration, step1?.durationMinutes]);

  const pickupDate = step3?.pickupDate?.trim() ?? "";
  const pickupTime = step3?.pickupTime?.trim() ?? "";
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
    <div className="mx-auto w-full rounded-2xl border border-border bg-background p-4 sm:p-5 mb-52">
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

        {/* Route timeline (line + moving dot) only for point-to-point trips; hourly is a single location */}
        <div
          className={cn("relative pb-1 pt-1", isHourly ? "pl-0" : "pl-7")}
        >
          {!isHourly && (
            <div className="absolute bottom-[34px] left-[3px] top-[14px] w-[2px] overflow-visible bg-border">
              <div
                className="absolute left-1/2 z-10 h-2 w-2 rounded-full bg-primary shadow-sm"
                style={{ animation: "moveDown 4s ease-in-out infinite" }}
              />
            </div>
          )}

          {/* Pickup Point */}
          <div className={cn("relative", !isHourly && "mb-5")}>
            {isHourly ? (
              <div className="flex items-start gap-3">
                <div
                  className="mt-1 h-4 w-4 shrink-0 rounded-[4px] border-[3px] border-background bg-primary shadow-sm ring-1 ring-primary"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                        {pickup.name || "Pickup location"}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {pickup.detail || "Full address not specified"}
                      </p>
                    </div>
                  </div>
                  {formattedDistance && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-muted-foreground">
                        {formattedDistance}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="absolute -left-8 top-1 h-4 w-4 rounded-[4px] border-[3px] border-background bg-primary shadow-sm ring-1 ring-primary">
                  <div
                    className="absolute inset-0 rounded-[2px] bg-primary"
                    style={{ animation: "pulseAtDestination 4s ease-in-out infinite" }}
                  />
                </div>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                      {pickup.name || "Pickup location"}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {pickup.detail || "Full address not specified"}
                    </p>
                  </div>
                  <span className="whitespace-nowrap pt-0.5 text-sm font-semibold uppercase text-foreground">
                    {hasPickupTime ? pickupTime : "—"}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {formattedDuration && (
                    <div className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-muted-foreground">
                      {formattedDuration}
                    </div>
                  )}
                  {formattedDistance && (
                    <div className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-muted-foreground">
                      {formattedDistance}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Intermediate stops — timeline markers only for point-to-point */}
          {!isHourly &&
            stops.map((stop, idx) => (
              <div key={idx} className="relative mb-5">
                <div className="absolute -left-8 top-1 h-4 w-4 rounded-full border-[3px] border-background bg-primary shadow-sm ring-1 ring-primary" />
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                      {stop.name || `Stop ${idx + 1}`}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70">{stop.detail}</p>
                  </div>
                </div>
              </div>
            ))}

          {isHourly &&
            stops.map((stop, idx) => (
              <div key={`hourly-stop-${idx}`} className="mt-4 flex items-start gap-3 border-t border-border pt-4">
                <div
                  className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                    {stop.name || `Stop ${idx + 1}`}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">{stop.detail}</p>
                </div>
              </div>
            ))}

          {/* Delivery — not shown for hourly charters */}
          {!isHourly && (
            <div className="relative">
              <div className="absolute -left-8 top-1 h-4 w-4 rounded-[4px] border-[3px] border-background bg-primary ring-1 ring-primary shadow-sm">
                <div
                  className="absolute inset-0 rounded-[2px] bg-primary"
                  style={{ animation: "pulseAtDestination 4s ease-in-out infinite" }}
                />
              </div>
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                    {delivery.name || "Delivery location"}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {delivery.detail || "Full address not specified"}
                  </p>
                </div>
                <span className="whitespace-nowrap pt-0.5 text-sm font-semibold uppercase text-foreground">
                  {hasPickupTime ? deliveryTime : "—"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Selected Vehicle Section */}
        {selectedVehicle && (
          <div className="mb-2">
            <h3 className="mb-2 text-base font-semibold text-foreground">Selected Vehicle</h3>
            <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-2">
              <div className="flex-shrink-0">
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="mb-1 text-sm font-semibold text-foreground sm:text-base">{selectedVehicle.name}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span> {selectedVehicle.passengers} passengers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Luggage size={14} />
                    <span>{selectedVehicle.suitcases} suitcases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fare Summary */}
        <div className="pt-2 border-t border-border">
          <h3 className="mb-2 text-base font-semibold text-foreground">Fare Summary</h3>
          <div className="space-y-1.5">
            {/* Base Price */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {isHourly
                  ? `Hourly (${selectedVehicle?.name ?? "Vehicle"})`
                  : `One-Way Price (${selectedVehicle?.name ?? "Vehicle"})`}
              </span>
              <span className="font-medium text-foreground">{formatBookingAmount(pricing.vehicle.oneWay.totalPrice)}</span>
            </div>

            {/* Extra Stops */}
            {pricing.extras.stops.count > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Extra Stops ({pricing.extras.stops.count})</span>
                <span className="font-medium text-foreground">{formatBookingAmount(pricing.extras.stops.total)}</span>
              </div>
            )}

            {/* Airport Pickup */}
            {pricing.extras.airportPickup.isSelected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Airport Pickup</span>
                <span className="font-medium text-foreground">{formatBookingAmount(pricing.extras.airportPickup.total)}</span>
              </div>
            )}

            {/* Meet & Greet (One-Way) */}
            {pricing.extras.meetAndGreet.outbound.isSelected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meet & Greet (One-Way)</span>
                <span className="font-medium text-foreground">{formatBookingAmount(pricing.extras.meetAndGreet.outbound.total)}</span>
              </div>
            )}

            {/* Meet & Greet (Return) */}
            {pricing.extras.meetAndGreet.return.isSelected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meet & Greet (Return)</span>
                <span className="font-medium text-foreground">{formatBookingAmount(pricing.extras.meetAndGreet.return.total)}</span>
              </div>
            )}

            {/* Child Seats (One-Way) */}
            {pricing.extras.childSeats.items.filter(i => i.tripType === "outbound").length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Child Seats (One-Way) ({pricing.extras.childSeats.items.filter(i => i.tripType === "outbound").reduce((s, i) => s + i.quantity, 0)})
                </span>
                <span className="font-medium text-foreground">
                  {formatBookingAmount(pricing.extras.childSeats.items.filter(i => i.tripType === "outbound").reduce((s, i) => s + i.total, 0))}
                </span>
              </div>
            )}

            {/* Child Seats (Return) */}
            {pricing.extras.childSeats.items.filter(i => i.tripType === "return").length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Child Seats (Return) ({pricing.extras.childSeats.items.filter(i => i.tripType === "return").reduce((s, i) => s + i.quantity, 0)})
                </span>
                <span className="font-medium text-foreground">
                  {formatBookingAmount(pricing.extras.childSeats.items.filter(i => i.tripType === "return").reduce((s, i) => s + i.total, 0))}
                </span>
              </div>
            )}

            {/* Return Trip */}
            {pricing.vehicle.return.isSelected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Return Trip</span>
                <span className="font-bold text-foreground">{formatBookingAmount(pricing.vehicle.return.totalPrice)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">{formatBookingAmount(pricing.totals.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1">
            <Check size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Free 30 minutes waiting time</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1">
            <Check size={14} className="text-foreground" />
            <span className="text-xs font-medium text-foreground/80">Door-to-door service</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes moveDown {
          0% { top: 0%; opacity: 0; transform: translateX(-50%) scale(0.6); }
          10% { opacity: 1; transform: translateX(-50%) scale(1); }
          90% { opacity: 1; transform: translateX(-50%) scale(1); }
          100% { top: 100%; opacity: 0; transform: translateX(-50%) scale(0.6); }
        }
        @keyframes pulseAtDestination {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default SummaryDetails;