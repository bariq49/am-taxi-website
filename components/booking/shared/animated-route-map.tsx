"use client";

import React from "react";
import { Check, Info, MapPin, Clock } from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

const PRIMARY_COLOR = "#FFD700"; // Vibrant yellow from image

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

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

  const estDistance = useBookingStore((state) =>
    state.step1?.distanceMiles ? `${state.step1.distanceMiles.toFixed(1)} mi` : null
  );

  const estTime = useBookingStore((state) => {
    if (state.step1?.duration?.trim()) return state.step1.duration.trim();
    if (typeof state.step1?.durationMinutes === "number") {
      const hrs = Math.floor(state.step1.durationMinutes / 60);
      const mins = state.step1.durationMinutes % 60;
      return hrs > 0 ? `${hrs} h ${mins} mins` : `${mins} mins`;
    }
    return null;
  });

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
        styles: MAP_STYLES,
      });
      mapInstanceRef.current = map;

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: PRIMARY_COLOR,
          strokeWeight: 6,
          strokeOpacity: 0.9,
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

          if (result.routes[0]?.bounds) {
            map.fitBounds(result.routes[0].bounds, 120); // Increased padding to zoom out further
          }

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

          const markerIcon = (label: string) => ({
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill="#111827"/>
                <text x="16" y="22" font-family="Arial" font-size="16" font-weight="bold" fill="white" text-anchor="middle">${label}</text>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(24, 32),
            anchor: new google.maps.Point(12, 32),
          });

          if (firstLeg?.start_location) {
            new google.maps.Marker({
              position: firstLeg.start_location,
              map,
              icon: markerIcon("A"),
            });
          }
          if (lastLeg?.end_location) {
            new google.maps.Marker({
              position: lastLeg.end_location,
              map,
              icon: markerIcon("B"),
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
    <div className="w-full h-[400px] sm:h-[500px] overflow-hidden relative rounded-none border-0 shadow-none lg:rounded-lg lg:border lg:border-gray group">
      <div ref={mapRef} className="w-full h-full" />

      {/* Bottom Stats Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-2 flex items-center gap-6 z-10 transition-all">
        <div className="flex items-center gap-1.5 min-w-max">
          <MapPin size={14} className="text-[#9CA3AF]" />
          <span className="text-[11px] sm:text-xs font-semibold text-secondary">
            {estDistance || "0.0 mi"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 min-w-max">
          <Clock size={14} className="text-[#9CA3AF]" />
          <span className="text-[11px] sm:text-xs font-semibold text-secondary">
            {estTime || "0 mins"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnimatedRouteMap;
