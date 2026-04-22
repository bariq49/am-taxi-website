import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createCheckoutSession as createCheckoutSessionRequest,
    getBooking,
    type CheckoutPayload,
} from "@/lib/api/bookings";
import API_ROUTES from "@/config/routes";
import { useBookingStore } from "@/store/use-booking-store";

type BookingStoreState = ReturnType<typeof useBookingStore.getState>;
type CheckoutBookingContext = Pick<
    BookingStoreState,
    "category" | "step1" | "step3" | "selectedVehicle" | "pricing"
>;

export interface CreateCheckoutSessionInput {
    booking: CheckoutBookingContext;
}

export const useCreateCheckoutSession = () => {
    return useMutation({
        mutationFn: async ({ booking }: CreateCheckoutSessionInput) => {
            if (!booking.step1 || !booking.step3 || !booking.selectedVehicle) {
                throw new Error("Missing booking context for checkout.");
            }

            const firstName = (booking.step3 as any).firstName?.trim?.() ?? "";
            const lastName = (booking.step3 as any).lastName?.trim?.() ?? "";
            const fullName =
                booking.step3.fullName?.trim?.() ||
                `${firstName} ${lastName}`.trim() ||
                "Guest";

            const payload: CheckoutPayload = {
                category: booking.category,
                vehicleId: booking.selectedVehicle._id,
                passengerDetails: {
                    fullName,
                    phone: booking.step3.phone?.trim?.() ?? "",
                    email: booking.step3.email?.trim?.() ?? "",
                    state: booking.step3.state?.trim?.() ?? "",
                },
                tripDetails: {
                    pickupAddress: booking.step1.pickupAddress,
                    deliveryAddress: booking.step1.deliveryAddress?.trim?.() || booking.step1.pickupAddress,
                    stops: booking.step1.stops ?? [],
                    distanceMiles: booking.step1.distanceMiles || 0,
                    pickupDate: booking.step3.pickupDate || booking.step1.pickupDate,
                    pickupTime: booking.step3.pickupTime || booking.step1.pickupTime,
                    returnDate: booking.step3.returnDate,
                    returnTime: booking.step3.returnTime,
                    passengers: booking.step3.passengers || 1,
                    bags: booking.step3.bags || 0,
                    isReturn: Boolean(booking.step3.isReturn),
                    isAirportPickup: Boolean(booking.step3.isAirportPickup),
                    airlineName: booking.step3.airlineName?.trim?.() || undefined,
                    flightNumber: booking.step3.flightNumber?.trim?.() || undefined,
                    isMeetGreet: Boolean(booking.step3.isMeetGreet),
                    isReturnMeetGreet: Boolean(booking.step3.isReturnMeetGreet),
                    childSeats: booking.step3.childSeats ?? [],
                    returnChildSeats: booking.step3.returnChildSeats ?? [],
                    instructions: booking.step3.instructions?.trim?.() ?? "",
                },
                amount: booking.pricing?.total ?? booking.selectedVehicle.totalPrice ?? 0,
                pricingBreakdown: {
                    totals: {
                        subtotal: booking.pricing?.base ?? booking.selectedVehicle.totalPrice ?? 0,
                        totalAmount: booking.pricing?.total ?? booking.selectedVehicle.totalPrice ?? 0,
                    },
                },
            };

            const checkoutUrl = await createCheckoutSessionRequest(payload);

            if (typeof window !== "undefined") {
                window.location.href = checkoutUrl;
            }

            return checkoutUrl;
        },
    });
};

export const useBookingStatus = (bookingId?: string) => {
    return useQuery({
        queryKey: ["booking-status", bookingId],
        queryFn: () => getBooking(bookingId as string),
        enabled: Boolean(bookingId),
    });
};

export const useDownloadBookingReceipt = () => {
    return useMutation({
        mutationFn: async (bookingId: string) => {
            if (typeof window === "undefined") return;
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
            const receiptUrl = `${baseURL}${API_ROUTES.BOOKINGS}/${bookingId}/receipt`;
            window.open(receiptUrl, "_blank", "noopener,noreferrer");
        },
    });
};
