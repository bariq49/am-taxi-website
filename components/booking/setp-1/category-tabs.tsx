'use client'

import React from 'react'
import { BookingCategory } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

const TABS: { label: string; value: BookingCategory }[] = [
    { label: 'One Way', value: 'one-way' },
    { label: 'Hourly', value: 'hourly' },
]

interface CategoryTabsProps {
    activeTab: BookingCategory
    onTabChange: (tab: BookingCategory) => void
}

function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
    return (
        <div className='grid grid-cols-2 gap-3 max-lg:px-3'>
            {TABS.map((tab) => (
                <button
                    key={tab.value}
                    type="button"
                    onClick={() => onTabChange(tab.value)}
                    className={cn(
                        'p-2 w-full text-center font-semibold rounded-lg cursor-pointer transition-colors border',
                        activeTab === tab.value || (tab.value === 'one-way' && activeTab === 'return-trip')
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-background  border-border'
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default CategoryTabs
