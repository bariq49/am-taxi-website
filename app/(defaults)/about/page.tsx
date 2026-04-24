import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import FeaturesStats from "@/components/features/about/features-stats";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid from "@/components/features/about/features-grid";
import RecruitmentCTA from "@/components/features/cta/recruitment-cta";

export const metadata = {
  title: `About Us | ${COMPANY_NAME}`,
  description: `Learn more about ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Banner
        image={IMAGES.ABOUT_BANNER}
        topText="Who We Are"
        title="About <br /> AMS Airport Taxi"
        description="Leading specialist in airport transportation in the Netherlands, based directly at Amsterdam Schiphol Airport."
      />
      <FeaturesStats />
      <StorySection
        image={IMAGES.ABOUT_US.STORY_IMAGE}
        badgeText="Focused on Excellence"
        topText="Our Mission"
        title="About AMS Airport Taxi B.V."
        description="AMS Airport Taxi B.V. is a leading specialist in airport transportation in the Netherlands, providing premium taxi and limousine services to and from Amsterdam Schiphol Airport (AMS). Based directly at Schiphol, we are a dedicated ground transportation team, not a intermediary platform. Unlike many online transportation companies, we do not rely on freelancers, third-party drivers, or external taxi companies. Our operations are fully controlled in-house, ensuring consistent quality, reliability, and professionalism for every ride."
        stats={[
          { value: "100%", label: "Satisfaction Goal" },
          { value: "0%", label: "Hidden Fees" },
        ]}
      />
      <FeaturesGrid
        topText="Why Choose Us"
        title="What Sets Us Apart"
        description="Whether you need a transfer from Schiphol to Amsterdam city, a business ride across the Netherlands, or a luxury limousine service, AMS Airport Taxi B.V. delivers high-end, dependable, and efficient transportation every time."
      />

      <StorySection
        image={IMAGES.ABOUT_US.STORY_IMAGE_2}
        imageSide="right"
        title="Local Experts at Amsterdam Schiphol Airport"
        description="Our office is located at Amsterdam Schiphol Airport, giving us a unique advantage. Our professional drivers and luxury vehicles are stationed and ready on-site, allowing us to respond immediately to your transportation needs. Many competitors operate remotely or outsource services, meaning they often lack control over drivers and timing. At AMS Airport Taxi B.V., we eliminate that risk by managing everything ourselves. Whether your plans change unexpectedly or you need urgent transportation, we guarantee:"
        points={[
          "Taxi or limousine arranged within 15 minutes",
          "Immediate dispatch from Schiphol Airport",
          "Reliable service 24/7",
        ]}
      />

      <RecruitmentCTA
        image={IMAGES.CTA_IMAGE}
        title="Drive With Us Today"
        description="Experience the thrill of the open road with our premium fleet. From luxury sedans to powerful SUVs, we have the perfect vehicle for your journey."
      />
    </main>
  );
}
