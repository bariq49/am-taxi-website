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
    title: `Private Jet Transfer | ${COMPANY_NAME}`,
    description: `Book your private jet transfer with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const PRIVATE_JET_TRANSFER_FEATURES = [
    {
        icon: ICONS.PLANE,
        title: "Private Jet Experience",
        description: "We understand the needs of private aviation clients. Timing, discretion, and service quality matter. Our drivers arrive on time and monitor flight schedules when needed.",
    },
    {
        icon: ICONS.MAP_PIN,
        title: "Direct Schiphol-Oost Pickup",
        description: "We provide service to and from the Schiphol-Oost private aviation area with professional coordination and direct vehicle access.",
    },
    {
        icon: ICONS.USERS,
        title: "Professional Service",
        description: "Our service is suitable for CEOs, executives, diplomats, business travelers, and premium clients who expect clean vehicles and professional drivers.",
    },
    {
        icon: ICONS.CLOCK,
        title: "24/7 Availability",
        description: "Private jet schedules can change at any time. AMS Airport Taxi is available day and night for airport transfers and executive travel.",
    },
    {
        icon: ICONS.TAG,
        title: "Fixed Rates Available",
        description: "We offer clear pricing for airport transfers so clients know what to expect. Transparent and professional pricing.",
    },
    {
        icon: ICONS.CHECK_CIRCLE,
        title: "15-Min Response",
        description: "Last-minute crew transport available. Thanks to our Schiphol-Rijk location, we can arrange transportation within 15 minutes.",
    },
];

export default function PrivateJetTransferPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.PRIVATE_JET_TRANSFER_BANNER}
                topText="Private Jet Transfer"
                title="Private Jet Transfer Service"
                description="Professional transportation for private aviation clients. Exclusive service to and from Schiphol-Oost and various private jet facilities."
            />
            <StorySection
                image={IMAGES.SERVICES.PRIVATE_JET_TRANSFER.STORY_IMAGE}
                title="Executive Taxi Service for Schiphol-Oost"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            AMS Airport Taxi provides professional private jet transfer service at Amsterdam Schiphol Airport, including pickups and drop-offs at Schiphol-Oost, the General Aviation Terminal, and private jet facilities near the airport.
                        </p>
                        <p className="mb-4">
                            We serve business travelers, VIP guests, flight crews, and private aviation clients who need reliable ground transportation with comfort, privacy, and punctuality.
                        </p>
                        <p>
                            Our drivers understand the private aviation process at Schiphol and know how to handle time-sensitive arrivals and departures.
                        </p>

                    </>
                }

            />
            <FeaturesGrid
                topText="Why Choose Us"
                title="Why Choose AMS Airport Taxi"
                items={PRIVATE_JET_TRANSFER_FEATURES}
            />
            <StorySection
                image={IMAGES.SERVICES.PRIVATE_JET_TRANSFER.STORY_IMAGE_2}
                imageSide="right"
                title="Private Jet Transfer Destinations"
                description="With AMS Airport Taxi, you can travel between cities with comfort and clear pricing."
                pointsTitle="We provide private jet taxi transfers from Amsterdam Schiphol to many destinations:"
                points={[
                    "Amsterdam city center",
                    "Amsterdam hotels",
                    "Zuidas business district",
                    "Rotterdam",
                    "The Hague",
                    "Utrecht",
                    "Eindhoven",
                    "Antwerp",
                    "Other EU destinations"

                ]}
            />
            <StorySection
                image={IMAGES.SERVICES.PRIVATE_JET_TRANSFER.STORY_IMAGE_3}
                title="Schiphol Private Jet Pickup and Drop-Off"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            If you are flying from or arriving at the private jet center in Amsterdam Schiphol, AMS Airport Taxi can arrangedirect transportation with professional coordination. We aim to make every pickup and drop-off fast, easy, and
                            stress-free.
                        </p>
                        <p className="mb-4">
                            For arriving passengers, your driver can be ready at the agreed meeting point near the private aviation terminal.
                            For departing passengers, we ensure timely arrival so your journey starts without delay.
                        </p>

                    </>
                }

            />
            <ServiceCTA
                title="Book Your Private Jet Transfer"
                description="Experience premium, punctual, and discreet transportation for your private jet travel. Book now for executive service at Schiphol-Oost."
                buttonText="BOOK NOW"
                buttonLink="/"
                className="bg-gray-100"
            />
        </main>
    );
}
