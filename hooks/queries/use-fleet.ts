import { getBookingSettings, getFleets, getFleetCategories, getFleetsByDistance, getHourlyPricings, QueryParams } from "@/lib/api/fleets";
import { getPackageSelectOptions } from "@/lib/booking-utils";
import { useQuery } from "@tanstack/react-query";

export const useFleets = (params?: QueryParams) => {
    return useQuery({
        queryKey: ["fleets", params],
        queryFn: () => getFleets(params),
    });
};

export const useHourlyPricings = (
    params?: QueryParams,
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["hourly-pricings", params],
        queryFn: () => getHourlyPricings(params),
        enabled: options?.enabled ?? true,
        select: (data) => getPackageSelectOptions(data),
    });
};

export const useFleetsByDistance = (
  distance: number, 
  params?: QueryParams,
  options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["fleets-by-distance", distance, params],
        queryFn: () => getFleetsByDistance(distance, params),
        enabled: options?.enabled ?? true,
    });
};

export const useBookingSettings = () => {
    return useQuery({
        queryKey: ["booking-settings"],
        queryFn: getBookingSettings,
    });
};

export const useFleetCategories = () => {
    return useQuery({
        queryKey: ["fleet-categories"],
        queryFn: getFleetCategories,
    });
};