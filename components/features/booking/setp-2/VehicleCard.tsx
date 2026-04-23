"use client";

import Image from "next/image";
import { Check, Users, Luggage, Wifi, ChevronRight } from "lucide-react";
import { FleetByDistance } from "@/lib/api/fleets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Counter } from "@/components/ui/counter";

interface VehicleCardProps {
  fleet: FleetByDistance;
  isSelected?: boolean;
  isLoading: boolean;
  onSelect: (fleet: FleetByDistance) => void;
  onContinue: (fleet: FleetByDistance, passengers: number, luggage: number) => void;
}

const formatAmount = (value: number) => value.toFixed(2);

export default function VehicleCard({
  fleet,
  isSelected = false,
  isLoading,
  onSelect,
  onContinue,
}: VehicleCardProps) {
  const [passengerCount, setPassengerCount] = useState(1);
  const [luggageCount, setLuggageCount] = useState(0);

  const totalPrice = fleet.priceBreakdown?.totalPrice ?? 0;
  const displayPrice = fleet.priceBreakdown?.displayPrice ?? 0;
  const displayDiscountRate = fleet.priceBreakdown?.displayDiscountRate ?? 0;
  const hasDiscount = displayDiscountRate > 0 && displayPrice > totalPrice;

  return (
    <div
      onClick={() => onSelect(fleet)}
      className={cn(
        "group relative overflow-visible rounded-sm border transition-all duration-300 cursor-pointer bg-gray-50",
        isSelected
          ? "border-border shadow-sm"
          : "border-border"
      )}
    >
      <div className="absolute -top-3 left-1 z-20">
        <div className="bg-primary text-[8px] sm:text-[9px] font-black text-white px-2 sm:px-3 py-1 rounded-full uppercase shadow-sm">
          Best Value
        </div>
      </div>

      <div className="flex items-center md:p-4 p-2 py-1">
        {/* Vehicle Image */}
        <div className="relative flex-shrink-0 w-32 sm:w-40 lg:w-48 aspect-[4/3] sm:aspect-auto flex items-center justify-center bg-gray/10 rounded-md overflow-hidden px-1 sm:px-2">
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
          <div className="flex justify-between items-stretch gap-2">
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base md:text-lg font-semibold leading-tight">
                  {fleet.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {fleet.carType || "Cadillac CT6, Lynq or similar"}
                </p>
              </div>

              {/* Icon Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-2 pt-2">
                <div className="flex items-center bg-primary text-white px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full gap-x-1 shrink-0">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-sm font-bold">{fleet.passengers}</span>
                </div>
                <div className="flex items-center bg-primary text-white px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full gap-x-1 shrink-0">
                  <Luggage className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-sm font-bold">{fleet.suitcases}</span>
                </div>
                <div className="flex items-center bg-primary text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shrink-0">
                  <Wifi className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>

            {/* Selection & Price */}
            <div className="flex flex-col items-end justify-between flex-shrink-0">
              <div className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors shadow-sm",
                isSelected ? "bg-primary" : "border-2 border-border"
              )}>
                {isSelected && <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" strokeWidth={4} />}
              </div>

              <div className="text-right">
                {hasDiscount && (
                  <span className="block text-[10px] sm:text-sm font-semibold text-gray-400 line-through">
                    ${formatAmount(displayPrice)}
                  </span>
                )}
                <span className="text-lg sm:text-2xl font-bold text-primary tracking-tight leading-none">
                  ${formatAmount(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
      {isSelected && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {/* Inset Dashed Separator */}
          <div className="border-t border-dashed border-border mx-4" />
          <div className="px-4 py-2 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-x-3 sm:gap-x-8 gap-y-3 w-full sm:w-auto">
              <Counter
                label="Passenger(s)"
                icon={<Users size={14} className="sm:size-4" />}
                value={passengerCount}
                min={1}
                max={fleet.passengers}
                onChange={setPassengerCount}
                className="scale-90 sm:scale-100 origin-left"
              />
              <Counter
                label="Luggage(s)"
                icon={<Luggage size={14} className="sm:size-4" />}
                value={luggageCount}
                min={0}
                max={fleet.suitcases}
                onChange={setLuggageCount}
                className="scale-90 sm:scale-100 origin-left"
              />
            </div>

            <Button
              loading={isLoading}
              className="rounded-sm w-full md:w-fit h-8.5 text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onContinue(fleet, passengerCount, luggageCount);
              }}
            >
              CONTINUE
              <ChevronRight size={14} strokeWidth={4} className="sm:size-[18px] group-hover/btn:translate-x-1 transition-transform" />
            </Button>

          </div>
        </div>
      )}

    </div>
  );
}