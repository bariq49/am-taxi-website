import React from "react";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { AlertTriangle, ExternalLink, Info, ShieldAlert, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: `Disclaimer | ${COMPANY_NAME}`,
  description: `Legal disclaimer and service notice for users of ${COMPANY_NAME}.`,
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner
        image={IMAGES.ABOUT_BANNER}
        topText="Service Notice"
        title="Website Disclaimer"
        description="Legal information regarding the use of our website and external resources."
      />

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Sidebar Summary */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sticky top-32 space-y-10">
                <div className="border-l-4 border-secondary pl-6">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2 block">Important Notice</span>
                  <h2 className="text-2xl font-extrabold text-primary">Limited Liability</h2>
                  <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                    This disclaimer regulates the legal limitations of the information provided on our digital platforms.
                  </p>
                </div>

                <div className="p-8 bg-gray-100 rounded-3xl border border-gray-200 flex flex-col items-center text-center shadow-sm">
                    <ShieldAlert className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="font-bold text-primary mb-2">Verified Content</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        While we strive for accuracy, users should verify critical information before reliance.
                    </p>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-8">
              <div className="max-w-none space-y-12">
                
                <div>
                   <h3 className="text-2xl font-bold text-primary mb-6 tracking-tight italic">Service Provision</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                    <strong>AMS Airport Taxi</strong> provides the <span className="text-primary font-bold">Amsairporttaxi.com</span> website as a service to the public. 
                    We are not responsible for, and expressly disclaim all liability for, damages of any kind arising out of use, reference to, or reliance on any information contained within the site.
                   </p>
                </div>

                <div className="p-8 bg-primary rounded-2xl text-white relative overflow-hidden shadow-lg shadow-gray-100">
                   <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -mr-24 -mb-24" />
                   <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                      <AlertTriangle className="w-8 h-8 text-secondary shrink-0" />
                      <div>
                        <h4 className="text-lg font-bold mb-3">Accuracy Guarantee</h4>
                        <p className="text-gray-300 text-sm leading-relaxed opacity-90">
                            While the information contained within the site is periodically updated, no guarantee is given that the information provided in this website is correct, complete, and up-to-date.
                        </p>
                      </div>
                   </div>
                </div>

                <div className="space-y-12 pt-8">
                    <div className="flex flex-col md:flex-row gap-6 group">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors border border-gray-100">
                            <ExternalLink className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">External Links</h4>
                            <p className="text-base text-gray-500 leading-relaxed">
                                Although <span className="text-primary font-medium">Amsairporttaxi.com</span> may include links providing direct access to other Internet resources, including websites, AMS Airport Taxi is not responsible for the accuracy or content of information contained in these sites.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 group">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors border border-gray-100">
                            <Info className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">No Endorsements</h4>
                            <p className="text-base text-gray-500 leading-relaxed">
                                Links to third-party sites do not constitute an endorsement by AMS Airport Taxi of the parties or their products and services. The appearance of advertisements or service information does not constitute an endorsement.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 italic text-gray-400 text-[10px] uppercase tracking-widest">
                    Last reviewed: April 25, 2026
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer support */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
            <h4 className="text-2xl font-bold text-primary mb-6">Need clarification?</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Support
                </a>
                <Link 
                  href="/contact"
                  className="text-secondary font-black uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2"
                >
                  Contact Form <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </section>
    </main>
  );
}
