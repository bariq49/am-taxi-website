"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { useBookingStore, useTotalPrice } from "@/store/use-booking-store";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/form/form";
import { Input } from "@/components/form/Input";
import { ReturnTripSection } from "./return-trip-section";
import { ChildSeatsField } from "./child-seats-field";

interface PassengerDetailsFormValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isReturn: boolean;
    isMeetGreet: boolean;
    isReturnMeetGreet: boolean;
    returnDate: string;
    returnTime: string;
    childSeatsEnabled: boolean;
    returnChildSeatsEnabled: boolean;
    childSeats: { seatId: string; quantity: number }[];
    returnChildSeats: { seatId: string; quantity: number }[];
}

function Step3() {
    const {
        category,
        setStep3Data,
        step3,
    } = useBookingStore();
    const totalPrice = useTotalPrice();
    const safeTotalPrice = Number.isFinite(totalPrice) ? totalPrice : 0;
    const isHourly = category === "hourly";

    const form = useForm<PassengerDetailsFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            isReturn: false,
            isMeetGreet: false,
            isReturnMeetGreet: false,
            returnDate: "",
            returnTime: "",
            childSeatsEnabled: false,
            returnChildSeatsEnabled: false,
            childSeats: [],
            returnChildSeats: [],
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

    const handleSubmit = (data: any) => {
        setStep3Data(data);
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="p-4 rounded-sm bg-background flex flex-col gap-6 border border-gray-100 shadow-sm"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                name="firstName"
                                label="First Name"
                                placeholder="First Name"
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="lastName"
                                label="Last Name"
                                placeholder="Last Name"
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Email address"
                                icon={<Mail size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="phone"
                                type="phone"
                                label="Phone"
                                placeholder="Phone number"
                                required
                            />
                        </div>
                    </div>

                    {!isHourly && (
                        <ReturnTripSection />
                    )}

                    <ChildSeatsField mode="outbound" />

                    <Button
                        type="submit"
                    >
                        Proceed to Pay — ${safeTotalPrice.toFixed(2)}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Step3;