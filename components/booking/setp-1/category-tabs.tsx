'use client'

import React from 'react'
import { BookingCategory } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

const TABS: { label: string; value: BookingCategory }[] = [
    { label: 'One way', value: 'one-way' },
    { label: 'By the Hour', value: 'hourly' },
]

interface CategoryTabsProps {
    activeTab: BookingCategory
    onTabChange: (tab: BookingCategory) => void
}

function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
    return (
        <div className='flex items-end'>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.value || (tab.value === 'one-way' && activeTab === 'return-trip');
                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onTabChange(tab.value)}
                        className={cn(
                            'flex-1 sm:flex-none px-4 sm:px-8 py-3 text-sm font-bold transition-all duration-200 cursor-pointer',
                            isActive
                                ? 'bg-white text-black'
                                : 'bg-black text-white'
                        )}
                    >
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryTabs
