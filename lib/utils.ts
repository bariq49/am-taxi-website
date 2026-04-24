import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { loadGoogleMaps } from "@/lib/google-maps-loader";
import { AIRPORT_KEYWORDS } from "@/constants/airports";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type LocationFieldName = "pickupAddress" | "deliveryAddress";

interface LocationFormAccessor {
    getValues: (name: LocationFieldName) => string;
    setValue: (
        name: LocationFieldName,
        value: string,
        options?: { shouldDirty?: boolean; shouldValidate?: boolean }
    ) => void;
}

const isPlusCodeAddress = (address: string) => /^[A-Z0-9]{4,}\+[A-Z0-9]{2,}/i.test(address.trim());

const getBestGeocodedAddress = (results: google.maps.GeocoderResult[] | null | undefined) => {
    if (!results?.length) return null;

    const preferredTypes = [
        "street_address",
        "premise",
        "subpremise",
        "route",
        "intersection",
        "establishment",
    ];

    const nonPlusCodeResults = results.filter(
        (result) => result.formatted_address && !isPlusCodeAddress(result.formatted_address)
    );

    const preferredResult = nonPlusCodeResults.find((result) =>
        result.types?.some((type) => preferredTypes.includes(type))
    );

    return preferredResult?.formatted_address ?? nonPlusCodeResults[0]?.formatted_address ?? null;
};

export const swapPickupAndDelivery = (form: LocationFormAccessor): void => {
    const pickupAddress = form.getValues("pickupAddress");
    const deliveryAddress = form.getValues("deliveryAddress");

    form.setValue("pickupAddress", deliveryAddress, { shouldDirty: true });
    form.setValue("deliveryAddress", pickupAddress, { shouldDirty: true });
};

export const reverseGeocodeWithGoogle = async (
    lat: number,
    lng: number
): Promise<string | null> => {
    await loadGoogleMaps();

    if (!window.google?.maps?.Geocoder) return null;

    return new Promise((resolve) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK") {
                resolve(getBestGeocodedAddress(results));
                return;
            }
            resolve(null);
        });
    });
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });
    });
};

export const getCurrentLocationErrorMessage = (error: GeolocationPositionError): string => {
    if (error.code === error.PERMISSION_DENIED) {
        return "Location permission denied. Please allow access and try again.";
    }
    return "Could not get your current location.";
};

export const isGeolocationError = (error: unknown): error is GeolocationPositionError => {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "number"
    );
};

export const resolvePickupAddressFromCurrentLocation = async (): Promise<string> => {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const geocodedAddress = await reverseGeocodeWithGoogle(latitude, longitude);

    return geocodedAddress ?? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};


export const isAirportAddress = (address: string): boolean => {
    if (!address) return false;
    const lowerAddress = address.toLowerCase();
    return AIRPORT_KEYWORDS.some((keyword) => lowerAddress.includes(keyword));
};