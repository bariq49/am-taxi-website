import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import ServiceAreasGrid from "@/components/features/about/service-areas-grid";
import ServiceCTA from "@/components/features/cta/service-cta";
import { ICONS } from "@/constants/icon-constants";
import FleetSection from "@/components/features/home/fleet-section";
import CitiesSection from "@/components/features/home/cities-section";
import ProcessSection from "@/components/features/home/process-section";

export const metadata = {
    title: `Cargo  Crew Transportation | ${COMPANY_NAME}`,
    description: `Book your cargo  crew transportation with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const CARGO_FEATURES = [
    {
        icon: ICONS.CLOCK,
        title: "24/7 Service",
        description: "We operate day and night to match all flight schedules, including early morning and late-night arrivals.",
    },
    {
        icon: ICONS.GLOBE,
        title: "Long-Distance Specialists",
        description: "We specialize in transfers across the Netherlands and international routes to EU airports and cities.",
    },
    {
        icon: ICONS.USERS,
        title: "Professional Drivers",
        description: "Experienced drivers who know the best routes for fast and efficient travel.",
    },
    {
        icon: ICONS.CAR,
        title: "Comfortable Vehicles",
        description: "Clean and well-maintained vehicles for a smooth and relaxing journey.",
    },
    {
        icon: ICONS.TAG,
        title: "Fixed Pricing",
        description: "Clear pricing for airport and long-distance transfers with no surprises.",
    },
    {
        icon: ICONS.PLANE,
        title: "15-Min Response",
        description: "Fast response for last-minute cargo crew bookings, positioned at Schiphol-Rijk.",
    },
];

const SERVICE_AREAS = [
    {
        title: "Schiphol Airport Transfers",
        points: [
            "AMSTERDAM SCHIPHOL AIRPORT (AMS)",
            "HOTELS NEAR SCHIPHOL",
            "AMSTERDAM CITY CENTER",
            "BUSINESS DISTRICTS SUCH AS ZUIDAS",
        ],
    },
    {
        title: "Netherlands Cities",
        points: [
            "AMSTERDAM",
            "ROTTERDAM",
            "THE HAGUE",
            "UTRECHT",
            "EINDHOVEN",
            "GRONINGEN",
            "MAASTRICHT",
        ],
    },
    {
        title: "European Airports",
        points: [
            "BRUSSELS AIRPORT",
            "DÜSSELDORF AIRPORT",
            "FRANKFURT AIRPORT",
            "PARIS CDG AIRPORT",
            "COLOGNE BONN AIRPORT",
        ],
    },
    {
        title: "Hotel Transfers",
        points: [
            "AIRPORT HOTELS NEAR SCHIPHOL",
            "HOTELS IN AMSTERDAM CENTER",
            "BUSINESS HOTELS IN ZUIDAS",
            "HOTELS ACROSS EUROPE",
        ],
    },
];

export default function CargoCrewTransportationPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CARGO_CREW_TRANSPORTATION_BANNER}
                topText="Cargo & Crew Transportation"
                title="Cargo & Crew <br/>Transportation Service"
                description="Professional 24/7 transportation service for cargo crew at Amsterdam Schiphol Airport. 15-minute response for last-minute bookings."
            />
            <StorySection
                image={IMAGES.SERVICES.CARGO_CREW_TRANSPORTATION.STORY_IMAGE}
                title="Cargo & Crew Transportation Service Amsterdam Schiphol"
                imageSide="left"
                description="AMS Airport Taxi provides reliable and professional transportation services from and to Amsterdam Schiphol Airport, covering the Netherlands and major airports across Europe. We specialize in long-distance transfers, airport connections, and hotel transportation for cargo and business crew. Whether you are moving crew between airports or to the city, we offer safe, comfortable, and punctual transfers."
            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Why Choose AMS Airport Taxi"
                items={CARGO_FEATURES}
            />
            <ServiceAreasGrid
                topText="Our Services"
                title="Premium Service Standard"
                description="WE ARE PROVIDING SERVICE IN MAINLY THESE AREAS."
                items={SERVICE_AREAS}
            />
            <StorySection
                image={IMAGES.SERVICES.CARGO_CREW_TRANSPORTATION.STORY_IMAGE_2}
                imageSide="right"
                title="Last-Minute Crew Transport – 15 Minute Response"
                description="We specialize in last-minute bookings for cargo crew.Thanks to our office location at Schiphol-Rijk and vehicles positioned near the airport,"
                pointsTitle="We Can Handle:"
                points={[
                    "Arrange transportation within 15 minutes",
                    "Handle urgent and unplanned crew movements",
                    "Provide immediate dispatch, even without prior booking"

                ]}
                pointsDescription="This makes us the ideal partner for cargo crew, operations teams, and crew schedulers who need fast and dependable service."
            />
            <ServiceCTA
                title="Book Cargo & Crew Transport"
                description="Reliable 24/7 transportation for cargo and airline crew at Schiphol Airport. Contact us now for immediate dispatch or to schedule a transfer."
                buttonText="BOOK NOW"
                buttonLink="/"
                className="bg-gray-100"
            />
        </main>
    );
}
