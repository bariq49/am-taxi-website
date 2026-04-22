import React from "react";
import { useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { Button } from "@/components/ui/button";
import { ChildSeatsField } from "./child-seats-field";
import { ReturnTripSection } from "./return-trip-section";
import { Form } from "@/components/form/form";
import { Input } from "@/components/form/Input";

interface PassengerDetailsFormValues {
    fullName: string;
    phone: string;
    email: string;
    isReturn: boolean;
    childSeatsEnabled: boolean;
    returnChildSeatsEnabled: boolean;
    childSeats: {
        seatId: string;
        quantity: number;
    }[];
    returnChildSeats: {
        seatId: string;
        quantity: number;
    }[];
}

function Step3() {
    const category = useBookingStore((s) => s.category);
    const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
    const step1 = useBookingStore((s) => s.step1);
    const bookingSettings = useBookingStore((s) => s.bookingSettings);
    const setStep3Data = useBookingStore((s) => s.setStep3Data);
    const setCategoryOnly = useBookingStore((s) => s.setCategoryOnly);


    const isHourly = category === "hourly";
    const childSeatOptions = bookingSettings?.childSeats || [];

    const form = useForm<PassengerDetailsFormValues>({
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            isReturn: false,
            childSeatsEnabled: false,
            returnChildSeatsEnabled: false,
            childSeats: [],
            returnChildSeats: [],
        },
    });

    const watchedStep3 = form.watch();

    React.useEffect(() => {
        if (isHourly) return;
        const currentCategory = useBookingStore.getState().category;
        const shouldBe = watchedStep3.isReturn ? "return-trip" : "one-way";
        if (currentCategory !== shouldBe) {
            setCategoryOnly(shouldBe);
        }
    }, [watchedStep3.isReturn, isHourly, setCategoryOnly]);

    React.useEffect(() => {
        const {
            childSeatsEnabled: _,
            returnChildSeatsEnabled: __,
            ...sanitizedData
        } = watchedStep3;
        const currentStoreStep3 = useBookingStore.getState().step3;
        const hasChanged = JSON.stringify(currentStoreStep3) !== JSON.stringify(sanitizedData);

        if (hasChanged) {
            setStep3Data(sanitizedData as any);
        }
    }, [watchedStep3, setStep3Data]);


    const meetGreetReturnBasePrice =
        bookingSettings?.return?.meetAndGreet?.isActive
            ? bookingSettings.return.meetAndGreet.price
            : 0;
    const returnPrice = selectedVehicle?.priceBreakdown?.returnPrice ?? 0;
    const returnBasePrice =
        selectedVehicle?.priceBreakdown?.returnBasePrice ?? returnPrice;
    const returnDiscountRate =
        selectedVehicle?.priceBreakdown?.returnDiscountRate ?? 0;
    const hasReturnDiscount =
        returnDiscountRate > 0 && returnBasePrice > returnPrice;

    const fromLocation = step1?.pickupAddress || "your pickup location";
    const toLocation = step1?.deliveryAddress || "your destination";

    const onSubmit = async (data: PassengerDetailsFormValues) => {
        const {
            childSeatsEnabled: _childSeatsEnabled,
            returnChildSeatsEnabled: _returnChildSeatsEnabled,
            ...step3Data
        } = data;
        const nextStep3Data = {
            ...step3Data,
            isReturn: isHourly ? false : step3Data.isReturn,
            childSeats: (step3Data.childSeats || []).filter((seat) => (seat.quantity || 0) > 0),
            returnChildSeats: isHourly
                ? []
                : (step3Data.returnChildSeats || []).filter((seat) => (seat.quantity || 0) > 0),
            fullName: step3Data.fullName,
            email: step3Data.email,
            phone: data.phone?.trim() || "",
        };

        setStep3Data(nextStep3Data as any);
        // Add navigation or checkout logic here if needed
    };

    React.useEffect(() => {
        if (!isHourly) return;
        if (form.getValues("isReturn")) {
            form.setValue("isReturn", false, { shouldDirty: true });
        }
        if (form.getValues("returnChildSeatsEnabled")) {
            form.setValue("returnChildSeatsEnabled", false, { shouldDirty: true });
        }
        if ((form.getValues("returnChildSeats") || []).length > 0) {
            form.setValue("returnChildSeats", [], { shouldDirty: true });
        }
    }, [isHourly, form]);

    if (!selectedVehicle) {
        return (
            <div className="bg-background border border-border rounded-xl p-4 text-sm text-foreground/80">
                Please select a vehicle first to continue.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 w-full overflow-x-hidden">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-lg:px-3 max-lg:py-5 sm:p-5 rounded-2xl bg-background flex flex-col gap-4 border border-border"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                            name="fullName"
                            type="text"
                            label="Full Name"
                            placeholder="Passenger full name"
                            icon={<User size={16} />}
                            required
                        />
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Your email"
                            icon={<Mail size={16} />}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                            name="phone"
                            type="phone"
                            label="Phone"
                            placeholder="Phone number"
                            required
                        />
                    </div>

                    {!isHourly ? (
                        <ReturnTripSection
                            form={form}
                            hasReturnDiscount={hasReturnDiscount}
                            returnDiscountRate={returnDiscountRate}
                            fromLocation={fromLocation}
                            toLocation={toLocation}
                            returnBasePrice={returnBasePrice}
                            returnPrice={returnPrice}
                            meetGreetReturnBasePrice={meetGreetReturnBasePrice}
                            childSeatOptions={childSeatOptions}
                        />
                    ) : null}

                    <ChildSeatsField
                        form={form}
                        toggleName="childSeatsEnabled"
                        seatsName="childSeats"
                        toggleLabel="Child Seats"
                        childSeatOptions={childSeatOptions}
                    />

                    <Button
                        type="submit"
                        className="w-full font-semibold"
                    >
                        {`Process to Pay`}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Step3;