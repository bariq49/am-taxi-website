"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { FleetByDistance } from "@/lib/api/fleets";
import VehicleAmenities from "./VehicleAmenities";
import { Button } from "@/components/ui/button";
import { FleetFeaturesAccordion } from "./fleet-features-accordion";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  fleet: FleetByDistance;
  isSelected?: boolean;
  isLoading: boolean;
  onSelect: (fleet: FleetByDistance) => void;
}

const formatAmount = (value: number) => value.toFixed(2);

export default function VehicleCard({
  fleet,
  isSelected = false,
  isLoading,
  onSelect,
}: VehicleCardProps) {
  const showRequestQuote = Boolean(fleet.allowRequestQuote) || !fleet.isActive;
  const totalPrice = fleet.priceBreakdown?.totalPrice ?? 0;
  const displayPrice = fleet.priceBreakdown?.displayPrice ?? 0;
  const displayDiscountRate = fleet.priceBreakdown?.displayDiscountRate ?? 0;
  const hasDiscount = displayDiscountRate > 0 && displayPrice > totalPrice;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background shadow-lg transition-shadow duration-200 hover:shadow-md",
        isSelected
          ? "border-primary ring-2 ring-primary/25 shadow-md"
          : "border-border"
      )}
    >
      {hasDiscount && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 md:px-2.5 md:py-1 rounded-bl-xl rounded-tr-xl z-10">
          {displayDiscountRate}% Off
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-row items-center gap-3 sm:gap-4 pb-2 p-6 sm:p-6">

        {/* Vehicle Image */}
        <div className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-48 flex justify-center items-center">
          <Image
            src={fleet.image}
            alt={fleet.name}
            className="object-contain w-full h-auto"
            width={120}
            height={150}
          />
        </div>

        {/* Vehicle Info */}
        <div className="flex flex-col items-start justify-center gap-1.5 flex-1 min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight">
            {fleet.name}
          </h2>

          {/* Capacity Information */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-gray-700">
            <span className="text-gray-500 hidden md:block">Up to</span>
            <div className="flex items-center gap-1 min-w-fit">
              <GoPeople size={14} className="text-gray-500 sm:w-4 sm:h-4" />
              <span className="text-[13px] sm:text-sm md:text-base">{fleet.passengers}</span>
            </div>
            <div className="flex items-center gap-1 min-w-fit">
              <PiSuitcase size={14} className="text-gray-500 sm:w-4 sm:h-4" />
              <span className="text-[13px] sm:text-sm md:text-base">{fleet.suitcases}</span>
            </div>
            {fleet.timePeriod ? (
              <div className="flex items-center gap-1 min-w-fit border-l border-gray-200 pl-2.5 ml-0.5">
                <Clock3 size={12} className="text-gray-500 sm:w-3.5 sm:h-3.5" />
                <span className="text-[13px] sm:text-sm md:text-base">{fleet.timePeriod}</span>
              </div>
            ) : null}
          </div>
          <p className="text-xs sm:text-sm md:text-sm text-gray-600">{fleet.carType}</p>

          {/* Hourly Package Details */}
          {/* {item.hourlyPackage && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  <Clock size={12} className="sm:w-3 sm:h-3" />
                  <span>{formatPackageDuration(item.hourlyPackage.duration, item.hourlyPackage.packageType)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <Navigation size={12} className="sm:w-3 sm:h-3" />
                  <span>{item.hourlyPackage.includedMiles} miles included</span>
                </div>
              </div>
            )} */}
        </div>

        {!showRequestQuote && (
          <div className="flex flex-col items-end justify-center gap-0 flex-shrink-0 pt-0.5">
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-red-500 line-through">
                ${formatAmount(displayPrice)}
              </span>
            )}
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
              ${formatAmount(totalPrice)}
            </span>
            <p className="text-xs text-gray-500">Total price</p>
          </div>
        )}

      </div>
      <FleetFeaturesAccordion fleetName={fleet.name} />
      {/* CTA Button */}
      {!showRequestQuote ? (
        <Button
          onClick={() => onSelect(fleet)}
          loading={isLoading}
          className="w-full rounded-t-none rounded-b-xl h-10 md:h-11 text-sm"
        >
          <span className="text-sm sm:text-sm md:text-base">Select Vehicle</span>
          {!isLoading && <ArrowRight size={15} className="ml-2" />}
        </Button>
      ) : (
        <Button asChild className="w-full rounded-t-none rounded-b-xl">
          <Link href="/contact">
            <span>Request Quote</span>
            <ArrowRight size={15} className="ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
}