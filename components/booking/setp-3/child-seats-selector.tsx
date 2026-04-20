import { formatBookingAmount } from "@/lib/booking-pricing";
import { cn } from "@/lib/utils";

export interface ChildSeatSelection {
  seatId: string;
  quantity: number;
}

export interface ChildSeatOption {
  _id: string;
  name: string;
  price: number;
}

interface ChildSeatsSelectorProps {
  options: ChildSeatOption[];
  selections: ChildSeatSelection[];
  onQuantityChange: (seatId: string, delta: number) => void;
  className?: string;
}

export const ChildSeatsSelector = ({
  options,
  selections,
  onQuantityChange,
  className,
}: ChildSeatsSelectorProps) => (
  <div className={cn("rounded-lg border border-border p-3 flex flex-col gap-3", className)}>
    <div className="flex flex-col gap-2">
      {options.map((seat) => {
        const selectedSeat = selections.find((item) => item.seatId === seat._id);
        const quantity = selectedSeat?.quantity ?? 0;

        return (
          <div
            key={seat._id}
            className="rounded-lg border border-border bg-background p-1 px-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="text-sm  text-foreground">
              {seat.name} ({formatBookingAmount(seat.price)})
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="flex h-[46px] w-full items-center overflow-hidden rounded-lg border border-border bg-white text-black sm:w-auto">
                <button
                  type="button"
                  onClick={() => onQuantityChange(seat._id, -1)}
                  disabled={quantity <= 0}
                  className="h-full w-12 shrink-0 flex items-center justify-center border-r border-gray-200 text-base font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={`Decrease ${seat.name}`}
                >
                  -
                </button>
                <span className="flex-1 text-center py-2.5 text-sm font-semibold tabular-nums border-x border-gray-200 bg-background min-w-[52px]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(seat._id, 1)}
                  className="h-full w-12 shrink-0 flex items-center justify-center border-l border-gray-200 text-base font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={`Increase ${seat.name}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
