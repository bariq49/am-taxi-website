import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FleetByDistance } from '@/lib/api/fleets';

// =============== TYPES ===============

export type BookingCategory = 'one-way' | 'hourly' | 'return-trip';

export type Vehicle = FleetByDistance & {
    id: string;
    totalPrice: number;
};

export type Pricing = {
    base: number;
    total: number;
};

export interface BookingStep1PersistedData {
    pickupAddress: string;
    deliveryAddress: string;
    stops: { address: string }[];
    pickupDate: string;
    pickupTime: string;
    duration?: any;
    durationValue?: string;
    distance?: number;
    durationMinutes?: number;
    isAirportSelected?: boolean;
}

export interface BookingStep3PersistedData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isBookingForSomeoneElse?: boolean;
    pickupDate: string;
    pickupTime: string;
    passengers: number;
    bags: number;
    isReturn: boolean;
    isAirportPickup: boolean;
    childSeats: {
        seatId: string;
        quantity: number;
    }[];
    returnChildSeats?: {
        seatId: string;
        quantity: number;
    }[];
    notes?: string;
    returnNotes?: string;
    flightNumber?: string;
    returnDate?: string;
    returnTime?: string;
}

export interface BookingServiceItem {
    price: number;
    isActive: boolean;
}

export interface BookingSettingsSnapshot {
    _id: string;
    stopFee: BookingServiceItem;
    airportPickup: BookingServiceItem;
    childSeats: {
        _id: string;
        name: string;
        description?: string;
        price: number;
        isActive: boolean;
    }[];
}

// =============== STATE ===============

interface BookingState {
    category: BookingCategory;
    step1: BookingStep1PersistedData | null;
    step3: BookingStep3PersistedData | null;
    selectedVehicle: Vehicle | null;
    bookingSettings: BookingSettingsSnapshot | null;
    pricing: Pricing | null;

    // actions
    setCategory: (category: BookingCategory) => void;
    setCategoryOnly: (category: BookingCategory) => void;
    setStep1Data: (data: BookingStep1PersistedData) => void;
    setStep3Data: (data: BookingStep3PersistedData | null) => void;
    setSelectedVehicle: (fleet: FleetByDistance | null) => void;
    setBookingSettings: (settings: BookingSettingsSnapshot) => void;
    setPricing: (pricing: Pricing | null) => void;

    clearStep1: () => void;
    resetAll: () => void;
}

// =============== STORE ===============

const STORE_VERSION = 1;

const resolveFleetPrice = (fleet: FleetByDistance): number => {
    if (!fleet) return 0;
    return (
        fleet?.calculatedPrice ??
        fleet?.priceBreakdown?.totalPrice ??
        fleet?.priceBreakdown?.displayPrice ??
        fleet?.priceBreakdown?.basePrice ??
        0
    );
};

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            category: 'one-way',
            step1: null,
            step3: null,
            selectedVehicle: null,
            bookingSettings: null,
            pricing: null,

            setCategory: (category) =>
                set({
                    category,
                    step1: null,
                    step3: null,
                    selectedVehicle: null,
                    pricing: null,
                }),

            setCategoryOnly: (category) => set({ category }),

            setStep1Data: (data) =>
                set({
                    step1: data,
                    step3: null,
                    selectedVehicle: null,
                }),

            setStep3Data: (data) => set({ step3: data }),

            setSelectedVehicle: (fleet) =>
                set({
                    selectedVehicle: fleet ? {
                        ...fleet,
                        id: fleet._id,
                        totalPrice: resolveFleetPrice(fleet)
                    } : null,
                    step3: null,
                }),

            setBookingSettings: (settings) => set({ bookingSettings: settings }),

            setPricing: (pricing) => set({ pricing }),

            clearStep1: () =>
                set({
                    step1: null,
                    step3: null,
                }),

            resetAll: () =>
                set({
                    category: 'one-way',
                    step1: null,
                    step3: null,
                    selectedVehicle: null,
                    bookingSettings: null,
                    pricing: null,
                }),
        }),
        {
            name: 'amstaxi-booking-storage',
            version: STORE_VERSION,
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                category: state.category,
                step1: state.step1,
                step3: state.step3,
                selectedVehicle: state.selectedVehicle,
                bookingSettings: state.bookingSettings,
                pricing: state.pricing,
            }),
        }
    )
);

// =============== PRICE ENGINE ===============

export const calculatePricing = (state: BookingState): Pricing | null => {
    const { selectedVehicle, bookingSettings, step1, step3 } = state;

    if (!selectedVehicle || !bookingSettings || !step1) return null;

    let base = selectedVehicle?.totalPrice ?? 0;

    // Stops fee
    if (step1?.stops?.length) {
        const stopFee = bookingSettings?.stopFee;
        if (stopFee?.isActive) {
            base += (stopFee?.price || 0) * (step1?.stops?.length || 0);
        }
    }

    // Airport pickup
    if (step1?.isAirportSelected && bookingSettings?.airportPickup?.isActive) {
        base += (bookingSettings?.airportPickup?.price || 0);
    }

    // Return trip fare
    if (step3?.isReturn) {
        base +=
            selectedVehicle?.priceBreakdown?.returnPrice ??
            selectedVehicle?.priceBreakdown?.discountedReturnPrice ??
            0;
    }

    // Child seats
    const calcSeats = (seats?: { seatId: string; quantity: number }[]) => {
        if (!seats || !bookingSettings?.childSeats) return 0;

        return seats.reduce((sum, seat) => {
            if (!seat?.seatId) return sum;
            const found = bookingSettings.childSeats.find(s => s?._id === seat.seatId);
            if (found?.isActive) {
                return sum + ((found?.price || 0) * (seat?.quantity || 0));
            }
            return sum;
        }, 0);
    };

    base += calcSeats(step3?.childSeats);
    base += calcSeats(step3?.returnChildSeats);

    return {
        base,
        total: base,
    };
};

// =============== SELECTORS ===============

export const useTotalPrice = () =>
    useBookingStore((state) => {
        const calculated = calculatePricing(state);
        return calculated?.total ?? 0;
    });

export const useIsBookingReady = () =>
    useBookingStore((state) =>
        Boolean(state.step1 && state.step3 && state.selectedVehicle)
    );
