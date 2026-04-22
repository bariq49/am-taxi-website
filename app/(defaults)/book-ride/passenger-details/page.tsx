'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AnimatedRouteMap from '@/components/booking/shared/animated-route-map'
import SummaryDetails from '@/components/booking/shared/summary-details'
import Step3 from '@/components/booking/setp-3/setp-3'
import { useBookingStore } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

function PassengerDetailsPage() {
    const router = useRouter()
    const category = useBookingStore((s) => s.category)
    const showRouteMap = category === 'one-way'

    return (
        <div className="min-h-screen flex justify-center items-start  pt-24 md:pt-52 md:px-4">
            <div className="w-full md:max-w-7xl flex flex-col lg:flex-row gap-6">
                <div className="hidden lg:flex lg:w-1/3 flex-shrink-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
                    {showRouteMap && <AnimatedRouteMap />}
                    <SummaryDetails />
                </div>

                {showRouteMap && (
                    <div className="lg:hidden w-full sticky top-16 z-0">
                        <AnimatedRouteMap />
                    </div>
                )}

                <div className="flex-1 min-w-0 bg-white  py-4 px-1 rounded-t-3xl relative z-10 md:mt-0 md:rounded-2xl overflow-hidden flex flex-col">
                    <button
                        onClick={() => router.push('/book-ride/select-vehicle')}
                        className=' flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors self-start cursor-pointer mb-2'
                    >
                        <ArrowLeft className='w-5 h-5' />
                        <span>Back</span>
                    </button>
                    <Step3 />
                </div>
            </div>
        </div>
    )
}

export default PassengerDetailsPage

