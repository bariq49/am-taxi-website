'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2, LocateFixed, MapPinIcon, Clock3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useBookingStore, BookingCategory, BookingSettingsSnapshot } from '@/store/use-booking-store'
import CategoryTabs from './category-tabs'
import {
  getCurrentLocationErrorMessage,
  isAirportAddress,
  isGeolocationError,
  resolvePickupAddressFromCurrentLocation,
} from '@/lib/utils'
import { useBookingSettings } from '@/hooks/queries/use-fleet'
import { useCalculateRouteDistance } from '@/hooks/queries/use-calculate-distance'
import toast from 'react-hot-toast'
import { Input } from '@/components/form/Input'
import { Form } from '@/components/form/form'

interface HeroFormValues {
  pickupAddress: string
  deliveryAddress: string
  stops: { address: string }[]
  duration: string
}

function Step1() {
  const router = useRouter()
  const calculateRoute = useCalculateRouteDistance()
  const [isLocating, setIsLocating] = React.useState(false)

  const {
    category,
    setCategory,
    setStep1Data,
    setBookingSettings,
  } = useBookingStore()

  const isOneWay = category === 'one-way' || category === 'return-trip'
  const isHourly = category === 'hourly'

  const { data: settings } = useBookingSettings()


  const form = useForm<HeroFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      stops: [],
      duration: '',
    },
  })
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
        stops: isHourly ? [] : data.stops,
        duration: isHourly ? data.duration : undefined,
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
      stops: [],
      duration: '',
    })
  }

  return (
    <div
      className='flex flex-col gap-3 sm:gap-5 w-full max-w-screen-sm'
    >
      <CategoryTabs activeTab={category} onTabChange={handleTabChange} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-3 py-4 sm:p-5  rounded-t-xl md:rounded-2xl bg-background flex flex-col gap-4 sm:gap-5'
        >


          <div className='relative mb-2 space-y-4'>
            <div className='absolute left-[9px] md:left-[9px] top-[36px] bottom-[21px] w-1 md:w-1.5 bg-secondary' />

            <div className='flex items-center gap-3'>
              <div className='w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-primary bg-white z-10 flex-shrink-0' />
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
                  className='h-[46px] w-[46px] inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-white text-primary hover:bg-secondary transition-colors disabled:opacity-50 flex-shrink-0'
                  aria-label='Use current location for pickup'
                  title='Use current location'
                >
                  {isLocating ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <LocateFixed className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>
            {isOneWay && (
              <div className='flex items-center gap-3'>
                <MapPinIcon className='w-5 h-5 md:w-6 md:h-6 text-primary z-10 flex-shrink-0' />
                <Input
                  name='deliveryAddress'
                  type='location'
                  placeholder='Drop Off Address'
                  className='flex-1'
                  required
                />
              </div>
            )}

            {/* {isHourly && (
              <div className='flex items-start gap-3'>
                <Clock3 className='w-5 h-5 md:w-6 md:h-6 text-primary z-10 flex-shrink-0 mt-3' />
                <Input
                  name='duration'
                  type='select'
                  selectOptions={durationOptions}
                  selectPlaceholder={
                    isLoadingHourly ? 'Loading duration packages...' : 'Select duration'
                  }
                  required
                  className='flex-1'
                  disabled={isLoadingHourly || durationOptions.length === 0}
                />
              </div>
            )} */}
          </div>

          <Button
            type='submit'
            loading={calculateRoute.isPending}
            className='w-full font-semibold rounded-xl'
          >
            Quote Now
          </Button>

          <div className='text-sm md:text-base text-primary text-center font-bold'>
            Chauffeur waits up to 30 minutes free at the airport.
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Step1
