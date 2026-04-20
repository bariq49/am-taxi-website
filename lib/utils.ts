import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { loadGoogleMaps } from "@/lib/google-maps-loader";

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
    const airportKeywords = [
        'airport',
        ' lhr ',
        ' lgw ',
        ' stn ',
        ' ltn ',
        ' lcy ',
        ' sen ',
        ' jfk ',
        ' lax ',
        ' ord ',
        ' dfw ',
        ' den ',
        ' atl ',
        ' sfo ',
        ' sea ',
        ' las ',
        ' phx ',
        ' ewr ',
        ' mia ',
        ' mco ',
        ' clt ',
        ' iah ',
        ' bos ',
        ' msy ',
        ' phl ',
        ' dca ',
        ' iad ',
        ' san ',
        ' tpa ',
        ' fll ',
        ' rsw ',
        ' pbi ',
        ' bwi ',
        ' msp ',
        ' dtw ',
        ' slc ',
        ' bna ',
        ' aus ',
        ' pdx ',
        ' mci ',
        ' cle ',
        ' ind ',
        ' cmh ',
        ' pit ',
        ' cvg ',
        ' rdu ',
        ' gso ',
        ' clt ',
        ' gsp ',
        ' cae ',
        ' chs ',
        ' sav ',
        ' jax ',
        ' pns ',
        ' vps ',
        ' mob ',
        ' msy ',
        ' gpt ',
        ' btr ',
        ' shv ',
        ' lft ',
        ' lch ',
        ' txl ',
        ' dal ',
        ' hou ',
        ' sat ',
        ' elp ',
        ' ama ',
        ' lbb ',
        ' abq ',
        ' phx ',
        ' tus ',
        ' las ',
        ' rno ',
        ' sfo ',
        ' oak ',
        ' sjc ',
        ' smf ',
        ' fat ',
        ' bur ',
        ' ont ',
        ' sna ',
        ' lgb ',
        ' san ',
        ' sea ',
        ' psp ',
        ' bfi ',
        ' pae ',
        ' geg ',
        ' boi ',
        ' bil ',
        ' bzn ',
        ' jac ',
        ' cas ',
        ' cpr ',
        ' den ',
        ' cos ',
        ' ase ',
        ' ege ',
        ' gjt ',
        ' pub ',
        ' slc ',
        ' ogr ',
        ' hnl ',
        ' ogg ',
        ' koa ',
        ' lih ',
        ' anc ',
        ' fai ',
        ' jnu ',
        ' dtw ',
        ' grr ',
        ' lan ',
        ' fnt ',
        ' mbs ',
        ' tvc ',
        ' ord ',
        ' mdw ',
        ' mke ',
        ' msn ',
        ' grb ',
        ' atw ',
        ' rfd ',
        ' pia ',
        ' cmi ',
        ' spi ',
        ' dec ',
        ' blv ',
        ' stl ',
        ' mci ',
        ' sgf ',
        ' cou ',
        ' jln ',
        ' oma ',
        ' lnk ',
        ' dsm ',
        ' cid ',
        ' mli ',
        ' dbq ',
        ' lse ',
        ' rst ',
        ' far ',
        ' gfk ',
        ' bis ',
        ' mot ',
        ' rap ',
        ' fsd ',
        ' lbf ',
        ' gri ',
        ' ear ',
        ' bff ',
        ' cod ',
        ' rks ',
        ' lar ',
        ' she ',
        ' pek ',
        ' hkg ',
        ' tyo ',
        ' icn ',
        ' sin ',
        ' kul ',
        ' bkk ',
        ' mnl ',
        ' dri ',
        ' syd ',
        ' mel ',
        ' bne ',
        ' adl ',
        ' per ',
        ' aki ',
        ' zrh ',
        ' fra ',
        ' cdg ',
        ' ams ',
        ' mad ',
        ' bcn ',
        ' fco ',
        ' mxp ',
        ' vce ',
        ' muc ',
        ' vie ',
        ' prg ',
        ' waw ',
        ' bru ',
        ' cph ',
        ' arn ',
        ' osl ',
        ' hel ',
        ' lis ',
        ' ath ',
        ' ist ',
        ' dxb ',
        ' auh ',
        ' doh ',
        ' ruh ',
        ' jed ',
        ' tlv ',
        ' cai ',
        ' cas ',
        ' tun ',
        ' alg ',
        ' dkr ',
        ' los ',
        ' abv ',
        ' nbo ',
        ' jnb ',
        ' cpt ',
        ' dur ',
        ' lad ',
        ' mba ',
        ' hre ',
        ' lwn ',
        ' mru ',
        ' sez ',
        ' mle ',
        ' tnr ',
        ' rbg ',
        ' gig ',
        ' gru ',
        ' bsb ',
        ' sdu ',
        ' vcp ',
        ' cwb ',
        ' poa ',
        ' rec ',
        ' ssa ',
        ' for ',
        ' mao ',
        ' bel ',
        ' mcj ',
        ' scl ',
        ' bog ',
        ' uio ',
        ' gye ',
        ' lim ',
        ' pty ',
        ' sal ',
        ' gua ',
        ' sap ',
        ' tgu ',
        ' mga ',
        ' sjo ',
        ' lirm ',
        ' kin ',
        ' mbj ',
        ' nas ',
        ' fpo ',
        ' bda ',
        ' sju ',
        ' stt ',
        ' stx ',
        ' sxm ',
        ' anu ',
        ' bgi ',
        ' uvf ',
        ' gnd ',
        ' pos ',
        ' tab ',
        ' cur ',
        ' aua ',
        ' bon ',
        ' pap ',
        ' sdq ',
        ' puj ',
        ' sti ',
        ' pop ',
        ' lrm ',
        ' azs ',
    ];

    return airportKeywords.some((keyword) => {
        if (keyword.startsWith(' ') && keyword.endsWith(' ')) {
            return lowerAddress.includes(keyword);
        }
        return lowerAddress.includes(keyword);
    });
};