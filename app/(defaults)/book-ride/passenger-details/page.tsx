'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AnimatedRouteMap from '@/components/features/booking/shared/animated-route-map'
import SummaryDetails from '@/components/features/booking/shared/summary-details'
import Step3 from '@/components/features/booking/setp-3/setp-3'
import { useBookingStore } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

function PassengerDetailsPage() {
    const router = useRouter()
    const category = useBookingStore((s) => s.category)
    const showRouteMap = category === 'one-way'

    return (
        <div className="min-h-screen flex justify-center items-start  pt-24 md:pt-52 md:px-4">
            <div className="w-full md:max-w-7xl flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0 bg-white py-4 px-1 rounded-t-3xl relative z-10 md:mt-0 md:rounded-2xl overflow-visible flex flex-col">
                    <div className="mb-4">
                        <button
                            onClick={() => router.push('/book-ride/select-vehicle')}
                            className="group flex items-center gap-2 text-muted transition-colors hover:text-primary cursor-pointer"
                        >
                            <ArrowLeft size={16} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-semibold">Back to Select Vehicle</span>
                        </button>
                    </div>
                    <Step3 />
                </div>

                <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start px-4 md:px-0">
                    <div className="hidden lg:block">
                        {/* {showRouteMap && <AnimatedRouteMap />} */}
                        <SummaryDetails />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PassengerDetailsPage

