"use client";

import Image from "next/image";
import { Check, Users, Luggage, Wifi, Minus, Plus, ChevronRight } from "lucide-react";
import { FleetByDistance } from "@/lib/api/fleets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface VehicleCardProps {
  fleet: FleetByDistance;
  isSelected?: boolean;
  isLoading: boolean;
  onSelect: (fleet: FleetByDistance) => void;
  onContinue: (fleet: FleetByDistance) => void;
}

const formatAmount = (value: number) => value.toFixed(2);

export default function VehicleCard({
  fleet,
  isSelected = false,
  isLoading,
  onSelect,
  onContinue,
}: VehicleCardProps) {
  const [passengerCount, setPassengerCount] = useState(fleet.passengers || 2);
  const [luggageCount, setLuggageCount] = useState(fleet.suitcases || 2);

  const totalPrice = fleet.priceBreakdown?.totalPrice ?? 0;
  const displayPrice = fleet.priceBreakdown?.displayPrice ?? 0;
  const displayDiscountRate = fleet.priceBreakdown?.displayDiscountRate ?? 0;
  const hasDiscount = displayDiscountRate > 0 && displayPrice > totalPrice;

  const handleIncrementPassengers = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (passengerCount < (fleet.passengers || 4)) setPassengerCount(prev => prev + 1);
  };
  const handleDecrementPassengers = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (passengerCount > 1) setPassengerCount(prev => prev - 1);
  };

  const handleIncrementLuggage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (luggageCount < (fleet.suitcases || 4)) setLuggageCount(prev => prev + 1);
  };
  const handleDecrementLuggage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (luggageCount > 0) setLuggageCount(prev => prev - 1);
  };

  return (
    <div
      onClick={() => onSelect(fleet)}
      className={cn(
        "group relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer bg-gray/10",
        isSelected
          ? "border-gray"
          : "border-gray/40 hover:border-gray"
      )}
    >
      {/* Best Value Badge */}
      <div className="absolute top-0 left-0 z-10">
        <div className="bg-black text-[8px] sm:text-[9px] font-black text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-br-lg uppercase shadow-sm">
          Best Value
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
        {/* Vehicle Image */}
        <div className="relative flex-shrink-0 w-24 sm:w-40 lg:w-48 aspect-[4/3] sm:aspect-auto flex items-center justify-center bg-gray/10 rounded-md overflow-hidden px-1 sm:px-2">
          <Image
            src={fleet.image}
            alt={fleet.name}
            className="object-contain w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
            width={180}
            height={120}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-xl font-bold text-secondary mb-0 truncate sm:whitespace-normal">
                {fleet.name}
              </h3>
              <p className="text-[10px] sm:text-sm text-muted font-medium mb-2 sm:mb-4 truncate sm:whitespace-normal leading-tight">
                {fleet.carType || "Cadillac CT6, Lynq or similar"}
              </p>

              {/* Icon Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <div className="flex items-center gap-1 bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                  <Users size={10} className="sm:size-[14px] opacity-90" />
                  <span className="text-[9px] sm:text-xs font-bold">{fleet.passengers}</span>
                </div>
                <div className="flex items-center gap-1 bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                  <Luggage size={10} className="sm:size-[14px] opacity-90" />
                  <span className="text-[9px] sm:text-xs font-bold">{fleet.suitcases}</span>
                </div>
                <div className="flex items-center justify-center bg-[#1a1c21] text-white w-7 sm:w-9 h-6 sm:h-8 rounded-full">
                  <Wifi size={10} className="sm:size-[14px] opacity-90" />
                </div>
              </div>
            </div>

            {/* Selection & Price - desktop style even on mobile */}
            <div className="flex flex-col items-end flex-shrink-0">
              {/* Selection Circle */}
              <div className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors mb-2 sm:mb-4",
                isSelected ? "bg-black" : "border-2 border-gray"
              )}>
                {isSelected && <Check size={12} className="text-white sm:size-[14px]" strokeWidth={3} />}
              </div>

              <div className="text-right">
                {hasDiscount && (
                  <span className="block text-[10px] sm:text-sm text-muted line-through mb-[-2px]">
                    ${formatAmount(displayPrice)}
                  </span>
                )}
                <span className="text-lg sm:text-2xl font-bold text-secondary tracking-tight">
                  ${formatAmount(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Footer (only when selected) */}
      {isSelected && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Inset Dashed Separator */}
          <div className="border-t border-dashed border-gray-300 mx-4" />

          <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-x-4 sm:gap-x-8 gap-y-3 w-full sm:w-auto">
              {/* Passenger Adjuster */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-secondary">
                  <Users size={14} className="text-secondary sm:size-[18px]" />
                  <span className="text-[11px] sm:text-sm font-bold">Passenger(s)</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 ml-1">
                  <button
                    onClick={handleDecrementPassengers}
                    className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray text-muted hover:bg-gray/10 active:scale-90 transition-all"
                  >
                    <Minus size={10} strokeWidth={2.5} className="sm:size-[14px]" />
                  </button>
                  <span className="text-[11px] sm:text-sm font-bold w-4 text-center">{passengerCount}</span>
                  <button
                    onClick={handleIncrementPassengers}
                    className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 active:scale-90 transition-all"
                  >
                    <Plus size={10} strokeWidth={2.5} className="sm:size-[14px]" />
                  </button>
                </div>
              </div>

              {/* Luggage Adjuster */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-secondary">
                  <Luggage size={14} className="text-secondary sm:size-[18px]" />
                  <span className="text-[11px] sm:text-sm font-bold">Luggage(s)</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 ml-1">
                  <button
                    onClick={handleDecrementLuggage}
                    className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray text-muted hover:bg-gray/10 active:scale-90 transition-all"
                  >
                    <Minus size={10} strokeWidth={2.5} className="sm:size-[14px]" />
                  </button>
                  <span className="text-[11px] sm:text-sm font-bold w-4 text-center">{luggageCount}</span>
                  <button
                    onClick={handleIncrementLuggage}
                    className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray text-muted hover:bg-gray/10 active:scale-90 transition-all"
                  >
                    <Plus size={10} strokeWidth={2.5} className="sm:size-[14px]" />
                  </button>
                </div>
              </div>
            </div>

            <Button
              className="bg-black hover:bg-neutral-900 text-white rounded-lg px-8 sm:px-10 h-9 sm:h-10 text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-3 ml-auto w-full sm:w-auto transition-all shadow-md group/btn"
              loading={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onContinue(fleet);
              }}
            >
              CONTINUE
              <ChevronRight size={18} strokeWidth={4} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}