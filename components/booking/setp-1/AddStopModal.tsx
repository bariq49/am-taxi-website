'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LocationInput } from '@/components/form/location-input'
import { MapPinIcon } from 'lucide-react'

interface AddStopModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (address: string) => void
}

export function AddStopModal({ isOpen, onClose, onAdd }: AddStopModalProps) {
  const [address, setAddress] = React.useState('')

  const handleAdd = () => {
    if (address.trim()) {
      onAdd(address)
      setAddress('')
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target?.closest('.pac-container')) {
            e.preventDefault()
          }
        }}
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target?.closest('.pac-container')) {
            e.preventDefault()
          }
        }}
        className='sm:max-w-[500px] p-0 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl'
      >
        <DialogHeader className='p-8 pb-4 text-center'>
          <DialogTitle className='text-2xl font-bold text-slate-900'>Add a Stop</DialogTitle>
          <p className='text-base text-slate-500 mt-2'>
            Enter the address for your midway point.
          </p>
        </DialogHeader>

        <div className='px-8 py-6'>
           <div className='flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-primary/20 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300'>
              <div className='flex-shrink-0 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100'>
                <MapPinIcon className="w-6 h-6 text-slate-900" />
              </div>
              <div className='flex-1 flex flex-col'>
                <span className='text-[11px] uppercase font-bold text-slate-400 tracking-[0.15em] mb-1'>
                  Stop Location
                </span>
                <LocationInput
                  value={address}
                  onChange={setAddress}
                  placeholder='City, airport, or address'
                  className='w-full bg-transparent border-none p-0 focus:outline-none text-lg font-semibold text-slate-900 placeholder:text-slate-300'
                />
              </div>
           </div>
        </div>

        <DialogFooter className='p-8 pt-2 flex flex-col sm:flex-row gap-4'>
          <Button
            variant='ghost'
            onClick={onClose}
            className='flex-1 sm:flex-none font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 h-12 rounded-xl'
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!address.trim()}
            className='flex-1 font-bold bg-black text-white h-12 hover:bg-slate-900 rounded-xl disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-black/10'
          >
            Add to Journey
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
