import API_ROUTES from "@/config/routes";
import { api } from "./client";

export interface FleetPricingListResponse {
    data: [];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        pages: number;
    };
}

export interface HourlyPricingPackage {
    _id: string;
    fleetId: string;
    packageType: "hourly" | "day" | "week";
    duration: number;
    includedMiles: number;
    price: number;
    extraMileRate: number;
    isActive: boolean;
}

export interface DurationOption {
    label: string;
    value: string;
}

export interface HourlyPricingListResponse {
    data: HourlyPricingPackage[];
    options?: DurationOption[];
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        pages: number;
    };
}

export interface BookingServiceItem {
    price: number;
    isActive: boolean;
}

export interface BookingSettingsResponse {
    _id: string;
    taxRate: number;
    gratuityRate: number;
    discounts: {
        signup: number;
        guest: number;
        returnTrip: {
            signup: number;
            guest: number;
        };
    };
    stopFee: BookingServiceItem;
    airportPickup: BookingServiceItem;
    outbound: {
        meetAndGreet: BookingServiceItem;
    };
    return: {
        meetAndGreet: BookingServiceItem;
    };
    childSeats: ChildSeat[];
}

export interface ChildSeat {
    _id: string;
    name: string;
    description?: string;
    price: number;
    isActive: boolean;
}

export interface FleetPriceBreakdown {
    basePrice: number;
    gratuityRate: number;
    gratuityAmount: number;
    taxRate: number;
    taxAmount: number;
    totalPrice: number;
    displayDiscountRate: number;
    displayDiscountAmount: number;
    displayPrice: number;
    returnBasePrice: number;
    returnPrice: number;
    returnDiscountRate: number;
    returnDiscountAmount: number;
    discountedReturnPrice: number;
    roundTripTotalPrice: number;
    pricingIncreasePercentage?: number;
    pricingIncreaseAmount?: number;
}

export interface FleetByDistance {
    _id: string;
    name: string;
    image: string;
    description?: string;
    passengers: number;
    suitcases: number;
    timePeriod?: string;
    carType?: string;
    isActive: boolean;
    allowRequestQuote?: boolean;
    createdAt: string;
    updatedAt: string;
    calculatedPrice: number;
    distance: number;
    priceBreakdown: FleetPriceBreakdown;
}

export interface Fleet {
    _id: string;
    name: string;
    image: string;
    description?: string;
    passengers: number;
    suitcases: number;
    timePeriod?: string;
    carType?: string;
    isActive: boolean;
    allowRequestQuote?: boolean;
    createdAt: string;
    updatedAt: string;
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export const getHourlyPricings = async (params?: QueryParams): Promise<HourlyPricingListResponse> => {
    const response = await api.get(API_ROUTES.HOURLY_PRICING, { params });
    return response.data;
};

export const getFleetsByDistance = async (distance: number, params?: QueryParams): Promise<any> => {
    const response = await api.get(`${API_ROUTES.FLEET}/by-distance/${distance}`, { params });
    return response.data;
};

export const getFleets = async (params?: QueryParams): Promise<any> => {
    const response = await api.get(API_ROUTES.FLEET, { params: { isActive: true } });
    return response.data;
};

export const getBookingSettings = async (): Promise<any> => {
    const response = await api.get(API_ROUTES.BOOKING_SETTINGS);
    return response.data;
};
