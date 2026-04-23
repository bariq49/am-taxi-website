import HeroSection from "@/components/features/home/hero-section";
import Testimonials from "@/components/features/home/testimonial-section";
import DestinationsSection from "@/components/features/home/destinations-section";
import CitiesSection from "@/components/features/home/cities-section";
import FleetSection from "@/components/features/home/fleet-section";
import ProcessSection from "@/components/features/home/process-section";
import WhyChooseUs from "@/components/features/home/why-choose-us";
import CtaNewsletter from "@/components/features/home/cta-newsletter";


export default function Home() {
    return (
        <>
            <HeroSection />
            <Testimonials />
            <DestinationsSection />
            <FleetSection />
            <CitiesSection />
            <ProcessSection />
            <WhyChooseUs />
            <CtaNewsletter />
        </>
    );
}