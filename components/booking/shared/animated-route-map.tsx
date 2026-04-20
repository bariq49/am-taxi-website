"use client";

import React from "react";
import { Check, Info } from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

const PRIMARY_COLOR = "#008492";

const EMPTY_STOPS: { address: string }[] = [];

function AnimatedRouteMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<google.maps.Map | null>(null);
  const directionsRendererRef = React.useRef<google.maps.DirectionsRenderer | null>(null);
  const animatedMarkerRef = React.useRef<google.maps.Marker | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);

  const category = useBookingStore((state) => state.category);
  const pickupAddress = useBookingStore((state) => state.step1?.pickupAddress ?? "");
  const deliveryAddress = useBookingStore((state) => state.step1?.deliveryAddress ?? "");
  const stops = useBookingStore((state) => state.step1?.stops ?? EMPTY_STOPS);

  const stopWaypoints = React.useMemo(
    () =>
      stops
        .filter((stop) => Boolean(stop.address?.trim()))
        .map((stop) => ({
          location: stop.address.trim(),
          stopover: true,
        })),
    [stops]
  );

  const isValidTrip =
    category === "one-way" &&
    Boolean(pickupAddress.trim()) &&
    Boolean(deliveryAddress.trim());

  React.useEffect(() => {
    let cancelled = false;

    const renderRoute = async () => {
      if (!isValidTrip || !mapRef.current) return;

      await loadGoogleMaps();
      if (cancelled || !window.google?.maps || !mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 11,
        disableDefaultUI: true,
      });
      mapInstanceRef.current = map;

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: false,
        polylineOptions: {
          strokeColor: PRIMARY_COLOR,
          strokeWeight: 5,
          strokeOpacity: 1,
        },
      });
      directionsRenderer.setMap(map);
      directionsRendererRef.current = directionsRenderer;

      directionsService.route(
        {
          origin: pickupAddress,
          destination: deliveryAddress,
          waypoints: stopWaypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status !== "OK" || !result || cancelled) {
            return;
          }

          directionsRenderer.setDirections(result);

          const route = result.routes?.[0];
          if (!route) {
            return;
          }

          const points: google.maps.LatLng[] = [];
          route.legs?.forEach((leg) => {
            leg.steps?.forEach((step) => {
              step.path?.forEach((point) => points.push(point));
            });
          });

          if (points.length === 0 && route.overview_path?.length) {
            route.overview_path.forEach((point) => points.push(point));
          }

          const firstLeg = route.legs?.[0];
          const lastLeg = route.legs?.[route.legs.length - 1];
          if (firstLeg?.start_location) {
            new google.maps.Marker({
              position: firstLeg.start_location,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#000000",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });
          }
          if (lastLeg?.end_location) {
            new google.maps.Marker({
              position: lastLeg.end_location,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: PRIMARY_COLOR,
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });
          }

          if (!points.length) {
            return;
          }

          const carIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="${PRIMARY_COLOR}" stroke="#ffffff" stroke-width="2"/>
        </svg>`;
          const carIconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(carIconSvg)}`;

          animatedMarkerRef.current = new google.maps.Marker({
            position: points[0],
            map,
            icon: {
              url: carIconUrl,
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12),
            },
            zIndex: 1000,
            optimized: false,
          });

          const animationDurationMs = 10000;
          let startedAt = 0;
          let index = 0;
          const lastPointIndex = Math.max(points.length - 1, 1);

          const animate = (time: number) => {
            if (!animatedMarkerRef.current || cancelled) {
              return;
            }
            if (!startedAt) {
              startedAt = time;
            }

            const elapsed = time - startedAt;
            const progress = Math.min(elapsed / animationDurationMs, 1);
            const targetIndex = Math.floor(progress * lastPointIndex);

            if (targetIndex !== index && points[targetIndex]) {
              index = targetIndex;
              animatedMarkerRef.current.setPosition(points[targetIndex]);
            }

            if (progress >= 1) {
              startedAt = time;
              index = 0;
              animatedMarkerRef.current.setPosition(points[0]);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        }
      );
    };

    renderRoute().catch(() => {
      if (cancelled) {
        return;
      }
    });

    return () => {
      cancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (animatedMarkerRef.current) {
        animatedMarkerRef.current.setMap(null);
        animatedMarkerRef.current = null;
      }
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      mapInstanceRef.current = null;
    };
  }, [isValidTrip, pickupAddress, deliveryAddress, stopWaypoints]);

  if (!isValidTrip) {
    return null;
  }

  return (
    <div className="w-full h-[300px] overflow-hidden relative rounded-none border-0 shadow-none lg:rounded-lg lg:border lg:border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-0 w-4/5 left-1/2 -translate-x-1/2 items-center justify-center bg-white rounded-t-lg px-4 py-2 z-10 hidden lg:flex">
        <InfoCircledIcon className="w-5 h-5 text-primary mr-2 shrink-0" />
        <span className="text-base font-semibold">
        Toll not included in the price
        </span>
      </div>
    </div>
  );
}

export default AnimatedRouteMap;
