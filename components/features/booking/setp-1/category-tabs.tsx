'use client'

import React from 'react'
import { BookingCategory } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

const TABS: { label: string; value: BookingCategory }[] = [
    { label: 'One Way', value: 'one-way' },
    { label: 'By the Hour', value: 'hourly' },
]

interface CategoryTabsProps {
    activeTab: BookingCategory
    onTabChange: (tab: BookingCategory) => void
}
function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
    return (
        <div className='grid grid-cols-2 w-full'>
            {TABS.map((tab, idx) => {
                const isActive = activeTab === tab.value || (tab.value === 'one-way' && activeTab === 'return-trip')
                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onTabChange(tab.value)}
                        className={cn(
                            'relative py-3 px-6 text-center font-bold transition-all duration-300 uppercase tracking-wide text-xs md:text-sm overflow-visible cursor-pointer',
                            isActive
                                ? 'bg-white text-black z-10 rounded-t-2xl'
                                : cn(
                                    'bg-black text-white/70 hover:text-white z-0',
                                    idx === 0 ? 'rounded-tl-2xl' : 'rounded-tr-2xl'
                                ),
                        )}
                    >
                        {tab.label}

                        {/* Inner bottom-right curve for left active tab */}
                        {isActive && idx === 0 && (
                            <span className="pointer-events-none absolute -right-5 bottom-0 h-5 w-5 overflow-hidden">
                                <span className="absolute inset-0 rounded-bl-2xl bg-black shadow-[-6px_4px_0_4px_white]" />
                            </span>
                        )}

                        {/* Inner bottom-left curve for right active tab */}
                        {isActive && idx === 1 && (
                            <span className="pointer-events-none absolute -left-5 bottom-0 h-5 w-5 overflow-hidden">
                                <span className="absolute inset-0 rounded-br-2xl bg-black shadow-[6px_4px_0_4px_white]" />
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryTabs

