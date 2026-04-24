import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import { ICONS } from "@/constants/icon-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import CitiesSection from "@/components/features/home/cities-section";
import ServiceCTA from "@/components/features/cta/service-cta";

export const metadata = {
    title: `Airport Ride | ${COMPANY_NAME}`,
    description: `Book your airport ride with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const AIRPORT_FEATURES = [
    {
        icon: ICONS.TAG,
        title: "Fixed Taxi Prices",
        description: "Transparent fixed rates with no extra charges, even for delays.",
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: "25+ Years Experience",
        description: "Trusted Schiphol taxi service with a long history of satisfied customers.",
    },
    {
        icon: ICONS.PHONE_CALL,
        title: "Fast Pickup (15 Min)",
        description: "We can arrange a taxi within 15 minutes at Schiphol Airport.",
    },
    {
        icon: ICONS.CLOCK,
        title: "Live Flight Tracking",
        description: "We monitor your flight in real-time to adjust pickup times.",
    },
];

export default function AirportRidePage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.AIRPORT_RIDE_BANNER}
                topText="Airport Ride"
                title="Airport <br /> Ride Service"
                description="Professional, fixed-price airport transfers from and to Schiphol and all destinations across the Netherlands."
            />
            <StorySection
                image={IMAGES.SERVICES.AIRPORT_RIDE.STORY_IMAGE}
                title="AMS Airport Taxi Schiphol – Reliable Amsterdam Airport Transfers"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            Looking for a reliable taxi from Amsterdam Schiphol Airport (AMS)? AMS Airport Taxi offers professional, fixed-price airport transfers from and to Schiphol and all destinations across the Netherlands.
                        </p>
                        <p>
                            With over 25 years of experience, we specialize in door-to-door taxi services, long-distance transfers, and business travel—ensuring you reach your destination safely, comfortably, and on time.
                        </p>
                    </>
                }

            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Why Choose AMS Airport Taxi Amsterdam?"
                description="YOUR TRUSTED PARTNER FOR AIRLINE CREW TRANSPORTATION AT SCHIPHOL AIRPORT AND ACROSS EUROPE."
                items={AIRPORT_FEATURES}
            />
            <StorySection
                image={IMAGES.SERVICES.AIRPORT_RIDE.STORY_IMAGE_2}
                imageSide="right"
                title="Schiphol Airport Taxi Service – 24/7 Transfers"
                description="AMS Airport Taxi is the preferred choice for business meetings, corporate travel, regular customers, VIP clients, and conference transportation. We provide reliable airport-to-airport connections with consistent quality."
                pointsTitle="Our Services Include:"
                points={[
                    "Taxi from Schiphol Airport to any city in the Netherlands",
                    "Schiphol pickup service with 15-minute response",
                    "Immediate dispatch of professional drivers",
                    "Airport-to-airport transfers (Amsterdam, Rotterdam, Eindhoven & more)",
                ]}
                pointsDescription="Whether you book in advance or need a last-minute taxi, we are ready to help."
            />
            <CitiesSection />
            <ServiceCTA
                title="Book Your Schiphol Airport Taxi Today"
                description="Experience reliable, professional, and on-time airport transfers with AMS Airport Taxi. 👉 Book now for fixed-price, 24/7 Schiphol taxi service across the Netherlands. Perfect for travelers who need fast and reliable transport on arrival."
                buttonText="BOOK NOW"
                buttonLink="/"
            />
        </main>
    );
}
