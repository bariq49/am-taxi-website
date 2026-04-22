"use client"

import React from "react"
import { Download, Loader } from "lucide-react"
import { toast } from "sonner"
import { useBookingStatus, useDownloadBookingReceipt } from "@/hooks/query/use-booking"
import TripRouteDetails, { type RouteAddress } from "@/components/booking/shared/trip-route-details"

const formatBookingAmount = (value: number) => `$${(Math.round(value * 100) / 100).toFixed(2)}`
const parseAddress = (address?: string): RouteAddress => {
  if (!address?.trim()) return { name: "", detail: "" }
  const parts = address.split(",")
  if (parts.length > 1) {
    return {
      name: parts[0].trim(),
      detail: parts.slice(1).join(",").trim(),
    }
  }
  return { name: address.trim(), detail: "" }
}

function OrderPage({ id }: { id: string }) {
  const { data: booking, isLoading, isError } = useBookingStatus(id)
  console.log("booking", booking)
  const { mutateAsync: downloadReceipt, isPending: isDownloadingReceipt } = useDownloadBookingReceipt()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="animate-spin text-brand mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Order Details</h2>
          <p className="text-gray-600">Please wait while we fetch your booking...</p>
        </div>
      </div>
    )
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Order</h2>
          <p className="text-gray-600">The requested booking could not be found.</p>
        </div>
      </div>
    )
  }

  const stops = booking.tripDetails.stops?.filter((s) => s.address?.trim()) ?? []
  const pickup = parseAddress(booking.tripDetails.pickupAddress)
  const delivery = parseAddress(booking.tripDetails.deliveryAddress)
  const routeStops = stops.map((s) => parseAddress(s.address))

  const totalAmount = booking.amount || 0
  const outboundChildSeatCount = booking.tripDetails.childSeats?.reduce(
    (total, seat) => total + (Number(seat.quantity) || 0),
    0
  ) || 0
  const returnChildSeatCount = booking.tripDetails.returnChildSeats?.reduce(
    (total, seat) => total + (Number(seat.quantity) || 0),
    0
  ) || 0
  const childSeatCount = outboundChildSeatCount + returnChildSeatCount
  const pricing = booking.pricingBreakdown
  const mergedBasePriceAmount =
    (pricing?.vehicle.oneWay.basePrice || 0) +
    (pricing?.vehicle.return.isSelected ? pricing.vehicle.return.basePrice : 0)
  const mergedDiscountAmount =
    (pricing?.vehicle.oneWay.displayDiscountAmount || 0) +
    (pricing?.vehicle.return.isSelected ? pricing.vehicle.return.discountAmount : 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-52">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-2xl mb-8 border border-[#1f3446] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-8 py-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#9fb6c8]">Booking Details</p>
                <h1 className="text-xl sm:text-2xl font-semibold text-white leading-tight">Order Summary</h1>
              </div>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4">
              <div className="text-left sm:text-right">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#9fb6c8]">Booking Number</p>
                <p className="text-sm sm:text-base font-semibold text-white break-all sm:break-normal">{booking.bookingNumber || booking._id}</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await downloadReceipt(booking._id)
                  } catch {
                    toast.error("Unable to download receipt. Please try again.")
                  }
                }}
                disabled={isDownloadingReceipt}
                className="bg-[#0097A7] hover:bg-[#008897] text-white h-10 px-4 text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                <Download size={14} />
                {isDownloadingReceipt ? "Downloading..." : "Download Receipt"}
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Route</h2>
            {/* <TripRouteDetails
              pickup={pickup}
              delivery={delivery}
              stops={routeStops}
              pickupTime={booking.tripDetails.pickupTime}
              showAnimation
            /> */}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Passenger Details</h3>
              <InfoField label="Name" value={booking.passengerDetails.fullName} />
              <InfoField label="Email" value={booking.passengerDetails.email} />
              <InfoField label="Phone" value={booking.passengerDetails.phone} />
              <InfoField label="State" value={booking.passengerDetails.state} />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Trip Details</h3>
              <InfoField label="Category" value={booking.category} />
              <InfoField label="Pickup Date" value={booking.tripDetails.pickupDate} />
              <InfoField label="Pickup Time" value={booking.tripDetails.pickupTime} />
              <InfoField label="Passengers" value={String(booking.tripDetails.passengers)} />
              <InfoField label="Bags" value={String(booking.tripDetails.bags)} />
              <InfoField label="Distance" value={`${booking.tripDetails.distanceMiles || 0} miles`} />
              {booking.tripDetails.isReturn ? (
                <>
                  <InfoField label="Return Date" value={booking.tripDetails.returnDate || "N/A"} />
                  <InfoField label="Return Time" value={booking.tripDetails.returnTime || "N/A"} />
                </>
              ) : null}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Extras & Status</h3>
              <InfoField label="Airport Pickup" value={booking.tripDetails.isAirportPickup ? "Yes" : "No"} />
              <InfoField label="Meet & Greet" value={booking.tripDetails.isMeetGreet ? "Yes" : "No"} />
              <InfoField
                label="Return Meet & Greet"
                value={booking.tripDetails.isReturnMeetGreet ? "Yes" : "No"}
              />
              <InfoField label="Child Seats" value={String(childSeatCount)} />
              <InfoField label="Payment Status" value={booking.paymentStatus} />
              <InfoField label="Booking Status" value={booking.status} />
              <InfoField label="Total Amount" value={formatBookingAmount(totalAmount)} strong />
            </div>
          </section>

          {booking.tripDetails.instructions ? (
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{booking.tripDetails.instructions}</p>
            </section>
          ) : null}
          {booking.vehicle ? (
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">

                <div className="flex-1 space-y-4">
                  {(booking.vehicle as any).description && (
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      "{(booking.vehicle as any).description}"
                    </p>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-100">
                    <InfoField label="Vehicle Type" value={(booking.vehicle as any).name || "Luxury Fleet"} />
                    <InfoField label="Capacity" value={`${(booking.vehicle as any).passengers} Passengers`} />
                    <InfoField label="Suitcases" value={`${(booking.vehicle as any).suitcases} Large Bags`} />
                    <InfoField label="Service" value={(booking.vehicle as any).timePeriod || "Professional Chauffeur"} />
                  </div>
                </div>
              </div>
            </section>
          ) : null}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Breakdown</h3>

            {pricing ? (
              <div className="space-y-2">
                <InfoField
                  label={
                    pricing.vehicle.return.isSelected
                      ? "Base Price (One-way + Return)"
                      : "Base Price"
                  }
                  value={formatBookingAmount(mergedBasePriceAmount)}
                />
                <InfoField
                  label={
                    pricing.vehicle.return.isSelected
                      ? `Discount (One-way ${pricing.vehicle.oneWay.displayDiscountRate}% + Return ${pricing.vehicle.return.discountRate}%)`
                      : `Discount (${pricing.vehicle.oneWay.displayDiscountRate}%)`
                  }
                  value={`- ${formatBookingAmount(mergedDiscountAmount)}`}
                  isDiscount
                />
                {pricing.extras.stops.total > 0 ? (
                  <InfoField
                    label={`Stops (${pricing.extras.stops.count} x ${formatBookingAmount(pricing.extras.stops.unitPrice)})`}
                    value={formatBookingAmount(pricing.extras.stops.total)}
                  />
                ) : null}

                {pricing.extras.airportPickup.total > 0 ? (
                  <InfoField
                    label="Airport Pickup"
                    value={formatBookingAmount(pricing.extras.airportPickup.total)}
                  />
                ) : null}

                {pricing.extras.meetAndGreet.outbound.total > 0 ? (
                  <InfoField
                    label="Meet & Greet (One-way)"
                    value={formatBookingAmount(pricing.extras.meetAndGreet.outbound.total)}
                  />
                ) : null}

                {pricing.extras.meetAndGreet.return.total > 0 ? (
                  <InfoField
                    label="Meet & Greet (Return)"
                    value={formatBookingAmount(pricing.extras.meetAndGreet.return.total)}
                  />
                ) : null}

                {pricing.extras.childSeats.items.map((item) => (
                  <InfoField
                    key={`${item.tripType}-${item.seatId}`}
                    label={`${item.name || "Child Seat"} (${item.tripType === "return" ? "Return" : "One-way"} - ${item.quantity} x ${formatBookingAmount(item.unitPrice)})`}
                    value={formatBookingAmount(item.total)}
                  />
                ))}

              </div>
            ) : (
              <p className="text-sm text-gray-600">Detailed pricing snapshot is not available for this booking.</p>
            )}

            <div className="border-t border-gray-200 mt-4 pt-3">
              <InfoField label="Charged Amount" value={formatBookingAmount(totalAmount)} strong />
            </div>
          </section>


        </main>
      </div>
    </div>
  )
}

function InfoField({
  label,
  value,
  strong = false,
  isDiscount = false,
}: {
  label: string
  value: string
  strong?: boolean
  isDiscount?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={isDiscount ? "text-sm font-medium text-red-600" : "text-sm text-gray-500"}>
        {label}
      </span>
      <span
        className={
          strong
            ? "text-sm font-semibold text-gray-900"
            : isDiscount
              ? "text-sm font-medium text-red-600"
              : "text-sm text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  )
}

export default OrderPage