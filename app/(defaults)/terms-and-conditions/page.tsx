import React from "react";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { Scale, Clock, Ban, DollarSign, FileCheck, ExternalLink, Info, AlertCircle, Mail, MapPin, Building2, User, RefreshCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: `Terms and Conditions | ${COMPANY_NAME}`,
  description: `Official terms of service and transportation agreements for ${COMPANY_NAME}.`,
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner
        image={IMAGES.ABOUT_BANNER}
        topText="Agreement"
        title="Terms & Conditions"
        description="Please read these terms and conditions carefully before using our website and services."
      />

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Sidebar Info (Industrial Sidebar) */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sticky top-32 space-y-10">
                
                {/* Identity Card */}
                <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Identity of the Entrepreneur</h3>
                    <div className="space-y-6">
                        <IdentityItem icon={<Building2 className="w-5 h-5 text-secondary" />} label="Trading Name" value="Ams Airport Taxi" />
                        <IdentityItem icon={<ExternalLink className="w-5 h-5 text-secondary" />} label="URL" value="amsairporttaxi.com" />
                        <IdentityItem icon={<Mail className="w-5 h-5 text-secondary" />} label="E-mail" value="info@amsairporttaxi.com" />
                        <IdentityItem icon={<FileCheck className="w-5 h-5 text-secondary" />} label="KVK Number" value="58896015" />
                        <IdentityItem icon={<Scale className="w-5 h-5 text-secondary" />} label="VAT Number" value="NL002427636B17" />
                    </div>
                </div>

                {/* KNV Badge */}
                <div className="p-8 bg-primary rounded-3xl text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/20 transition-all duration-500" />
                   <div className="relative z-10">
                      <Scale className="w-8 h-8 text-secondary mb-6" />
                      <h4 className="text-xl font-bold mb-4">KNV Agreement</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Transfers are regulated according to the terms and conditions of KNV (The Royal Dutch Transport Federation).
                      </p>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider hover:underline">
                            KNV Agreement Transfers <ExternalLink className="w-3 h-3" />
                        </a>
                        <a href="#" className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider hover:underline">
                            KNV Agreement Coach <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Terms */}
            <div className="lg:col-span-8">
              <div className="space-y-20">
                
                {/* Introduction */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-6 tracking-tight">Introduction & Definitions</h2>
                    <p className="text-base text-gray-600 leading-relaxed mb-6">
                        Please read these terms and conditions carefully before using this website. In this notification the use and all material of this website are regulated. <strong>By accessing this website you accept that you are bound by these Terms of Use.</strong>
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                        <DefinitionCard 
                            icon={<Building2 className="w-5 h-5 text-secondary" />}
                            title="Entrepreneur"
                            text="The natural or legal person who offers products and / or services at a distance to passengers."
                        />
                        <DefinitionCard 
                            icon={<User className="w-5 h-5 text-secondary" />}
                            title="Passenger / User"
                            text="The natural person who use our services by making a booking on our website."
                        />
                    </div>
                </div>

                {/* Availability */}
                <Section 
                    icon={<RefreshCcw className="w-5 h-5 text-secondary" />}
                    number="01"
                    title="Availability of Service"
                    content="References on the site to our services do constitute an offer to sell or supply that service. Our services are offered based on availability. We supply 98.9% of the services offered by us but it is possible that we can not deliver a particular service or vehicle type."
                />

                {/* Cancellation Policy */}
                <div>
                   <div className="flex items-center gap-4 mb-8 border-l-4 border-secondary pl-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <Ban className="w-5 h-5 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">Cancellation Policy</h2>
                   </div>
                   
                   <div className="grid sm:grid-cols-2 gap-4">
                      <CancelCard title="Regular Transfers" time="24 Hours Notice" details="Customers will receive a full refund or credit with notice. No-shows will be charged the full price." />
                      <CancelCard title="Hourly & Events" time="48 Hours Notice" details="Applicable for roadshows, weddings, and hourly bookings with full refund eligibility." />
                      <CancelCard title="Guided Tours" time="21 Days Notice" details="Notice period required for sightseeing tours to receive a full refund or credit." />
                      <CancelCard title="Coach transfers" time="30 Days Notice" details="Large vehicle group transfers require a 30-day notice for full refund." />
                   </div>
                   
                   <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 flex gap-4">
                      <AlertCircle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Note on Transaction Fees</p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          We will refund the paid amount minus the charged costs by the credit card provider (2.8%) or PayPal (3.4%).
                        </p>
                      </div>
                   </div>
                </div>

                {/* Waiting Time Table */}
                <div>
                   <h2 className="text-2xl font-bold text-primary mb-6 tracking-tight">Waiting Time & Costs</h2>
                   <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <div className="p-8 border-b border-gray-100 bg-white">
                        <div className="flex items-center gap-3 mb-6">
                           <Clock className="w-5 h-5 text-secondary" />
                           <span className="font-bold text-primary text-lg">Included Waiting Period</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Airport Pickups</span>
                                <span className="text-2xl font-bold text-primary">60 Minutes</span>
                                <p className="text-[10px] text-gray-500 mt-1">Included after landing</p>
                            </div>
                            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Train Stations</span>
                                <span className="text-2xl font-bold text-primary">30 Minutes</span>
                                <p className="text-[10px] text-gray-500 mt-1">Included after arrival</p>
                            </div>
                        </div>
                      </div>
                      <div className="p-8">
                         <h4 className="font-bold text-primary mb-4 text-base">Additional Waiting Costs (Per Vehicle)</h4>
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <PriceBox label="Business Sedan" price="€65" />
                            <PriceBox label="Business Minivan" price="€75" />
                            <PriceBox label="Luxury Vehicle" price="€90" />
                            <PriceBox label="Coach" price="€110" />
                         </div>
                         <p className="text-[10px] text-gray-400 mt-6 leading-relaxed italic">
                            * We track flight and train arrival times. Please ensure your phone is turned on after arrival so we can coordinate meeting points.
                         </p>
                      </div>
                   </div>
                </div>

                {/* Logistics */}
                <Section 
                    icon={<Clock className="w-5 h-5 text-secondary" />}
                    number="02"
                    title="Hourly Bookings"
                    content="Mostly used for sightseeing tours, business visits, and weddings. Minimum period is 4 hours and maximum is 14 hours/day. Hourly transfers always end at original pickup."
                />

                {/* Liability */}
                <div className="space-y-10">
                   <div>
                      <h3 className="text-xl font-bold text-primary mb-3">Liability & Dutch Law</h3>
                      <p className="text-gray-500 leading-relaxed text-base">
                        The information on this site does not constitute medical, legal or investment advice. Dutch law is applicable to all issues related to the use of this website.
                      </p>
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-primary mb-3">Submission of Information</h3>
                      <p className="text-gray-500 leading-relaxed text-base">
                        By submitting information to us, you agree that we may use this material to provide the requested services.
                      </p>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Support */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
            <h4 className="text-2xl font-bold text-primary mb-6 italic">Questions? Contact our legal team</h4>
            <p className="text-gray-500 mb-10 text-base leading-relaxed max-w-2xl mx-auto">
              If you have any questions or complaints about this site, please contact us by email: info@amsairporttaxi.com
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
                    Contact Form
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
            <p className="text-base text-gray-500 leading-relaxed">
                {content}
            </p>
        </div>
      </div>
    </div>
  )
}

function IdentityItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-secondary shadow-sm">
                {icon}
            </div>
            <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">{label}</span>
                <span className="text-sm font-semibold text-primary leading-tight">{value}</span>
            </div>
        </div>
    )
}

function DefinitionCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
                <div className="text-secondary">{icon}</div>
                <h4 className="font-bold text-primary text-base">{title}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
        </div>
    )
}

function CancelCard({ title, time, details }: { title: string, time: string, details: string }) {
    return (
        <div className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-secondary/30 transition-all duration-300 shadow-sm">
            <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.15em] block mb-1">{time}</span>
            <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{details}</p>
        </div>
    )
}

function PriceBox({ label, price }: { label: string, price: string }) {
    return (
        <div className="p-4 rounded-xl bg-white border border-gray-100 text-center shadow-sm">
            <span className="text-[9px] text-gray-300 uppercase font-bold block mb-1 tracking-wider">{label}</span>
            <span className="text-base font-bold text-primary">{price}</span>
            <span className="text-[9px] text-gray-400 block mt-0.5">/ hour</span>
        </div>
    )
}
