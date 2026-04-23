"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/use-booking-store";
import { useFleetsByDistance } from "@/hooks/queries/use-fleet";
import { FleetByDistance } from "@/lib/api/fleets";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "../../skeletons/VehicleCardSkeleton";

function Step2() {
    const router = useRouter();
    const { category, step1, setSelectedVehicle, selectedVehicle } = useBookingStore();
    const [loadingVehicleId, setLoadingVehicleId] = React.useState<string | null>(null);

    const { data: fleets = [], isLoading } = useFleetsByDistance(
        step1?.distanceMiles ?? 0,
        category === "hourly" && step1?.duration ? {
            packageType: step1.duration.packageType,
            duration: step1.duration.duration
        } : undefined,
        { enabled: category === "hourly" ? !!step1?.duration : (step1?.distanceMiles ?? 0) >= 0 }
    );

    const handleContinue = (fleet: FleetByDistance) => {
        if (loadingVehicleId) return;
        setLoadingVehicleId(fleet._id);
        setSelectedVehicle(fleet);
        router.push("/book-ride/passenger-details");
    };

    return (
        <div className="w-full flex flex-col gap-2 md:gap-4">
            {isLoading && fleets.length === 0 && Array.from({ length: 3 }).map((_, index) => (
                <VehicleCardSkeleton key={`fleet-skeleton-${index}`} isExpanded={index === 0} />
            ))}

            {fleets.map((item: FleetByDistance) => {
                return (
                    <VehicleCard
                        key={item._id}
                        fleet={item}
                        isSelected={selectedVehicle?._id === item._id}
                        isLoading={loadingVehicleId === item._id}
                        onSelect={(fleet) => setSelectedVehicle(selectedVehicle?._id === fleet._id ? null : fleet)}
                        onContinue={handleContinue}
                    />
                );
            })}
        </div>
    );
}

export default Step2;