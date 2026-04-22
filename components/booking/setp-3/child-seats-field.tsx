import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Switch } from "@/components/form/switch";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/use-booking-store";
import {
  ChildSeatsSelector,
  type ChildSeatSelection,
} from "./child-seats-selector";

interface ChildSeatsFieldProps {
  mode?: "outbound" | "return";
}

export const ChildSeatsField = ({
  mode = "outbound",
}: ChildSeatsFieldProps) => {
  const form = useFormContext();
  const bookingSettings = useBookingStore((state) => state.bookingSettings);
  const isReturnMode = mode === "return";
  const toggleName = isReturnMode ? "returnChildSeatsEnabled" : "childSeatsEnabled";
  const seatsName = isReturnMode ? "returnChildSeats" : "childSeats";
  const toggleLabel = isReturnMode ? "Return Child Seats" : "Add Child Safety Seats";
  const childSeatOptions =
    bookingSettings?.childSeats
      ?.filter((seat) => seat.isActive)
      .map((seat) => ({
        _id: seat._id,
        name: seat.name,
        price: seat.price,
      })) ?? [];

  const seatsEnabled = useWatch({ control: form.control, name: toggleName });
  const selectedSeats = (useWatch({ control: form.control, name: seatsName }) || []) as ChildSeatSelection[];

  const handleSeatQuantityChange = (seatId: string, delta: number) => {
    const currentSeats = (form.getValues(seatsName) as ChildSeatSelection[]) || [];
    const existingSeat = currentSeats.find((seat) => seat.seatId === seatId);
    const nextQuantity = Math.max(0, (existingSeat?.quantity ?? 0) + delta);
    const seatsWithoutCurrent = currentSeats.filter((seat) => seat.seatId !== seatId);

    form.setValue(
      seatsName,
      nextQuantity > 0
        ? [...seatsWithoutCurrent, { seatId, quantity: nextQuantity }]
        : seatsWithoutCurrent,
      { shouldDirty: true }
    );
  };

  React.useEffect(() => {
    if (!seatsEnabled && selectedSeats.length > 0) {
      form.setValue(seatsName, [], { shouldDirty: true });
    }
  }, [seatsEnabled, selectedSeats.length, seatsName, form]);

  const handleSeatsToggle = (checked: boolean) => {
    if (childSeatOptions.length === 0) return;

    form.setValue(toggleName, checked, { shouldDirty: true });
    if (!checked) {
      form.setValue(seatsName, [], { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-0">
      <div
        className={cn(
          "flex h-[46px] items-center justify-between gap-3 border border-border bg-background px-3",
          seatsEnabled ? "rounded-t-sm rounded-b-none border-b-0" : "rounded-sm"
        )}
      >
        <span className="text-sm font-medium">
          {toggleLabel}
        </span>
        <Switch
          checked={Boolean(seatsEnabled)}
          onCheckedChange={handleSeatsToggle}
          disabled={childSeatOptions.length === 0}
        />
      </div>

      {seatsEnabled ? (
        <ChildSeatsSelector
          options={childSeatOptions}
          selections={selectedSeats}
          onQuantityChange={handleSeatQuantityChange}
          className="rounded-t-none rounded-b-sm border-t-0 bg-background"
        />
      ) : null}
    </div>
  );
};
