import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import FleetStatsSection from "@/components/features/fleet/fleet-stats-section";
import FleetListSection from "@/components/features/fleet/fleet-list-section";

export const metadata = {
    title: `Fleets | ${COMPANY_NAME}`,
    description: `Discover our premium fleet of vehicles, perfect for any occasion. From luxury sedans to spacious SUVs, we have the perfect ride for your journey.`,
};

export default function FleetsPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.FLEETS_BANNER}
                topText="The Collection"
                title="Experience the Art  <br />of Automotive Excellence"
                description="Discover a curated selection of the world's most prestigious vehicles.Designed for those who appreciate performance, luxury, and the journey itself."
            />
            <FleetStatsSection />
            <FleetListSection />
        </main>
    );
}
