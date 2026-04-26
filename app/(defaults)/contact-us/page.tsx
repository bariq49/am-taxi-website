import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";

import ContactInfoCards from "@/components/features/contact/contact-info-cards";
import ContactFormSection from "@/components/features/contact/contact-form-section";
import ContactFAQSection from "@/components/features/contact/contact-faq-section";
import RecruitmentCTA from "@/components/features/cta/recruitment-cta";

export const metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
  description: `Get in touch with ${COMPANY_NAME} for any inquiries, bookings, or support. We are available 24/7 to assist you.`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Banner
        image={IMAGES.CONTACT_BANNER}
        topText="Get in Touch"
        title="We're  <br />Here  To Help You"
        description="Whether you have a question about our fleet, need assistance with a booking, or want to discuss a corporate partnership, our concierge team is ready to assist."
      />
      <ContactInfoCards />
      <ContactFormSection />
      <ContactFAQSection />
      <RecruitmentCTA
        image={IMAGES.CTA_IMAGE}
        title="Drive With Us Today"
        description="Experience the thrill of the open road with our premium fleet. From luxury sedans to powerful SUVs, we have the perfect vehicle for your journey."
      />
    </main>
  );
}
