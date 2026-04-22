'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Info } from 'lucide-react'
import Setp2 from '@/components/booking/setp-2/setp-2'
import AnimatedRouteMap from '@/components/booking/shared/animated-route-map'
import SummaryDetails from '@/components/booking/shared/summary-details'
import { useBookingStore } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

function SelectVehiclePage() {
  const router = useRouter()
  const category = useBookingStore((s) => s.category)
  const isHourly = category === 'hourly'
  const showRouteMap = category === 'one-way'

  return (
    <div
      className={cn(
        'min-h-screen flex justify-center items-start md:py-52 md:px-4',
        !showRouteMap &&
        'max-md:pt-[calc(5rem+env(safe-area-inset-top,0px))] max-md:pb-2'
      )}
    >
      <div className="w-full md:max-w-7xl flex flex-col lg:flex-row gap-6">
        {showRouteMap && (
          <div className="lg:hidden w-full sticky top-16 z-0">
            <AnimatedRouteMap />
          </div>
        )}

        <div
          className={cn(
            'flex-1 min-w-0 bg-white py-4 px-1 relative z-10 md:mt-0 md:rounded-2xl overflow-hidden flex flex-col',
            showRouteMap ? 'rounded-t-3xl' : 'rounded-t-2xl sm:rounded-t-3xl',
            !showRouteMap && 'max-md:pt-6 max-md:mt-1'
          )}
        >
          {/* Mobile Tab/Pull Indicator */}
          <div className="flex justify-center w-full lg:hidden mb-4 -mt-1">
            <div className="w-12 h-1.5 bg-gray rounded-full" />
          </div>

          <div className="mb-4">
            <button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2 text-muted transition-colors hover:text-primary cursor-pointer"
            >
              <ArrowLeft size={16} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-semibold">Back to Home</span>
            </button>
          </div>

          <Setp2 />
        </div>

        <div className="hidden lg:flex lg:w-1/3 flex-shrink-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          {showRouteMap && <AnimatedRouteMap />}
          <SummaryDetails />
        </div>
      </div>
    </div>
  )
}

export default SelectVehiclePage
