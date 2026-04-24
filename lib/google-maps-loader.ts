"use client";

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-js-api";
let googleMapsPromise: Promise<void> | null = null;

declare global {
  interface Window {
    __dslGoogleMapsInit?: () => void;
  }
}

export function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript =
      (document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null) ||
      (document.querySelector(
        'script[src*="maps.googleapis.com/maps/api/js"]'
      ) as HTMLScriptElement | null);
    if (existingScript) {
      if (window.google?.maps) {
        resolve();
        return;
      }
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps.")), {
        once: true,
      });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error("Google Maps API key is missing."));
      return;
    }

    const callbackName = "__dslGoogleMapsInit";
    window.__dslGoogleMapsInit = () => {
      resolve();
      delete window.__dslGoogleMapsInit;
    };

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps."));
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=${callbackName}`;
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}
