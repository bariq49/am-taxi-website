'use client'

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2, LocateFixed, MapPinIcon, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useBookingStore, BookingCategory, BookingSettingsSnapshot } from '@/store/use-booking-store'
import CategoryTabs from './category-tabs'
import {
  AddStopButton
} from './AddStopButton'
import {
  StopItem
} from './StopItem'
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
import { Form } from '@/components/features/form/form'
import { Input } from '@/components/features/form/Input'
import toast from 'react-hot-toast'

interface HeroFormValues {
  pickupAddress: string
  deliveryAddress: string
  stops: { address: string }[]
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

  const { data: settings, isLoading } = useBookingSettings()

  const isOneWay = category === 'one-way' || category === 'return-trip'
  const isHourly = category === 'hourly'

  const { data: packageOptions, isLoading: isLoadingHourly } = useHourlyPricings(undefined, { enabled: isHourly })


  const form = useForm<HeroFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      stops: [],
      duration: '',
      pickupDate: '',
      pickupTime: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stops',
  })

  const stopFeePerStop = settings?.stopFee?.isActive ? settings.stopFee.price : 0



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
    try {
      const addresses: string[] = [data.pickupAddress]
      data.stops.forEach((stop) => {
        if (stop.address.trim()) {
          addresses.push(stop.address)
        }
      })
      if ((category === 'one-way' || category === 'return-trip') && data.deliveryAddress) {
        addresses.push(data.deliveryAddress)
      }

      let routeResult = null
      if (addresses.length > 1) {
        routeResult = await calculateRoute.mutateAsync(addresses)
      }
      setStep1Data({
        pickupAddress: data.pickupAddress,
        deliveryAddress: data.deliveryAddress,
        stops: data.stops,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        duration: category === 'hourly' && data.duration ? JSON.parse(data.duration) : undefined,
        distanceMiles: routeResult?.totalDistanceMiles,
        durationMinutes: routeResult?.totalDurationMinutes,
        isAirportSelected: addresses.some(isAirportAddress),
      })

      if (!settings) {
        toast.error('Booking settings are not loaded yet. Please try again in a moment.')
        return
      }
      setBookingSettings(settings as BookingSettingsSnapshot)
      router.replace('/book-ride/select-vehicle')
    } catch (err) {
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
      className='flex flex-col w-full max-w-screen-sm mx-auto'
    >
      <div className='relative mt-10'>
        <CategoryTabs activeTab={category} onTabChange={handleTabChange} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-4 py-8 md:rounded-b-2xl rounded-none bg-white flex flex-col items-stretch gap-6 mt-0 relative z-10'
        >
          <div className='relative mb-2 md:mb-0 space-y-4 flex-1'>
            <div className='absolute left-[8px] top-[36px] bottom-[20px] w-1 bg-border' />

            <div className='flex items-center gap-1'>
              <div className='w-5 h-5 rounded-full border-4 border-black bg-white z-10 flex-shrink-0' />
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
                  className='h-[46px] w-[46px] inline-flex items-center justify-center rounded-sm border border-border cursor-pointer bg-white text-secondary hover:bg-gray-50 transition-colors disabled:opacity-50'
                >
                  {isLocating ? <Loader2 className='w-4 h-4 animate-spin' /> : <LocateFixed className='w-5 h-5' />}
                </button>
              </div>
            </div>
            {fields.map((field, index) => (
              <StopItem
                key={field.id}
                index={index}
                onRemove={remove}
                stopFeePerStop={stopFeePerStop}
              />
            ))}

            <div className='relative flex items-center justify-between left-[1px]'>
              <AddStopButton
                onAdd={() => append({ address: '' })}
                label='Add Stop'
              />
              {!isHourly && isOneWay && (
                <SwapButton onSwap={handleSwapLocations} isSwapping={isSwapping} className='self-center' />
              )}
            </div>

            {(category === 'one-way' || category === 'return-trip') && (
              <div className='flex items-center gap-1'>
                <MapPinIcon className='w-5 h-5 text-black z-10 flex-shrink-0' />
                <Input
                  name='deliveryAddress'
                  type='location'
                  placeholder='Drop Off Address'
                  className='flex-1'
                  required
                />
              </div>
            )}

            {category === 'hourly' && (
              <div className='flex items-center gap-1'>
                <Clock className='w-5 h-5 text-black z-10 flex-shrink-0' />
                <Input
                  name='duration'
                  type='select'
                  placeholder='Select Duration'
                  className='flex-1'
                  selectOptions={packageOptions}
                  required
                />
              </div>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input
                name='pickupDate'
                type='date'
                placeholder='Pickup Date'
                required
              />
            </div>
            <div className='flex-1'>
              <Input
                name='pickupTime'
                type='time'
                placeholder='Pickup Time'
                required
              />
            </div>
          </div>
          <Button
            type='submit'
            className='bg-black'
            loading={isLoading || (category === 'hourly' && isLoadingHourly) || calculateRoute.isPending}
          >
            Find My Ride
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Step1