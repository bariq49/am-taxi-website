import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonial-section";
import DestinationsSection from "@/components/destinations-section";
import CitiesSection from "@/components/cities-section";
import FleetSection from "@/components/fleet-section";
import ProcessSection from "@/components/process-section";
import WhyChooseUs from "@/components/why-choose-us";
import CtaNewsletter from "@/components/cta-newsletter";


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