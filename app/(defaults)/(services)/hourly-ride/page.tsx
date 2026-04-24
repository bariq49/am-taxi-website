import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import ServiceCTA from "@/components/features/cta/service-cta";
import { ICONS } from "@/constants/icon-constants";
import FleetSection from "@/components/features/home/fleet-section";
import CitiesSection from "@/components/features/home/cities-section";
import ProcessSection from "@/components/features/home/process-section";

export const metadata = {
    title: `Hourly Rides | ${COMPANY_NAME}`,
    description: `Book your hourly ride with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const HOURLY_FEATURES = [
    {
        icon: ICONS.TAG,
        title: "Driver on Standby",
        description: "Your chauffeur stays with you throughout your booked time.",
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: "Unlimited Stops",
        description: "Travel anywhere within your booked time with multiple stops.",
    },
    {
        icon: ICONS.TAG,
        title: "Fixed Hourly Rates",
        description: "No hidden fees or unexpected charges.",
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: "Professional Drivers",
        description: "Experienced & courteous chauffeurs for your comfort.",
    },
];

export default function HourlyRidePage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.HOURLY_RIDES_BANNER}
                topText="Hourly Rides"
                title="Hourly Ride Service"
                description="Flexible & Reliable Hourly Chauffeur Service. Premium cars by the hour for business trips, city tours & events."
            />
            <StorySection
                image={IMAGES.SERVICES.HOURLY_RIDES.STORY_IMAGE}
                title="Hourly Taxi Service in Amsterdam"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            Looking for a flexible and reliable hourly taxi service in Amsterdam? AMS Airport Taxi offers
                            premium chauffeur-driven cars by the hour, perfect for business trips, city tours, airport
                            transfers, and special events.
                        </p>
                        <p>
                            With our hourly service, you get a private driver at your disposal, allowing you to travel
                            comfortably without booking multiple rides.
                        </p>
                    </>
                }

            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Why Choose Our Hourly Taxi Service?"
                description="WE DON'T JUST DO TAXI SERVICE; WE DELIVER A SEAMLESS DRIVING EXPERIENCE BACKED BY WORLD-CLASS SUPPORT AND MAINTENANCE."
                items={HOURLY_FEATURES}
            />
            <ProcessSection />
            <FleetSection />
            <CitiesSection />
            <ServiceCTA
                title="Book Your Hourly Taxi Today"
                description="Call us now or book online to reserve your hourly chauffeur service."
                buttonText="BOOK NOW"
                buttonLink="/"
            />
        </main>
    );
}
