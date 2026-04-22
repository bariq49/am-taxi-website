import React from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/form/switch";
import { cn } from "@/lib/utils";
import {
  ChildSeatsSelector,
  type ChildSeatOption,
  type ChildSeatSelection,
} from "./child-seats-selector";

interface ChildSeatsFieldProps {
  form: UseFormReturn<any>;
  toggleName: "childSeatsEnabled" | "returnChildSeatsEnabled";
  seatsName: "childSeats" | "returnChildSeats";
  toggleLabel: string;
  childSeatOptions: ChildSeatOption[];
}

export const ChildSeatsField = ({
  form,
  toggleName,
  seatsName,
  toggleLabel,
  childSeatOptions,
}: ChildSeatsFieldProps) => {
  const seatsEnabled = useWatch({ control: form.control, name: toggleName });
  const selectedSeats = (useWatch({ control: form.control, name: seatsName }) || []) as ChildSeatSelection[];

  const handleSeatQuantityChange = (seatId: string, delta: number) => {
    const currentSeats = (form.getValues(seatsName) as ChildSeatSelection[]) || [];
    const existingSeat = currentSeats.find((seat: ChildSeatSelection) => seat.seatId === seatId);
    const nextQuantity = Math.max(0, (existingSeat?.quantity ?? 0) + delta);
    const seatsWithoutCurrent = currentSeats.filter((seat: ChildSeatSelection) => seat.seatId !== seatId);

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
          "flex items-center justify-between gap-3 border border-border bg-background p-3",
          seatsEnabled ? "rounded-t-lg rounded-b-none border-b-0" : "rounded-lg"
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
          className="rounded-t-none rounded-b-lg border-t-0 bg-background"
        />
      ) : null}
    </div>
  );
};
