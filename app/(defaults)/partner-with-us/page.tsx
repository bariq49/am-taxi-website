import React from "react";
import { COMPANY_NAME } from "@/constants/app-default";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";

import PartnerInfoCards from "@/components/features/partner/partner-info-cards";
import PartnerFormSection from "@/components/features/partner/partner-form-section";

export const metadata = {
    title: `Partner With Us | ${COMPANY_NAME}`,
    description: `Partner with ${COMPANY_NAME} and join our growing network of professional drivers. Enjoy flexible working hours, competitive earnings, and access to a wide range of rides.`,
};

export default function PartnerWithUsPage() {
    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CONTACT_BANNER}
                topText="Partner With Us"
                title="Join Our Elite Team"
                description="Become a part of the most professional taxi network in the Netherlands. We offer flexible schedules, competitive earnings, and a steady stream of premium bookings."
            />
            <PartnerInfoCards />
            <PartnerFormSection />
        </main>
    );
}
