import { ArrowRight, ArrowRightLeft, Clock, Tag } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/use-booking-store";
import { ChildSeatsField } from "./child-seats-field";
import { DriverNotesField } from "./driver-notes-field";
import { BookingOptionsButtons } from "./booking-options-buttons";
import { formatPrice } from "@/lib/booking-utils";

export const ReturnTripSection = () => {
    const form = useFormContext();
    const { bookingSettings, selectedVehicle, step1 } = useBookingStore();
    const returnDiscountRate =
        (bookingSettings as any)?.discounts?.returnTrip?.guest ??
        (bookingSettings as any)?.discounts?.returnTrip?.signup ??
        0;

    const fromLocation = step1?.pickupAddress ?? "pickup";
    const toLocation = step1?.deliveryAddress ?? "drop-off";
    const returnPrice =
        selectedVehicle?.priceBreakdown?.returnPrice ??
        selectedVehicle?.priceBreakdown?.discountedReturnPrice ??
        0;
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
        <div className="space-y-0 my-4">
            <div
                className={cn(
                    "flex flex-col w-full relative transition-all duration-500 p-3 md:p-4 border border-border",
                    isReturn ? "rounded-t-md border-b-0" : "rounded-md"
                )}
            >
                {returnDiscountRate > 0 && (
                    <div className="absolute -top-3 -right-1 z-20">
                        <div className="bg-secondary text-white flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-full border-2 border-white animate-in zoom-in slide-in-from-right-4 duration-500">
                            <Tag className="fill-current text-white/90 w-3 h-3 md:w-4 md:h-4" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-none">
                                Save {returnDiscountRate}%
                            </span>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-md bg-black flex items-center justify-center shrink-0">
                        <ArrowRightLeft className="text-white w-5 h-5" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-1">
                            Heading back to {fromLocation}?
                        </h3>
                        <p className="text-sm text-gray-400 font-semibold">
                            Add your return transfer from:
                        </p>

                        {/* Route pill — FROM → TO */}
                        <div className="flex items-stretch rounded-sm overflow-hidden min-w-0">
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-semibold text-gray-800 truncate">
                                    {toLocation}
                                </span>
                            </div>
                            <div className="flex items-center px-2 shrink-0">
                                <ArrowRight className="text-secondary w-4 h-4" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-semibold text-gray-800 truncate">
                                    {fromLocation}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm text-gray-400 font-semibold">
                            Additional cost
                        </span>
                        <span className="text-xl font-bold text-secondary leading-none">
                            {formatPrice(returnPrice)}
                        </span>
                    </div>
                    <Button
                        type="button"
                        onClick={handleReturnToggle}
                        variant={isReturn ? "outline" : "default"}
                        className={cn(
                            "px-4 md:px-6 h-8 md:h-10 rounded-sm text-sm font-bold shrink-0 transition-all active:scale-95",
                            isReturn
                                ? "border-black text-black hover:bg-gray-50"
                                : "bg-black text-white hover:bg-black/90"
                        )}
                    >
                        {isReturn ? "Remove" : "Add Return"}
                    </Button>
                </div>

                {isReturn && (
                    <div className="border-t border-border mt-3 pt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-5 bg-secondary rounded-full" />
                            <h4 className="text-sm font-bold text-gray-900">
                                Return Trip Details
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                name="returnDate"
                                type="date"
                                placeholder="Select return date"
                                minSelectableDate={step1?.pickupDate ? new Date(step1.pickupDate) : null}
                                required
                            />
                            <Input
                                name="returnTime"
                                type="time"
                                placeholder="Select return time"
                                required
                            />
                        </div>
                        <div className="">
                            <BookingOptionsButtons mode="return" />
                        </div>
                        {form.watch("returnChildSeatsEnabled") && (
                            <div className="animate-in slide-in-from-top-2 duration-300">
                                <ChildSeatsField mode="return" />
                            </div>
                        )}
                        {form.watch("returnNotesEnabled") && (
                            <div className="animate-in slide-in-from-top-2 duration-300">
                                <DriverNotesField mode="return" />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isReturn && (
                <div className="border border-t-0 border-border rounded-b-md h-2" />
            )}
        </div>
    );
};