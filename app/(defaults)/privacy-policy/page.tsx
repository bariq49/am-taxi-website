import React from "react";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { Shield, Lock, Eye, FileText, Mail, Info, RefreshCcw, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: `Privacy Policy | ${COMPANY_NAME}`,
  description: `Professional privacy documentation for ${COMPANY_NAME} users and partners.`,
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner
        image={IMAGES.ABOUT_BANNER}
        topText="Documentation"
        title="Privacy Policy"
        description="Comprehensive guide on how we collect, use, and safeguard your personal information."
      />

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left Column: Navigation/Summary (Industrial Sidebar) */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sticky top-32 space-y-10">
                <div className="border-l-4 border-secondary pl-6">
                  <span className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-2 block">Policy Overview</span>
                  <h2 className="text-2xl font-extrabold text-primary">Data Security Protocol</h2>
                  <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                    AMS Airport Taxi Services monitors all data processing to ensure compliance with Dutch and EU privacy standards.
                  </p>
                </div>

                <div className="p-8 bg-primary rounded-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/20 transition-all duration-500" />
                  <div className="relative z-10">
                    <RefreshCcw className="w-8 h-8 text-secondary mb-6 group-hover:rotate-180 transition-transform duration-700" />
                    <p className="text-lg font-medium leading-relaxed mb-6">
                      By using our services, you agree to our privacy practices as outlined here.
                    </p>
                    <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider">
                      Last Updated: April 25, 2026
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Quick Support</h3>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-secondary hover:bg-secondary/5 transition-all group"
                  >
                    <span className="font-bold text-primary group-hover:text-secondary transition-colors underline decoration-secondary/30">Contact DPO</span>
                    <Mail className="w-5 h-5 text-gray-300 group-hover:text-secondary transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Policy */}
            <div className="lg:col-span-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-1">Privacy Policy Overview</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">Data protection standards and compliance.</span>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.15em]">Last Updated: April 25, 2026</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-12">
                <div className="max-w-none">
                  <h3 className="text-xl font-bold text-primary mb-4 tracking-tight">Introduction & Scope</h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    <strong>Ams Airport Taxi Services</strong> respects its users&apos; privacy and recognizes the need to protect any personal information you share with us via our website{" "}
                    <Link href="/" className="text-secondary hover:underline font-semibold transition-colors">
                      Amsairporttaxi.com
                    </Link>.
                    We follow industry-standard practices to protect your privacy across our entire digital infrastructure.
                  </p>

                  <div className="text-sm text-gray-500 leading-relaxed mb-8 italic border-l-2 border-gray-100 pl-4 py-1">
                    This Privacy Policy applies to your use of our website Amsairporttaxi.com and our services booked through our platform.
                  </div>
                </div>

                <div className="p-6 bg-primary rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-secondary/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <p className="text-white text-sm font-medium leading-relaxed m-0 opacity-90">
                        By using our services, you agree to the terms of this privacy policy. Please review the following documentation carefully to understand our data handling practices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-16 mt-12">
                  <Section
                    number="01"
                    title="User Identification"
                    content="We collect your name, mobile number, password and email address while registering you as a user. These details are required to identify you as a unique user in order to provide you our services."
                    icon={<FileText className="w-5 h-5 text-secondary" />}
                  />

                  <Section
                    number="02"
                    title="Transaction Security"
                    content="All online payments are handled via a secure connection on a secure page of Mollie. We collect payment details only for booking requests and do not save this information on our internal servers."
                    icon={<Lock className="w-5 h-5 text-secondary" />}
                  />

                  <Section
                    number="03"
                    title="Logistics & Location Data"
                    content="We collect travel details like current location, travel time, source address and destination location for booking requests. Users can choose to save favorite addresses for a more convenient booking experience."
                    icon={<Info className="w-5 h-5 text-secondary" />}
                  />

                  <Section
                    number="04"
                    title="Travel History Tracking"
                    content="Our system saves addresses from recent travels to allow instant booking for frequent routes. This enhances the user experience for our regular commuters."
                    icon={<Eye className="w-5 h-5 text-secondary" />}
                  />

                  <Section
                    number="05"
                    title="Service Optimization"
                    content="We collect feedback, ratings, mobile OS types, and device IDs to improve our service offerings and send relevant push notifications."
                    icon={<Shield className="w-5 h-5 text-secondary" />}
                  />
                </div>

                {/* Utilization Block */}
                <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-primary mb-4">Information Utilization</h3>
                  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>
                      We require the information to identify you as a user, improve our services and provide better service to our users. Except for payment details, we keep this information for internal record keeping purposes only to serve you again in the future.
                    </p>
                    <p>
                      Contact details are used for trip-related updates, service notifications, and occasional promotional information relative to new offerings or special deals.
                    </p>
                  </div>
                </div>

                {/* Data Protection Commitment */}
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-primary mb-4 tracking-tight">Security Assurance</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    We have implemented advanced technology features and strict policy guidelines to safeguard the privacy of your personally identifiable information from unauthorized access and improper use.
                  </p>
                  <div className="text-primary font-bold mt-8 flex items-center gap-3 text-sm">
                    <div className="w-8 h-[1px] bg-secondary" />
                    <span className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary" />
                      We do not sell or rent any personal information to any third parties.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold text-primary mb-6">Questions about this policy?</h4>
          <p className="text-gray-500 mb-10 text-base leading-relaxed">
            If you believe any information we hold is incorrect or incomplete, let us know immediately. We will promptly correct any details found to be inaccurate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Email Support
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ number, title, content, icon }: { number: string, title: string, content: string, icon: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="flex items-start gap-8">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-secondary/10 transition-colors duration-500">
          {icon}
        </div>
        <div className="flex-1 border-b border-gray-100 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">{title}</h4>
            <span className="text-sm font-black text-gray-100 group-hover:text-secondary/20 transition-all text-[32px] leading-none select-none">{number}</span>
          </div>
          <p className="text-base text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
