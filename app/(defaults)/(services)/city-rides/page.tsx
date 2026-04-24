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

export const metadata = {
    title: `City Rides | ${COMPANY_NAME}`,
    description: `Book your city ride with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const CITY_FEATURES = [
    {
        icon: ICONS.TAG,
        title: "Fixed Prices – No Surprises",
        description: "You always know the full cost before your ride begins. No unexpected charges.",
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: "Better Than Meter-Based Fares",
        description: "Avoid fluctuating taxi meters and enjoy consistent, transparent pricing.",
    },
    {
        icon: ICONS.PHONE_CALL,
        title: "Private & Comfortable",
        description: "Exclusive rides designed for your comfort and convenience. No sharing required.",
    },
    {
        icon: ICONS.CALENDAR,
        title: "Always On Time",
        description: "Punctual service you can rely on, every time. Available 24/7 across Amsterdam.",
    },
];

const INTERNATIONAL_RIDES = [
    {
        icon: ICONS.MAP_PIN,
        title: "International Destinations",
        points: ["Amsterdam → Brussels"],
    },
    {
        icon: ICONS.MAP_PIN,
        title: "International Destinations",
        points: ["Amsterdam → Antwerp"],
    },
    {
        icon: ICONS.MAP_PIN,
        title: "International Destinations",
        points: ["Amsterdam → Düsseldorf"],
    },
    {
        icon: ICONS.MAP_PIN,
        title: "International Destinations",
        points: ["Amsterdam → Cologne"],
    },
];

export default function CityRidesPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CITY_RIDES_BANNER}
                topText="City Rides"
                title="City Ride Service"
                description="Fixed Prices • Better Than Meter Rates • No Surprises. Professional private taxi service in Amsterdam."
            />
            <StorySection
                image={IMAGES.SERVICES.CITY_RIDES.STORY_IMAGE}
                title="Private City Rides in Amsterdam"
                description="Whether you're exploring Amsterdam's famous canals, visiting museums, attending business meetings, or enjoying the vibrant nightlife, AMS Airport Taxi ensures comfortable and reliable transportation. Our professional drivers know the city inside out, guaranteeing efficient routes and timely arrivals."
                pointsTitle="Travel anywhere in Amsterdam with AMS Airport Taxi, your trusted partner for private city transportation:"
                points={[
                    "Fixed prices agreed upfront",
                    "Better value compared to standard meter taxis",
                    "No hidden costs or unexpected charges",
                    "100% private rides – no sharing",
                    "Fast pickup anywhere in Amsterdam",

                ]}
                pointsDescription="Whether you're heading to a meeting, hotel, or event, we provide a smooth and comfortable ride every time."


            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Premium Service Standard"
                description="WE DON'T JUST DO TAXI SERVICE; WE DELIVER A SEAMLESS DRIVING EXPERIENCE BACKED BY WORLD-CLASS SUPPORT AND MAINTENANCE."
                items={CITY_FEATURES}
            />
            <FleetSection />
            <StorySection
                image={IMAGES.SERVICES.CITY_RIDES.STORY_IMAGE_2}
                imageSide="right"
                title="Intercity Taxi Across the Netherland"
                description="With AMS Airport Taxi, you can travel between cities with comfort and clear pricing."
                pointsTitle="Popular Routes:"
                points={[
                    "Amsterdam ↔ Rotterdam",
                    "Amsterdam ↔ The Hague (Den Haag)",
                    "Amsterdam ↔ Utrecht",
                    "Amsterdam ↔ Eindhoven",
                    "Amsterdam ↔ Groningen / Maastricht",

                ]}
            />
            <ServiceAreasGrid
                topText="INTERNATIONAL TRAVEL"
                title="Long-Distance Private Rides"
                description="Planning a longer journey? We provide smooth and private long-distance transportation."
                items={INTERNATIONAL_RIDES}
            />
            <ServiceCTA
                title="Book Your Ride Now"
                description="Book your ride for Daily city travel, Business transportation, Events & meetings, Leisure trips, Intercity travel Fixed fare. Professional service. No surprises."
                buttonText="BOOK NOW"
                buttonLink="/"
                className="bg-gray-100"
            />
        </main>
    );
}
