'use client'

import React, { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Check, WalletCards } from "lucide-react"
import TripRouteDetails from "@/components/features/booking/shared/trip-route-details"
import { useBookingStatus } from "@/hooks/queries/use-booking"
import { formatPrice, parseAddress, formatTripDate } from "@/lib/booking-utils"
import { PaymentSuccessSkeleton } from "@/components/features/skeletons/payment-success-skeleton"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id") || undefined
  const { data: booking, isLoading } = useBookingStatus(bookingId)
  console.log(booking)
  if (isLoading) return <PaymentSuccessSkeleton />

  const pickup = parseAddress(booking?.tripDetails?.pickupAddress)
  const delivery = parseAddress(booking?.tripDetails?.deliveryAddress)
  const routeStops = (booking?.tripDetails?.stops ?? [])
    .filter((stop: { address?: string }) => Boolean(stop.address?.trim()))
    .map((stop: { address?: string }) => parseAddress(stop.address))

  const tripType =
    booking?.category === "hourly"
      ? "Hourly"
      : booking?.category === "return-trip"
        ? "Return"
        : "One Way"
  const outwardValue = formatTripDate(booking?.tripDetails?.pickupDate)
  const passengerName = booking?.passengerDetails?.fullName || "Guest"
  const passengerEmail = booking?.passengerDetails?.email || "N/A"
  const bookingNumber = booking?.bookingNumber || booking?._id || "N/A"
  const fare = booking?.pricingBreakdown?.totals?.subtotal ?? booking?.amount ?? 0
  const totalPaid = booking?.pricingBreakdown?.totals?.totalAmount ?? booking?.amount ?? 0
  const childSeatsCount = (booking?.tripDetails?.childSeats ?? []).reduce(
    (sum: number, item: { quantity?: number }) => sum + (item.quantity || 0),
    0
  )
  const returnChildSeatsCount = (booking?.tripDetails?.returnChildSeats ?? []).reduce(
    (sum: number, item: { quantity?: number }) => sum + (item.quantity || 0),
    0
  )
  const totalChildSeats = childSeatsCount + returnChildSeatsCount
  const vehicleName = booking?.vehicle?.name || "Luxury Fleet"
  const vehiclePassengers = booking?.vehicle?.passengers ?? "—"
  const vehicleSuitcases = booking?.vehicle?.suitcases ?? "—"
  const vehicleClass = booking?.vehicle?.carType || "Standard"
  const vehicleImage = booking?.vehicle?.image || "https://images.unsplash.com/photo-1549399542-7e82138f5d4c?auto=format&fit=crop&w=1200&q=80"

  return (
    <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-3 sm:px-4 pb-6 sm:pb-8">
      <div className="mx-auto w-full container grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr] px-4">
        <div className="space-y-4 sm:space-y-5">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-md mx-auto lg:mx-0">
            <Check className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.6} />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Thank You, {passengerName}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
              Your ride has been confirmed and is ready for your journey. A confirmation email has been sent to {passengerEmail} with full trip details.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background px-4 py-3 sm:px-5 sm:py-4 shadow-sm text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-wide text-muted">
              Confirmation Number
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-foreground">{bookingNumber}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-sm lg:hidden">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Trip Details</h2>
            <TripRouteDetails
              className="mt-4"
              pickup={pickup}
              delivery={delivery}
              stops={routeStops}
              pickupTime={booking?.tripDetails?.pickupTime}
              deliveryTime={booking?.tripDetails?.returnTime}
              showTripMeta
              tripType={tripType}
              categoryLabel="Outward"
              categoryValue={outwardValue}
            />
          </div>

          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-sm lg:hidden">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Vehicle Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
              <div className="overflow-hidden rounded-lg border border-border bg-gray-100 p-2">
                <img
                  src={vehicleImage}
                  alt={vehicleName}
                  className="h-36 sm:h-40 w-full object-contain md:h-full"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Vehicle Type</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehicleName}</p>
                </div>
                <div className="rounded-md bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Car Class</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehicleClass}</p>
                </div>
                <div className="rounded-md bg-gray-50 px-3 py-2 sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Capacity</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehiclePassengers} Passengers, {vehicleSuitcases} Bags</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
            <div className="bg-gray-50/80 border-b border-border px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <WalletCards className="h-5 w-5 text-secondary" />
                Payment Summary
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted bg-white border border-border px-2 py-0.5 rounded-full">
                Receipt
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Base Fare</p>
                <p className="font-bold text-foreground text-lg">{formatPrice(fare, "€")}</p>
              </div>

              {((booking?.tripDetails?.childSeats?.length || 0) > 0 ||
                (booking?.tripDetails?.returnChildSeats?.length || 0) > 0 ||
                (booking?.pricingBreakdown?.extras?.airportPickup?.total > 0)) && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Additional Services</p>

                    <div className="space-y-2">
                      {booking?.tripDetails?.childSeats?.map((seat: any, i: number) => (
                        <div key={`out-${i}`} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-secondary" />
                            {seat.seatId?.name || "Child Seat"} <span className="text-[11px] text-muted">x{seat.quantity} (Outward)</span>
                          </span>
                          <span className="font-medium text-foreground">Included</span>
                        </div>
                      ))}

                      {booking?.tripDetails?.returnChildSeats?.map((seat: any, i: number) => (
                        <div key={`ret-${i}`} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-secondary" />
                            {seat.seatId?.name || "Child Seat"} <span className="text-[11px] text-muted">x{seat.quantity} (Return)</span>
                          </span>
                          <span className="font-medium text-foreground">Included</span>
                        </div>
                      ))}

                      {booking?.pricingBreakdown?.extras?.airportPickup?.total > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-secondary" />
                            Airport Pickup Service
                          </span>
                          <span className="font-medium text-foreground">{formatPrice(booking.pricingBreakdown.extras.airportPickup.total, "€")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              <div className="pt-6 border-t border-dashed border-border-200">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-base font-bold text-muted uppercase tracking-widest mb-1">Total Paid</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-secondary leading-none">
                      {formatPrice(totalPaid, "€")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="hidden rounded-xl border border-border bg-background p-5 shadow-sm lg:block">
            <h2 className="text-2xl font-semibold text-foreground">Trip Details</h2>
            <TripRouteDetails
              className="mt-4"
              pickup={pickup}
              delivery={delivery}
              stops={routeStops}
              pickupTime={booking?.tripDetails?.pickupTime}
              deliveryTime={booking?.tripDetails?.returnTime}
              showTripMeta
              tripType={tripType}
              categoryLabel="Outward"
              categoryValue={outwardValue}
            />
          </div>

          <div className="hidden rounded-xl border border-border bg-background p-5 shadow-sm lg:block">
            <h2 className="text-2xl font-semibold text-foreground">Vehicle Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
              <div className="overflow-hidden rounded-lg border border-border bg-gray-100 p-2">
                <img
                  src={vehicleImage}
                  alt={vehicleName}
                  className="h-40 w-full object-contain md:h-full"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Vehicle Type</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehicleName}</p>
                </div>
                <div className="rounded-md bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Car Class</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehicleClass}</p>
                </div>
                <div className="rounded-md bg-gray-50 px-3 py-2 sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted">Capacity</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{vehiclePassengers} Passengers, {vehicleSuitcases} Bags</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
