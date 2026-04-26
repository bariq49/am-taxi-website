"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { useBookingStore, useTotalPrice } from "@/store/use-booking-store";
import { useCreateCheckoutSession } from "@/hooks/queries/use-booking";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/features/form/form";
import { Input } from "@/components/features/form/Input";
import { Switch } from "@/components/features/form/switch";
import { ReturnTripSection } from "./return-trip-section";
import { ChildSeatsField } from "./child-seats-field";
import { DriverNotesField } from "./driver-notes-field";
import { BookingOptionsButtons } from "./booking-options-buttons";
import { AirportPickupField } from "./airport-pickup-field";
import { formatPrice } from "@/lib/booking-utils";
import { cn } from "@/lib/utils";

interface PassengerDetailsFormValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isBookingForSomeoneElse: boolean;
    isReturn: boolean;
    isAirportPickup: boolean;
    flightNumber: string;
    returnDate: string;
    returnTime: string;
    childSeatsEnabled: boolean;
    returnChildSeatsEnabled: boolean;
    childSeats: { seatId: string; quantity: number }[];
    returnChildSeats: { seatId: string; quantity: number }[];
    notes: string;
    returnNotes: string;
    notesEnabled: boolean;
    returnNotesEnabled: boolean;
}

function Step3() {
    const {
        category,
        setStep3Data,
        step3,
        step1,
        bookingSettings,
    } = useBookingStore();
    const totalPrice = useTotalPrice();
    const isHourly = category === "hourly";
    const { mutateAsync: createCheckoutSession, isPending } = useCreateCheckoutSession();

    const form = useForm<PassengerDetailsFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            isBookingForSomeoneElse: false,
            isReturn: false,
            isAirportPickup: step1?.isAirportSelected ?? false,
            flightNumber: "",
            returnDate: "",
            returnTime: "",
            childSeatsEnabled: false,
            returnChildSeatsEnabled: false,
            childSeats: [],
            returnChildSeats: [],
            notes: "",
            returnNotes: "",
            notesEnabled: false,
            returnNotesEnabled: false,
        },
    });
    const lastSyncedSnapshotRef = React.useRef<string>(JSON.stringify(step3 ?? null));

    React.useEffect(() => {
        const subscription = form.watch((values) => {
            const snapshot = JSON.stringify(values ?? null);
            if (snapshot === lastSyncedSnapshotRef.current) return;
            lastSyncedSnapshotRef.current = snapshot;
            setStep3Data(values as any);
        });

        return () => subscription.unsubscribe();
    }, [form, setStep3Data]);

    const handleSubmit = async (data: any) => {
        setStep3Data(data);
        await createCheckoutSession({
            booking: useBookingStore.getState(),
        });
    };

    return (
        <div className="flex flex-col animate-in fade-in duration-500 md:border border-border rounded-lg md:shadow-md p-2 md:p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col"
                >
                    {step1?.isAirportSelected && (
                        <AirportPickupField
                            form={form}
                            airportPickupBasePrice={bookingSettings?.airportPickup?.price ?? 0}
                        />
                    )}

                    <div className="mt-6">
                        <div className="flex items-center justify-between px-1 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                                {form.watch("isBookingForSomeoneElse") ? "Passenger Details" : "Your Details"}
                            </h3>
                            <FormField
                                control={form.control}
                                name="isBookingForSomeoneElse"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <span className="text-sm font-medium text-gray-500">For someone else?</span>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                icon={<Mail size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="phone"
                                type="phone"
                                placeholder="Phone number"
                                required
                            />
                        </div>
                    </div>
                    {!isHourly && (
                        <ReturnTripSection />
                    )}

                    <BookingOptionsButtons />


                    {form.watch("childSeatsEnabled") && (
                        <div className="space-y-6 pt-2">
                            <ChildSeatsField mode="outbound" />
                        </div>
                    )}

                    {form.watch("notesEnabled") && (
                        <div className="space-y-6 pt-4 border-t border-gray-50">
                            <DriverNotesField mode="outbound" />
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="mt-4 rounded-full"
                        loading={isPending}
                    >
                        Proceed to Pay — {formatPrice(totalPrice)}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Step3;