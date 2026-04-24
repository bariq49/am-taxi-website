import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import ServiceCTA from "@/components/features/cta/service-cta";
import { ICONS } from "@/constants/icon-constants";
import FleetSection from "@/components/features/home/fleet-section";

export const metadata = {
    title: `Airline Crew | ${COMPANY_NAME}`,
    description: `Book your airline crew ride with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const CREW_FEATURES = [
    {
        icon: ICONS.CALENDAR,
        title: "24/7 Availability",
        description: "Available for all flight schedules, day and night. We're always ready when you need us.",
    },
    {
        icon: ICONS.CAR,
        title: "15-Minute Rapid Dispatch",
        description: "Located at Schiphol-Rijk for immediate service. Rapid response to last-minute bookings.",
    },
    {
        icon: ICONS.SHIELD,
        title: "Punctual & Reliable",
        description: "On-time pickups guaranteed. Our experienced drivers understand tight crew schedules.",
    },
    {
        icon: ICONS.TAG,
        title: "Fixed Transparent Pricing",
        description: "Know your costs upfront with our fixed and transparent pricing structure.",
    },
];

export default function AirlineCrewPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.AIRLINE_CREW_BANNER}
                topText="Airline Crew"
                title="Airport <br /> Ride Service"
                description="Professional ground transportation for airline & cabin crew from and to Amsterdam Schiphol Airport."
            />
            <StorySection
                image={IMAGES.SERVICES.AIRLINE_CREW.STORY_IMAGE}
                title="Crew Airport Transfers"
                description="AMS Airport Taxi provides reliable, fixed-price airport transfers for airline and cabin crew to and from Schiphol Airport (AMS). We understand the importance of punctuality and comfort for airline staff, ensuring you reach your destination on time, every time."
                pointsTitle="We provide direct transportation for airline staff between:"
                points={[
                    "Schiphol Airport (AMS)",
                    "Crew hotels near Schiphol",
                    "Amsterdam city center",
                    "Other airports in the Netherlands and Europe"
                ]}
                pointsDescription="Our service ensures on-time pickups and efficient transfers, even with tight schedules."


            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Why Choose AMS Airport Taxi?"
                description="YOUR TRUSTED PARTNER FOR AIRLINE CREW TRANSPORTATION AT SCHIPHOL AIRPORT AND ACROSS EUROPE."
                items={CREW_FEATURES}
            />
            <FleetSection />
            <StorySection
                image={IMAGES.SERVICES.AIRLINE_CREW.STORY_IMAGE_2}
                imageSide="right"
                title="Last-Minute Crew Transport"
                description="We specialize in last-minute bookings for airline crew.Thanks to our office location at Schiphol-Rijk and vehicles positioned near the airport, we can:"
                points={[
                    "Arrange transportation within 15 minutes",
                    "Handle urgent and unplanned crew movements",
                    "Provide immediate dispatch, even without prior booking"
                ]}
                pointsDescription="This makes us the ideal partner for airline operations teams and crew schedulers who need fast and dependable service."
            />
            <ServiceCTA
                title="Book Airline Crew Transport"
                description="AMS Airport Taxi is your trusted partner for airline crew and cabin crew transportation at Schiphol Airport and across Europe. Contact us now for immediate service."
                buttonText="BOOK NOW"
                buttonLink="/"
                className="bg-gray-100"
            />
        </main>
    );
}
