import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Mail, MapPin, User, Clock } from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { useCreateCheckoutSession } from "@/hooks/query/use-booking";
import { useUser } from "@/hooks/query/use-auth";
import { toast } from "sonner";
import { calculateBookingPricing, formatBookingAmount } from "@/lib/booking-pricing";
import { Button } from "@/components/ui/button";
import { ChildSeatsField } from "./child-seats-field";
import { ReturnTripSection } from "./return-trip-section";
import { AirportPickupField } from "./airport-pickup-field";

interface PassengerDetailsFormValues {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  bags: number;
  isReturn: boolean;
  isAirportPickup: boolean;
  isMeetGreet: boolean;
  isReturnMeetGreet: boolean;
  childSeatsEnabled: boolean;
  returnChildSeatsEnabled: boolean;
  airlineName?: string;
  flightNumber?: string;
  childSeats: {
    seatId: string;
    quantity: number;
  }[];
  returnChildSeats: {
    seatId: string;
    quantity: number;
  }[];
  instructions: string;
}

function Step3() {
  const category = useBookingStore((s) => s.category);
  const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
  const step1 = useBookingStore((s) => s.step1);
  const bookingSettings = useBookingStore((s) => s.bookingSettings);
  const setStep3Data = useBookingStore((s) => s.setStep3Data);
  const setCategoryOnly = useBookingStore((s) => s.setCategoryOnly);

  const initialStep3 = React.useMemo(() => useBookingStore.getState().step3, []);

  const { mutateAsync: createCheckoutSession, isPending: isSubmitting } = useCreateCheckoutSession();
  const { data: authData } = useUser();
  const currentUser = authData?.user;
  const isLoggedIn = Boolean(currentUser);
  const shouldAskContactFields = !isLoggedIn;
  const isHourly = category === "hourly";
  const childSeatOptions = bookingSettings?.childSeats || [];

  const form = useForm<PassengerDetailsFormValues>({
    defaultValues: {
      fullName: initialStep3?.fullName ?? currentUser?.fullName ?? "",
      phone: initialStep3?.phone ?? currentUser?.phone ?? "",
      email: initialStep3?.email ?? currentUser?.email ?? "",
      state: initialStep3?.state ?? currentUser?.state ?? "",
      pickupDate: initialStep3?.pickupDate ?? "",
      pickupTime: initialStep3?.pickupTime ?? "",
      returnDate: initialStep3?.returnDate ?? "",
      returnTime: initialStep3?.returnTime ?? "",
      passengers: initialStep3?.passengers ?? 1,
      bags: initialStep3?.bags ?? 0,
      isReturn: isHourly ? false : (initialStep3?.isReturn ?? false),
      isAirportPickup: step1?.isAirportSelected ? true : (initialStep3?.isAirportPickup ?? false),
      airlineName: initialStep3?.airlineName ?? "",
      flightNumber: initialStep3?.flightNumber ?? "",
      isMeetGreet: initialStep3?.isMeetGreet ?? false,
      isReturnMeetGreet: isHourly ? false : (initialStep3?.isReturnMeetGreet ?? false),
      childSeatsEnabled: (initialStep3?.childSeats?.length ?? 0) > 0,
      returnChildSeatsEnabled: isHourly ? false : (initialStep3?.returnChildSeats?.length ?? 0) > 0,
      childSeats: initialStep3?.childSeats ?? [],
      returnChildSeats: isHourly ? [] : (initialStep3?.returnChildSeats ?? []),
      instructions: initialStep3?.instructions ?? "",
    },
  });

  React.useEffect(() => {
    if (!isLoggedIn || !currentUser) return;

    if (form.getValues("fullName") !== (currentUser.fullName || "")) {
      form.setValue("fullName", currentUser.fullName || "", { shouldDirty: false });
    }
    if (form.getValues("email") !== (currentUser.email || "")) {
      form.setValue("email", currentUser.email || "", { shouldDirty: false });
    }
    if (form.getValues("phone") !== (currentUser.phone || "")) {
      form.setValue("phone", currentUser.phone || "", { shouldDirty: false });
    }
    if (form.getValues("state") !== (currentUser.state || "")) {
      form.setValue("state", currentUser.state || "", { shouldDirty: false });
    }
  }, [isLoggedIn, currentUser, form]);

  React.useEffect(() => {
    if (step1?.isAirportSelected && !form.getValues("isAirportPickup")) {
      form.setValue("isAirportPickup", true, { shouldDirty: false });
    }
  }, [step1?.isAirportSelected, form]);

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

  const liveTotalAmount = React.useMemo(
    () =>
      calculateBookingPricing({
        step1,
        step3: watchedStep3,
        selectedVehicle,
        bookingSettings,
      }).totalAmount,
    [step1, watchedStep3, selectedVehicle, bookingSettings]
  );
  const airportPickupBasePrice =
    bookingSettings?.airportPickup?.isActive ? bookingSettings.airportPickup.price : 0;
  const meetGreetOutboundBasePrice =
    bookingSettings?.outbound?.meetAndGreet?.isActive
      ? bookingSettings.outbound.meetAndGreet.price
      : 0;
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
  const maxPassengers = Math.max(selectedVehicle?.passengers ?? 1, 1);
  const maxBags = Math.max(selectedVehicle?.suitcases ?? 0, 0);

  const onSubmit = async (data: PassengerDetailsFormValues) => {
    try {
      const nextCategory = (isHourly ? "hourly" : (data.isReturn ? "return-trip" : "one-way")) as any;
      const sanitizedPassengers = Math.min(
        maxPassengers,
        Math.max(1, Number(data.passengers) || 1)
      );
      const sanitizedBags = Math.min(
        maxBags,
        Math.max(0, Number(data.bags) || 0)
      );

      const {
        childSeatsEnabled: _childSeatsEnabled,
        returnChildSeatsEnabled: _returnChildSeatsEnabled,
        ...step3Data
      } = data;
      const nextStep3Data = {
        ...step3Data,
        isReturn: isHourly ? false : step3Data.isReturn,
        isReturnMeetGreet: isHourly ? false : step3Data.isReturnMeetGreet,
        returnDate: isHourly ? undefined : step3Data.returnDate,
        returnTime: isHourly ? undefined : step3Data.returnTime,
        childSeats: (step3Data.childSeats || []).filter((seat) => (seat.quantity || 0) > 0),
        returnChildSeats: isHourly
          ? []
          : (step3Data.returnChildSeats || []).filter((seat) => (seat.quantity || 0) > 0),
        fullName: isLoggedIn ? currentUser?.fullName || step3Data.fullName : step3Data.fullName,
        email: isLoggedIn ? currentUser?.email || step3Data.email : step3Data.email,
        phone: isLoggedIn ? currentUser?.phone?.trim() || "" : data.phone?.trim() || "",
        state: isLoggedIn ? currentUser?.state?.trim() || "" : data.state?.trim() || "",
        passengers: sanitizedPassengers,
        bags: sanitizedBags,
        airlineName: watchedStep3.isAirportPickup ? step3Data.airlineName : undefined,
        flightNumber: watchedStep3.isAirportPickup ? step3Data.flightNumber : undefined,
      };

      setStep3Data(nextStep3Data);

      await createCheckoutSession({
        booking: {
          category: nextCategory,
          step1,
          selectedVehicle,
          bookingSettings,
          step3: nextStep3Data,
        },
      });
    } catch {
      toast.error("Unable to create checkout session. Please try again.");
    }
  };

  React.useEffect(() => {
    if (!isHourly) return;
    if (form.getValues("isReturn")) {
      form.setValue("isReturn", false, { shouldDirty: true });
    }
    if (form.getValues("isReturnMeetGreet")) {
      form.setValue("isReturnMeetGreet", false, { shouldDirty: true });
    }
    if (form.getValues("returnChildSeatsEnabled")) {
      form.setValue("returnChildSeatsEnabled", false, { shouldDirty: true });
    }
    if ((form.getValues("returnChildSeats") || []).length > 0) {
      form.setValue("returnChildSeats", [], { shouldDirty: true });
    }
    if (form.getValues("returnDate")) {
      form.setValue("returnDate", "", { shouldDirty: true });
    }
    if (form.getValues("returnTime")) {
      form.setValue("returnTime", "", { shouldDirty: true });
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
          {!isLoggedIn ? (
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
          ) : null}

          {shouldAskContactFields ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                name="phone"
                type="phone"
                label="Phone"
                placeholder="Phone number"
                required
              />
              <Input
                name="state"
                type="text"
                label="State"
                placeholder="State"
                icon={<MapPin size={16} />}
                required
              />
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Input
              name="pickupDate"
              type="date"
              label="Pickup Date"
              placeholder="Select date"
              icon={<Clock size={16} />}
              required
            />
            <Input
              name="pickupTime"
              type="time"
              label="Pickup Time"
              placeholder="Select time"
              icon={<Clock size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              name="passengers"
              type="counter"
              label="Passengers"
              min={1}
              max={maxPassengers}
              required
            />
            <Input
              name="bags"
              type="counter"
              label="Bags"
              min={0}
              max={maxBags}
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

          <AirportPickupField
            form={form}
            airportPickupBasePrice={airportPickupBasePrice}
            disabled={step1?.isAirportSelected}
          />

          <Input
            name="isMeetGreet"
            type="toggle"
            label={`Meet & Greet (${formatBookingAmount(meetGreetOutboundBasePrice)})`}
          />
          <ChildSeatsField
            form={form}
            toggleName="childSeatsEnabled"
            seatsName="childSeats"
            toggleLabel="Child Seats"
            childSeatOptions={childSeatOptions}
          />

          <Input
            name="instructions"
            type="textarea"
            label="Instructions"
            placeholder="Enter any special instructions..."
            rows={4}
          />

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full font-semibold"
          >
            {`Process to Pay ${formatBookingAmount(liveTotalAmount)}`}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Step3;