'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { format, parse } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { Controller } from 'react-hook-form'
import DatePicker from '@/components/form/date/date-picker'
import TimePicker from '@/components/form/time/time-picker'
import { cn } from '@/lib/utils'

export function PickupDetails() {
  const { control } = useFormContext()
  const pickupDate = useWatch({ control, name: 'pickupDate' })
  const pickupTime = useWatch({ control, name: 'pickupTime' })

  const day = pickupDate ? format(new Date(pickupDate), "d") : "--";
  const monthYear = pickupDate ? format(new Date(pickupDate), "MMM ''yy") : "-------";
  const weekday = pickupDate ? format(new Date(pickupDate), "EEEE") : "-------";
  const time = pickupTime ? pickupTime.toLowerCase() : "--:-- --";

  const isPlaceholder = !pickupDate;

  return (
    <div className='flex flex-col gap-1 w-full'>
      <span className='text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase px-0 mb-4'>
        Pickup Date & Time
      </span>

      <div className='flex items-center gap-8 w-full px-0'>
        {/* Date Trigger */}
        <Controller
          name='pickupDate'
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              customTrigger={() => (
                <div className='flex flex-col cursor-pointer group text-left min-w-[70px] select-none'>
                  <span className={cn(
                    'text-[34px] font-bold leading-none mb-1.5 transition-colors',
                    isPlaceholder ? 'text-slate-200' : 'text-slate-900 group-hover:text-primary'
                  )}>
                    {day}
                  </span>
                  <span className={cn(
                    'text-[10px] font-bold uppercase tracking-widest transition-colors',
                    isPlaceholder ? 'text-slate-200' : 'text-slate-500'
                  )}>
                    {monthYear}
                  </span>
                </div>
              )}
            />
          )}
        />

        <div className='h-12 w-[1px] bg-slate-100 flex-shrink-0' />

        {/* Time Trigger */}
        <Controller
          name='pickupTime'
          control={control}
          render={({ field }) => (
            <TimePicker
              value={field.value}
              onChange={field.onChange}
              customTrigger={() => (
                <div className='flex flex-col cursor-pointer group justify-center text-left select-none'>
                  <div className='flex items-center gap-1.5 leading-none mb-2'>
                    <span className={cn(
                      'text-[15px] font-bold transition-colors',
                      isPlaceholder ? 'text-slate-200' : 'text-slate-900 group-hover:text-primary'
                    )}>
                      {weekday}
                    </span>
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 transition-colors",
                      isPlaceholder ? 'text-slate-200' : 'text-slate-400'
                    )} />
                  </div>
                  <span className={cn(
                    'text-sm font-medium leading-none whitespace-nowrap transition-colors',
                    isPlaceholder ? 'text-slate-200' : 'text-slate-500'
                  )}>
                    {time}
                  </span>
                </div>
              )}
            />
          )}
        />
      </div>
    </div>
  )
}
