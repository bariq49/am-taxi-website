import React from "react";
import Image from "next/image";
import { COMPANY_NAME, COMPANY_DESCRIPTION } from "@/constants/app-default";
import { CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";

export const metadata = {
  title: `About Us | ${COMPANY_NAME}`,
  description: `Learn more about ${COMPANY_NAME}, your trusted partner for reliable and professional transportation services.`,
};

const features = [
  {
    title: "Reliability & Punctuality",
    description: "We understand the importance of timing. Our drivers are always on time, ensuring you never miss a flight or an appointment.",
    icon: Clock,
  },
  {
    title: "Safety First",
    description: "Your safety is our top priority. All our vehicles are regularly inspected and our drivers are professionally trained.",
    icon: ShieldCheck,
  },
  {
    title: "Premium Fleet",
    description: "Travel in comfort with our diverse fleet of modern, clean, and well-maintained vehicles for every occasion.",
    icon: Award,
  },
  {
    title: "Professional Drivers",
    description: "Our drivers are not just experts behind the wheel; they are courteous professionals dedicated to your comfort.",
    icon: CheckCircle2,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden bg-primary flex items-center">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Driven by Excellence, <br />
              <span className="text-secondary">Committed to You.</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              We provide premium transportation services tailored to your needs, whether it's an airport transfer or a business trip.
            </p>
          </div>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform translate-x-1/4" />
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/home/why-choose-us.png"
                alt="About AMS Airport Transfer"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to redefine professional transportation, {COMPANY_NAME} has grown to become a leading name in airport transfers and local taxi services. We believe that a journey is more than just getting from point A to B—it's about comfort, safety, and peace of mind.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {COMPANY_DESCRIPTION} Our commitment to quality has earned us the trust of thousands of passengers, from frequent business travelers to families on holiday.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-secondary mb-1">10k+</h3>
                  <p className="text-sm text-gray-500">Happy Clients</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-secondary mb-1">50+</h3>
                  <p className="text-sm text-gray-500">Professional Drivers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure your journey is seamless and stress-free.
          </p>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
