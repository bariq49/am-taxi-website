import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import { Plane } from "lucide-react";
import { formatPrice } from "@/lib/booking-utils";

interface AirportPickupFieldProps {
  form: UseFormReturn<any>;
  airportPickupBasePrice: number;
}

export const AirportPickupField = ({
  form,
  airportPickupBasePrice,
}: AirportPickupFieldProps) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Flight Number
          {airportPickupBasePrice > 0 && (
            <span className="text-sm font-medium text-secondary">
              ({formatPrice(airportPickupBasePrice)})
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed -mb-2">
          Your driver will track your flight and will adjust the pickup time accordingly
        </p>
      </div>
      <Input
        icon={<Plane size={16} className="text-gray-400" />}
        name="flightNumber"
        type="text"
        placeholder="e.g. LH1868"
        required
        className="bg-gray-50/50 border-gray-100"
      />
    </div>
  );
};
