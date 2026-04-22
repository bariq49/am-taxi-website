'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Download, Loader } from 'lucide-react'
import { MdDone } from 'react-icons/md'
import { toast } from 'sonner'
import { useBookingStatus, useDownloadBookingReceipt } from '@/hooks/query/use-booking'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectSeconds, setRedirectSeconds] = React.useState(10)

  const bookingId = searchParams.get('booking_id') || searchParams.get('id') || ''
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingStatus(bookingId || undefined)
  const { mutateAsync: downloadReceipt, isPending: isDownloadingReceipt } = useDownloadBookingReceipt()
  const trackedPurchaseIdRef = React.useRef<string | null>(null)


  const pickup = booking?.tripDetails?.pickupAddress || "";
  const delivery = booking?.tripDetails?.deliveryAddress || "";
  const stops = React.useMemo(
    () => (booking?.tripDetails?.stops ?? []).filter((stop) => Boolean(stop.address?.trim())).map(s => s.address),
    [booking?.tripDetails?.stops]
  );

  const formattedDuration = null;

  const pickupTime = booking?.tripDetails?.pickupTime || "";

  React.useEffect(() => {
    if (redirectSeconds <= 0) {
      router.push('/')
      return
    }

    const timer = window.setTimeout(() => {
      setRedirectSeconds((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [redirectSeconds, router])

  React.useEffect(() => {
    if (!booking) return
    if (booking.paymentStatus !== "paid") return

    const transactionId = booking.bookingNumber || booking._id
    if (!transactionId || trackedPurchaseIdRef.current === transactionId) return

    const dataLayerPayload = {
      event: "purchase",
      ecommerce: {
        transaction_id: transactionId,
        value: Number(booking.amount || 0),
        currency: "USD",
        items: [
          {
            item_id: booking.vehicle?._id || booking._id,
            item_name: booking.vehicle?.name || "Limo Booking",
            item_category: booking.category,
            quantity: 1,
            price: Number(booking.amount || 0),
          },
        ],
      },
    }

    const windowWithDataLayer = window as Window & { dataLayer?: unknown[] }
    windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || []
    windowWithDataLayer.dataLayer.push(dataLayerPayload)
    trackedPurchaseIdRef.current = transactionId
  }, [booking])

  if (isLoading) {
    return (
      <div className='w-full min-h-[50vh] bg-secondary/70 flex items-center justify-center'>
        <Loader className='animate-spin text-primary' />
      </div>
    )
  }

  if (!bookingId || isError || !booking) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center p-4'>
        <div className='bg-background border border-destructive/30 text-destructive rounded-xl p-4 text-center'>
          {!bookingId ? 'Booking ID is missing in URL.' : 'Unable to load booking details.'}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-secondary flex flex-col min-h-[50vh] pt-52'>
      <div className='max-w-5xl mx-auto py-16 lg:py-24 w-full flex items-center justify-center flex-col gap-6 lg:gap-12 text-center p-3'>
        <div className='w-full flex items-center justify-center flex-col gap-3 lg:gap-5'>
          <MdDone className='p-2 text-background bg-primary rounded-full' size={45} />
          <div className='text-foreground/80'>Great choice, {booking.passengerDetails.fullName}</div>
          <div className='text-foreground text-2xl lg:text-4xl font-bold'>YOUR RESERVATION IS CONFIRMED</div>
          <div className='text-foreground/80'>
            We&apos;ve sent a confirmation email to {booking.passengerDetails.email}
          </div>
        </div>

        <div className='w-full grid md:grid-cols-3 lg:gap-5'>
          <div className='lg:col-span-2 w-full bg-background max-lg:rounded-b-xl max-lg:order-2 lg:rounded-l-xl border border-border py-6 px-8 gap-8 flex flex-col justify-center text-start relative overflow-hidden'>
            <div className='text-xl lg:text-2xl font-bold text-foreground'>Your itinerary</div>

            {/* Route Timeline */}
            <div className="relative pb-1 pl-9 pt-1">
              {/* Vertical line */}
              <div className="absolute bottom-[20px] left-[7px] top-[14px] w-[2px] overflow-visible bg-border">
                <div
                  className="absolute left-1/2 z-10 h-2 w-2 rounded-full bg-primary shadow-sm"
                  style={{ animation: "moveDown 4s ease-in-out infinite" }}
                />
              </div>

              {/* Pickup Point */}
              <div className="relative mb-5">
                <div className="absolute -left-9 top-1 h-4 w-4 rounded-[4px] border-[3px] border-background bg-primary ring-1 ring-primary shadow-sm">
                  <div
                    className="absolute inset-0 rounded-[2px] bg-primary"
                    style={{ animation: "pulseAtDestination 4s ease-in-out infinite" }}
                  />
                </div>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-normal leading-tight text-foreground/90 sm:text-base">
                      {pickup || "Pickup location"}
                    </h3>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {formattedDuration && (
                    <div className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-muted-foreground">
                      {formattedDuration}
                    </div>
                  )}
                </div>
              </div>

              {/* Intermediate Stops */}
              {stops.map((stop, idx) => (
                <div key={idx} className="relative mb-5">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full border-[3px] border-background bg-primary ring-1 ring-primary shadow-sm"></div>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-normal leading-tight text-foreground/90 sm:text-base">
                        {stop || `Stop ${idx + 1}`}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Point */}
              {delivery && (
                <div className="relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-[4px] border-[3px] border-background bg-primary ring-1 ring-primary shadow-sm">
                    <div
                      className="absolute inset-0 rounded-[2px] bg-primary"
                      style={{ animation: "pulseAtDestination 4s ease-in-out infinite" }}
                    />
                  </div>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-normal leading-tight text-foreground/90 sm:text-base">
                        {delivery || "Delivery location"}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-foreground/70 font-medium'>Pickup Date & Time</div>
              <div className='text-foreground font-semibold'>
                {booking.tripDetails.pickupDate} {booking.tripDetails.pickupTime}
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

            <div className='flex items-center justify-end w-full'>
              <div className='flex items-center gap-3'>
                <button
                  type='button'
                  onClick={async () => {
                    try {
                      await downloadReceipt(booking._id)
                    } catch {
                      toast.error('Unable to download receipt. Please try again.')
                    }
                  }}
                  disabled={isDownloadingReceipt}
                  className='border border-primary cursor-pointer text-primary px-3 py-2 font-semibold w-fit rounded-md inline-flex items-center gap-2 disabled:opacity-60'
                >
                  <Download size={16} />
                  {isDownloadingReceipt ? 'Downloading...' : 'Download Receipt'}
                </button>
                <Link
                  className='bg-primary px-3 py-2 text-background font-semibold w-fit rounded-md'
                  href={`/book-ride/order-details/${booking._id}`}
                >
                  View Order Details
                </Link>
              </div>
            </div>

            <div className='text-sm text-foreground/70 text-right'>
              Moving to home in {redirectSeconds} second{redirectSeconds === 1 ? '' : 's'}...
            </div>
          </div>

          {booking.vehicle?.image ? (
            <div className='max-lg:rounded-t-xl lg:rounded-r-xl border border-border p-4 gap-5 flex flex-col items-center justify-center bg-white max-lg:order-1'>
              <Image
                src={booking.vehicle.image}
                width={350}
                height={350}
                alt={booking.vehicle.name || 'Vehicle'}
                className='w-full object-contain'
              />
              <div className='font-bold text-foreground'>{booking.vehicle.name}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <React.Suspense fallback={null}>
      <PaymentSuccessContent />
    </React.Suspense>
  )
}

