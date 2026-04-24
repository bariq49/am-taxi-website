import FleetSection from "@/components/features/home/fleet-section";
import CitiesSection from "@/components/features/home/cities-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import ServiceCTA from "@/components/features/cta/service-cta";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import { COMPANY_NAME } from "@/constants/app-default";
import { ICONS } from "@/constants/icon-constants";
import StorySection from "@/components/features/about/story-section";

export const metadata = {
    title: `Amsterdam Airport Schiphol | ${COMPANY_NAME}`,
    description: `Book your airport transfer with ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const SCHIPHOL_FEATURES = [
    {
        icon: ICONS.SEARCH,
        title: "Meticulously Maintained",
        description: "Every vehicle undergoes a rigorous 150-point inspection before every rental.",
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: "Comprehensive Insurance",
        description: "Drive with peace of mind knowing you're covered with our premium insurance packages.",
    },
    {
        icon: ICONS.PHONE_CALL,
        title: "24/7 Roadside Support",
        description: "Our dedicated support team is just a call away, anytime, anywhere.",
    },
    {
        icon: ICONS.CALENDAR,
        title: "Free Cancellation",
        description: "Plans change. Cancel up to 24 hours before your trip for a full refund.",
    },
];

export default function AmsterdamSchipholAirportPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.AMSTERDAM_SCHIPHOL_AIRPORT_BANNER}
                topText="Amsterdam Schiphol Airport"
                title="Amsterdam Schiphol <br /> Airport"
                description="Premium airport taxi service with professional drivers and luxury vehicles. Book your transfer today."
            />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                            About AMS
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                            Amsterdam Airport Schiphol is the main international airport of the Netherlands and one of the busiest airports in Europe. Located 9 kilometers southwest of Amsterdam, it serves as a major hub for European and intercontinental flights.
                            Travel comfortably with our reliable taxi service to and from Amsterdam&apos;s main international airport. Whether you&apos;re arriving for business, leisure, or a quick stopover, we provide punctual pickups, professional chauffeurs, and clean, modern vehicles to ensure a smooth journey from the moment you land.
                        </p>
                    </div>
                </div>
            </section>
            <FeaturesGrid
                items={SCHIPHOL_FEATURES}
                className="bg-white"
            />
            <StorySection
                image={IMAGES.SERVICES.AIRPORTS.AMSTERDAM_SCHIPHOL_AIRPORT.STORY_IMAGE}
                title="Schiphol Airport (AMS) Transfers in Amsterdam"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            Enjoy a smooth and dependable airport transfer service to and from Amsterdam Airport Schiphol (AMS) or the nearby heliport. Located about 18 km southwest of the city center, Schiphol handles tens of millions of passengers each year, making arrivals and departures busy and sometimes stressful. Choosing a premium pre-booked car service offers a comfortable and convenient alternative to standard taxis.
                        </p>
                        <p>
                            Our pricing is fully transparent, with all taxes and fees included upfront, so you know exactly what you’ll pay before confirming your booking. Simply provide your flight number, and your driver will monitor your arrival time and adjust pickup accordingly if there are any delays. Whether you need transportation to or from the airport or travel within the city during your stay, our professional service ensures a reliable and comfortable journey every time.
                        </p>
                    </>
                }

            />
            <StorySection
                image={IMAGES.SERVICES.AIRPORTS.AMSTERDAM_SCHIPHOL_AIRPORT.STORY_IMAGE_2}
                title="Transfers from Amsterdam Airport Schiphol (AMS) and Heliport (EHHA)"
                imageSide="right"
                description={
                    <>
                        <p className="mb-4">
                            Our priority is to provide a calm and hassle-free airport transfer experience in Amsterdam. Every driver is professional, dependable, and familiar with the local area, ensuring smooth and efficient journeys. Upon arrival at Schiphol Airport, your chauffeur will meet you at the agreed pickup point, assist with your luggage, and take you safely and promptly to your destination.
                        </p>
                        <p>
                            You can select from a range of vehicles to suit your needs, including business-class sedans, premium first-class options for extra comfort, or spacious business vans ideal for small groups. Each vehicle is maintained to deliver a high level of comfort throughout your trip. In addition to city transfers, we also offer direct transportation from the airport to other destinations across the Netherlands, including Rotterdam and Eindhoven.
                        </p>
                    </>
                }

            />
            <StorySection
                image={IMAGES.SERVICES.AIRPORTS.AMSTERDAM_SCHIPHOL_AIRPORT.STORY_IMAGE_3}
                title="Transfers from Amsterdam Airport Schiphol to the City"
                imageSide="left"
                description={
                    <>
                        <p className="mb-4">
                            Booking your airport transfer is quick and straightforward, taking only a minute to complete. Simply enter your pickup location, destination, and preferred vehicle type to get started. Once you review the fare and confirm your payment details, your reservation is finalized, and you’ll receive a confirmation shortly after.
                        </p>
                        <p>
                            With clear, upfront pricing and no hidden charges, you’ll know the exact cost of your journey before you travel—making it especially convenient for business and frequent travelers. In addition to airport pickups, our chauffeur service is available throughout your stay, whether you need point-to-point transfers or flexible hourly bookings around Amsterdam.
                        </p>
                    </>
                }

            />
            <FleetSection />
            <ServiceCTA
                title="Book Your Schiphol Taxi"
                description="Reliable 24/7 airport transfers to and from Amsterdam Schiphol. Book now for fixed prices and professional service."
                buttonText="BOOK NOW"
                buttonLink="/"
            />
        </main>
    );
}
