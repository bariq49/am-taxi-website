import API_ROUTES from "@/config/routes";
import { api } from "./client";

export interface CheckoutPayload {
  category: "one-way" | "hourly" | "return-trip";
  vehicleId: string;
  passengerDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  tripDetails: {
    pickupAddress: string;
    deliveryAddress: string;
    stops: { address: string }[];
    distance: number;
    pickupDate: string;
    pickupTime: string;
    returnDate?: string;
    returnTime?: string;
    passengers: number;
    bags: number;
    airlineName?: string;
    flightNumber?: string;
    childSeats: { seatId: string; quantity: number }[];
    returnChildSeats?: { seatId: string; quantity: number }[];
  };
  amount: number;
}



export const createCheckoutSession = async (payload: CheckoutPayload) => {
  const response = await api.post(`${API_ROUTES.BOOKINGS}/checkout`, payload);
  const checkoutUrl = response?.data?.url;

  if (!checkoutUrl) {
    throw new Error("Checkout URL missing in checkout response.");
  }

  return checkoutUrl;
};

export const getBooking = async (bookingId: string) => {
  const response = await api.get(`${API_ROUTES.BOOKINGS}/status/${bookingId}`);
  return response.data;
};

