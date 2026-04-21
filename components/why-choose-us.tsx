"use client";

import Image from "next/image";
import { Building2, Clock, ShieldCheck, Tag, Plane, Headphones, Trophy } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";

const FEATURES = [
    {
        title: "Local office in Amsterdam",
        description: "Our operations team works from a local office in Amsterdam, so your booking is managed by people who know city and Schiphol every day.",
        icon: Building2,
        bgColor: "bg-rose-50",
        iconColor: "text-rose-500",
    },
    {
        title: "Fast adjustments, after booking",
        description: "Last-minute changes? Even if you booked 25 minutes ago, we can adjust pickup timing and driver instructions quickly.",
        icon: Clock,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-500",
    },
    {
        title: "Full control across the city",
        description: "Because dispatch is local, we coordinate drivers, routes, and pickup points in real time across Amsterdam and Schiphol corridors.",
        icon: ShieldCheck,
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-500",
    },
    {
        title: "All-in pricing with no surprises",
        description: "All taxes & fees included - no hidden charges. Your fixed price airport taxi fare is confirmed before the ride.",
        icon: Tag,
        bgColor: "bg-emerald-50",
        iconColor: "text-emerald-500",
    },
    {
        title: "Flight tracking + traffic routing",
        description: "We track arrivals and monitor city traffic so your driver timing and route stay aligned with real airport conditions.",
        icon: Plane,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    {
        title: "Direct WhatsApp support",
        description: "Need to update terminal details or pickup location? Message us on WhatsApp and get direct help from our Amsterdam team.",
        icon: Headphones,
        bgColor: "bg-indigo-50",
        iconColor: "text-indigo-500",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-white py-24 md:py-32">
            <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Content Column */}
                    <div>
                        <div className="mb-12">
                            <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4 block">
                                WHY CHOOSE US
                            </span>
                            <h2 className="text-3xl md:text-[44px] font-extrabold text-secondary mb-6 leading-[1.1] tracking-tight">
                                We Offer the Best Experience With Our Taxi Transportation Deals
                            </h2>
                            <p className="text-muted text-base md:text-[17px] font-medium max-w-2xl opacity-80 leading-relaxed">
                                We are dedicated to providing the best value for your money. With transparent pricing and no hidden fees, you can drive with confidence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                            {FEATURES.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex gap-5 group/item">
                                        <div className={`shrink-0 w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110 shadow-sm`}>
                                            <Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-[17px] font-bold text-secondary tracking-tight">
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted text-sm leading-relaxed opacity-70">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative group">
                        <div className="relative aspect-[4/3] md:aspect-[1.1/1] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/10">
                            <Image
                                src={IMAGES.WHY_CHOOSE_US}
                                alt="Why Choose Us"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {/* Glassmorphism Badge Overlay */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="backdrop-blur-xl bg-black/30 border border-white/20 p-6 rounded-[24px] flex items-center gap-5 shadow-2xl">
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                                        <Trophy className="text-white w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl leading-tight">#1 Taxi Booking Service</h4>
                                        <p className="text-white/80 text-sm font-medium">Rated by 10k+ Happy Customers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
