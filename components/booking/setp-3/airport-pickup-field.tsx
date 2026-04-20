import React from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { formatBookingAmount } from "@/lib/booking-pricing";

interface AirportPickupFieldProps {
  form: UseFormReturn<any>;
  airportPickupBasePrice: number;
  disabled?: boolean;
}

export const AirportPickupField = ({
  form,
  airportPickupBasePrice,
  disabled,
}: AirportPickupFieldProps) => {
  const isAirportPickup = useWatch({ control: form.control, name: "isAirportPickup" });

  const handleToggle = (checked: boolean) => {
    if (disabled) return;
    form.setValue("isAirportPickup", checked, { shouldDirty: true });
  };

  React.useEffect(() => {
    if (disabled && !isAirportPickup) {
      form.setValue("isAirportPickup", true, { shouldDirty: false });
    }
  }, [disabled, isAirportPickup, form]);

  return (
    <div className="space-y-0">
      <div
        className={cn(
          "flex items-center justify-between gap-3 border border-border bg-background p-3",
          isAirportPickup ? "rounded-t-lg rounded-b-none border-b-0" : "rounded-lg"
        )}
      >
        <span className="text-sm font-medium">
          Airport Pickup {`(${formatBookingAmount(airportPickupBasePrice)})`}
        </span>
        <Switch
          checked={Boolean(isAirportPickup)}
          onCheckedChange={handleToggle}
          disabled={disabled}
        />
      </div>

      {isAirportPickup ? (
        <div className="rounded-b-lg rounded-t-none border border-border border-t-0 bg-background p-3 md:p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="airlineName"
              type="text"
              label="Airline Name"
              placeholder="e.g. Emirates"
              required
            />
            <Input
              name="flightNumber"
              type="text"
              label="Flight Number"
              placeholder="e.g. EK123"
              required
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
