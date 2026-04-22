import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createCheckoutSession as createCheckoutSessionRequest,
    getBooking,
    type CheckoutPayload,
} from "@/lib/api/bookings";
import API_ROUTES from "@/config/routes";
import { useBookingStore, calculatePricing } from "@/store/use-booking-store";

type BookingStoreState = ReturnType<typeof useBookingStore.getState>;
type CheckoutBookingContext = Pick<
    BookingStoreState,
    "category" | "step1" | "step3" | "selectedVehicle"
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

            const pricing = calculatePricing(booking as any);
            const totalPrice = pricing?.total ?? 0;

            const payload: CheckoutPayload = {
                category: booking.category,
                vehicleId: booking.selectedVehicle._id,
                passengerDetails: {
                    firstName: booking.step3.firstName?.trim?.() ?? "",
                    lastName: booking.step3.lastName?.trim?.() ?? "",
                    phone: booking.step3.phone?.trim?.() ?? "",
                    email: booking.step3.email?.trim?.() ?? "",
                },
                tripDetails: {
                    pickupAddress: booking.step1.pickupAddress,
                    deliveryAddress: booking.step1.deliveryAddress?.trim?.(),
                    stops: booking.step1.stops ?? [],
                    distanceMiles: booking.step1.distanceMiles || 0,
                    pickupDate: booking.step1.pickupDate,
                    pickupTime: booking.step1.pickupTime,
                    returnDate: booking.step3.returnDate,
                    returnTime: booking.step3.returnTime,
                    passengers: booking.step3.passengers || 1,
                    bags: booking.step3.bags || 0,
                    airlineName: booking.step3.airlineName?.trim?.() || undefined,
                    flightNumber: booking.step3.flightNumber?.trim?.() || undefined,
                    childSeats: booking.step3.childSeats ?? [],
                    returnChildSeats: booking.step3.returnChildSeats ?? [],
                },
                amount: totalPrice,
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
