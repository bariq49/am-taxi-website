import React from "react";
import { ArrowRightLeft, Clock } from "lucide-react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBookingAmount } from "@/lib/booking-pricing";
import { type ChildSeatOption } from "./child-seats-selector";
import { ChildSeatsField } from "./child-seats-field";

interface ReturnTripSectionProps {
  form: UseFormReturn<any>;
  hasReturnDiscount: boolean;
  returnDiscountRate: number;
  fromLocation: string;
  toLocation: string;
  returnBasePrice: number;
  returnPrice: number;
  meetGreetReturnBasePrice: number;
  childSeatOptions: ChildSeatOption[];
}

export const ReturnTripSection = ({
  form,
  hasReturnDiscount,
  returnDiscountRate,
  fromLocation,
  toLocation,
  returnBasePrice,
  returnPrice,
  meetGreetReturnBasePrice,
  childSeatOptions,
}: ReturnTripSectionProps) => {
  const isReturn = useWatch({ control: form.control, name: "isReturn" });

  const handleReturnToggle = () => {
    const nextIsReturn = !isReturn;
    form.setValue("isReturn", nextIsReturn, { shouldDirty: true });
    if (!nextIsReturn) {
      form.setValue("isReturnMeetGreet", false, { shouldDirty: true });
      form.setValue("returnChildSeatsEnabled", false, { shouldDirty: true });
      form.setValue("returnChildSeats", [], { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-0">
      <div
        className={cn(
          "p-3 md:p-4 flex flex-col sm:flex-row gap-3 md:gap-5 items-start w-full relative bg-gray-300 border border-border",
          isReturn ? "rounded-t-sm rounded-b-none border-b-0" : "rounded-sm"
        )}
      >
        {hasReturnDiscount ? (
          <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 md:px-2.5 md:py-1 rounded-bl-lg rounded-tr-sm z-10">
            {returnDiscountRate}% Off
          </span>
        ) : null}

        <div className="flex gap-3 md:gap-5 items-start w-full pr-16 sm:pr-20 md:pr-24">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-10 h-10 shrink-0 self-start mt-0.5",
              isReturn ? "bg-primary" : "bg-foreground"
            )}
          >
            <ArrowRightLeft size={16} className="text-background" />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="text-base md:text-lg font-semibold text-foreground leading-snug">
              Heading back to {fromLocation}?
            </div>
            <div className="text-sm text-foreground/80">
              Add your return transfer from{" "}
              <span className="text-foreground font-medium">{toLocation}</span> to{" "}
              <span className="text-foreground font-medium ">{fromLocation}</span> for an additional{" "}
              {hasReturnDiscount ? (
                <span className="inline-flex items-center gap-2">
                  {/* <span className="text-xs text-muted-foreground line-through">
                  {formatBookingAmount(returnBasePrice)}
                </span> */}
                  <span className="font-semibold text-destructive">
                    {formatBookingAmount(returnPrice)}
                  </span>
                </span>
              ) : (
                <span className="font-semibold text-destructive">
                  {formatBookingAmount(returnPrice)}
                </span>
              )}
              .
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end w-full sm:w-auto sm:ml-auto self-stretch sm:self-end">
          <Button
            type="button"
            onClick={handleReturnToggle}
            variant="outline"
            className={cn(
              "w-full sm:w-auto px-4 md:px-6 rounded-lg text-sm md:text-base",
              isReturn
                ? "border-black bg-black text-background hover:bg-black/90"
                : "border-black text-black bg-transparent hover:bg-black/10"
            )}
          >
            {isReturn ? "Cancel Return" : "Add Return"}
          </Button>
        </div>
      </div>

      {isReturn ? (
        <div className="rounded-b-lg rounded-t-none border border-border bg-background p-3 md:p-4 space-y-3">
          <div className="text-sm md:text-base font-semibold text-primary">
            Return Trip Details
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Input
              name="returnDate"
              type="date"
              label="Return Date"
              placeholder="Select return date"
              icon={<Clock size={16} />}
              required
            />
            <Input
              name="returnTime"
              type="time"
              label="Return Time"
              placeholder="Select return time"
              icon={<Clock size={16} />}
              required
            />
          </div>
          {/* <div className="text-sm md:text-base">
          Return Equipment and Extras
        </div> */}
          <Input
            name="isReturnMeetGreet"
            type="toggle"
            label={`Return Meet & Greet (${formatBookingAmount(meetGreetReturnBasePrice)})`}
          />
          <ChildSeatsField
            form={form}
            toggleName="returnChildSeatsEnabled"
            seatsName="returnChildSeats"
            toggleLabel="Return Child Seats"
            childSeatOptions={childSeatOptions}
          />
        </div>
      ) : null}
    </div>
  );
};
