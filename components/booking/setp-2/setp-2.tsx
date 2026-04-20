"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/use-booking-store";
import { useFleetsByDistance } from "@/hooks/query/use-fleet";
import { FleetByDistance } from "@/lib/api/fleets";
import { parseDurationSelection } from "@/lib/hourly-duration-options";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "./VehicleCardSkeleton";

function Setp2() {
    const router = useRouter();
    const { category, step1, setSelectedVehicle, selectedVehicle } = useBookingStore();
    const [loadingVehicleId, setLoadingVehicleId] = React.useState<string | null>(null);

    const isHourly = category === "hourly";
    const hourlySelection = React.useMemo(
        () => (isHourly ? parseDurationSelection(step1?.duration) : null),
        [isHourly, step1?.duration]
    );

    const distance = isHourly ? (step1?.distanceMiles ?? 0) : step1?.distanceMiles;
    const fleetQueryParams = isHourly && hourlySelection
        ? {
            packageType: hourlySelection.packageType,
            duration: hourlySelection.duration,
        }
        : undefined;

    const shouldFetchFleets = isHourly
        ? Boolean(hourlySelection)
        : typeof distance === "number" && distance >= 0;

    const {
        data: fleets = [],
        isLoading: isFleetsLoading,
        isFetching: isFleetsFetching,
    } = useFleetsByDistance(distance ?? 0, fleetQueryParams);
    const showFleetSkeletons = shouldFetchFleets && (isFleetsLoading || isFleetsFetching) && fleets.length === 0;

    // Default first vehicle for sidebar pricing + “selected” UI before user taps Select
    React.useEffect(() => {
        if (!shouldFetchFleets || fleets.length === 0) return;

        const first = fleets[0];
        if (!selectedVehicle) {
            setSelectedVehicle(first);
            return;
        }
        const stillListed = fleets.some((f : FleetByDistance) => f._id === selectedVehicle._id);
        if (!stillListed) {
            setSelectedVehicle(first);
        }
    }, [fleets, shouldFetchFleets, isFleetsLoading, selectedVehicle, setSelectedVehicle]);

    const handleSelectVehicle = (fleet: FleetByDistance) => {
        if (loadingVehicleId) return;
        setLoadingVehicleId(fleet._id);
        setSelectedVehicle(fleet);
        router.push("/book-ride/passenger-details");
    };

    return (
        <div className="w-full flex flex-col gap-2 md:gap-4">
            {showFleetSkeletons && Array.from({ length: 3 }).map((_, index) => (
                <VehicleCardSkeleton key={`fleet-skeleton-${index}`} />
            ))}

            {fleets.map((item : FleetByDistance) => {
                return (
                    <VehicleCard
                        key={item._id}
                        fleet={item}
                        isSelected={selectedVehicle?._id === item._id}
                        isLoading={loadingVehicleId === item._id}
                        onSelect={handleSelectVehicle}
                    />
                );
            })}

        </div>
    );
}

export default Setp2;