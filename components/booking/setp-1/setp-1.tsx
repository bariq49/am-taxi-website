'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2, LocateFixed, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useBookingStore, BookingCategory, BookingSettingsSnapshot } from '@/store/use-booking-store'
import CategoryTabs from './category-tabs'
import {
  getCurrentLocationErrorMessage,
  isAirportAddress,
  isGeolocationError,
  resolvePickupAddressFromCurrentLocation,
  swapPickupAndDelivery,
} from '@/lib/utils'
import { useBookingSettings, useHourlyPricings } from '@/hooks/queries/use-fleet'
import { useCalculateRouteDistance } from '@/hooks/queries/use-calculate-distance'
import { SwapButton } from './SwapButton'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/Input'
import { PickupDetails } from './pickup-details'
import toast from 'react-hot-toast'

interface HeroFormValues {
  pickupAddress: string
  deliveryAddress: string
  duration: string
  pickupDate: string
  pickupTime: string
}

function Step1() {
  const router = useRouter()
  const calculateRoute = useCalculateRouteDistance()
  const [isSwapping, setIsSwapping] = React.useState(false)
  const [isLocating, setIsLocating] = React.useState(false)

  const {
    category,
    setCategory,
    setStep1Data,
    setBookingSettings,
  } = useBookingStore()

  const isOneWay = category === 'one-way' || category === 'return-trip'
  const isHourly = category === 'hourly'

  const { data: settings, isLoading } = useBookingSettings()
  const { data: hourly, isLoading: isLoadingHourly } = useHourlyPricings(
    undefined,
    { enabled: isHourly }
  )


  const form = useForm<HeroFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      duration: '',
      pickupDate: format(new Date(), 'yyyy-MM-dd'),
      pickupTime: '10:00 AM',
    },
  })

  const isButtonDisabled =
    isLoading ||
    (isHourly && isLoadingHourly) ||
    calculateRoute.isPending

  const handleSwapLocations = () => {
    setIsSwapping(true)
    swapPickupAndDelivery({
      getValues: form.getValues,
      setValue: form.setValue,
    })
    window.setTimeout(() => setIsSwapping(false), 300)
  }

  const handleUseCurrentLocation = () => {
    if (isLocating) return

    setIsLocating(true)

    resolvePickupAddressFromCurrentLocation()
      .then((resolvedAddress) => {
        form.setValue('pickupAddress', resolvedAddress, {
          shouldDirty: true,
          shouldValidate: true,
        })
        toast.success('Pickup address updated to your current location.')
      })
      .catch((error: unknown) => {
        if (isGeolocationError(error)) {
          toast.error(getCurrentLocationErrorMessage(error))
          return
        }
        if (error instanceof Error && error.message) {
          toast.error(error.message)
          return
        }
        toast.error('Could not resolve your current location address.')
      })
      .finally(() => {
        setIsLocating(false)
      })
  }

  const onSubmit = async (data: HeroFormValues) => {
    if (calculateRoute.isPending) return

    const addresses: string[] = [data.pickupAddress]
    if (isOneWay && data.deliveryAddress) {
      addresses.push(data.deliveryAddress)
    }

    try {
      let distanceMiles: number | undefined
      let durationMinutes: number | undefined

      if (addresses.length >= 2) {
        const result = await calculateRoute.mutateAsync(addresses)
        distanceMiles = result.totalDistanceMiles
        durationMinutes = result.totalDurationMinutes
      }
      const isAirportSelected = addresses.some(isAirportAddress)

      setStep1Data({
        pickupAddress: data.pickupAddress,
        deliveryAddress: isOneWay ? data.deliveryAddress : '',
        stops: [],
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        duration: isHourly ? "" : undefined,
        distanceMiles,
        durationMinutes,
        isAirportSelected,
      })
      setBookingSettings(settings as BookingSettingsSnapshot ?? {})
      router.replace('/book-ride/select-vehicle')
    } catch (err) {
      console.error(err)
      toast.error('Could not continue. Please try again.')
    }
  }

  const handleTabChange = (tab: BookingCategory) => {
    setCategory(tab)
    form.reset({
      pickupAddress: '',
      deliveryAddress: '',
      duration: '',
    })
  }

  return (
    <div
      className='flex flex-col w-full max-w-screen-sm md:max-w-6xl mx-auto'
    >
      <div className='relative z-10 -mb-[1px]'>
        <CategoryTabs activeTab={category} onTabChange={handleTabChange} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-3 py-2 sm:py-4 md:py-4 md:px-8 rounded-b-lg rounded-tr-lg rounded-tl-none bg-white flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6 md:gap-0 mt-0 shadow-xl'
        >
          {/* Mobile Address Block - visible only on mobile */}
          <div className='relative mb-2 space-y-4 md:hidden flex-1'>
            <div className='absolute left-[9px] top-[36px] bottom-[21px] w-1 bg-secondary' />

            <div className='flex items-center gap-3'>
              <div className='w-5 h-5 rounded-full border-4 border-primary bg-white z-10 flex-shrink-0' />
              <div className='flex items-end gap-1 flex-1'>
                <Input
                  name='pickupAddress'
                  type='location'
                  placeholder='Pickup Address'
                  className='flex-1'
                  required
                />
                <button
                  type='button'
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating || calculateRoute.isPending}
                  className='h-[46px] w-[46px] inline-flex items-center justify-center rounded-lg border border-border bg-white text-primary hover:bg-secondary transition-colors disabled:opacity-50'
                >
                  {isLocating ? <Loader2 className='w-4 h-4 animate-spin' /> : <LocateFixed className='w-5 h-5' />}
                </button>
              </div>
            </div>

            {isOneWay && (
              <div className='relative flex items-center justify-end left-[2px]'>
                <SwapButton onSwap={handleSwapLocations} isSwapping={isSwapping} className='self-center' />
              </div>
            )}

            {isOneWay && (
              <div className='flex items-center gap-3'>
                <MapPinIcon className='w-5 h-5 text-primary z-10 flex-shrink-0' />
                <Input
                  name='deliveryAddress'
                  type='location'
                  placeholder='Drop Off Address'
                  className='flex-1'
                  required
                />
              </div>
            )}
          </div>

          {/* Desktop Location Block - visible only on desktop */}
          <div className='hidden md:flex flex-col gap-1 flex-1 pr-8'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase'>
                Location
              </span>
            </div>

            <div className='flex items-center gap-12'>
              <div className='flex-1'>
                <Input
                  name='pickupAddress'
                  type='location'
                  label='Pick-up'
                  placeholder='City, airport, or address'
                  icon={<MapPinIcon className="w-[18px] h-[18px] text-slate-900" />}
                  inputClassName='border-none p-0 h-auto bg-transparent focus:ring-0 shadow-none text-base font-medium placeholder:text-slate-300 placeholder:font-normal'
                  required
                />
              </div>

              {isOneWay && (
                <div className='flex-1'>
                  <Input
                    name='deliveryAddress'
                    type='location'
                    label='Drop-off'
                    placeholder='City, airport, or address'
                    icon={<MapPinIcon className="w-[18px] h-[18px] text-slate-900" />}
                    inputClassName='border-none p-0 h-auto bg-transparent focus:ring-0 shadow-none text-base font-medium placeholder:text-slate-300 placeholder:font-normal'
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className='hidden md:block w-[1px] h-20 bg-slate-100' />

          {/* Date, Time & Button Block */}
          <div className='flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-10 md:pl-10 sm:px-0'>
            <PickupDetails />
            <Button
              type='submit'
              loading={isButtonDisabled}
              className='h-14 md:h-[52px] px-12 md:px-14 bg-black hover:bg-slate-900 text-white font-bold text-xs md:text-[13px] rounded-xl w-full md:w-auto uppercase tracking-[0.2em] transition-all'
            >
              Find My Ride
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Step1
