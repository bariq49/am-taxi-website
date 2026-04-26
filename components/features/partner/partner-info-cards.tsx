"use client";

import React from "react";
import { DollarSign, Clock, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const PARTNER_CARDS = [
    {
        icon: DollarSign,
        title: "Maximized Earnings",
        description: "Benefit from our competitive commission structures and high-demand routes.",
        value: "Top Tier Rates",
        href: "#partner-form",
        cta: "Scale Your Income"
    },
    {
        icon: Clock,
        title: "Ultimate Flexibility",
        description: "Choose your own hours and manage your schedule through our intuitive driver app.",
        value: "Work When You Want",
        href: "#partner-form",
        cta: "Set Your Schedule"
    },
    {
        icon: Shield,
        title: "24/7 Driver Support",
        description: "Our dedicated operations team is available around the clock to assist you.",
        value: "Always by Your Side",
        href: "#partner-form",
        cta: "Get Started"
    }
];

export default function PartnerInfoCards() {
    return (
        <section className="py-16 relative z-30">
            <div className="container mx-auto px-4">
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="partner-info-swiper !p-4 !-m-4"
                    >
                        {PARTNER_CARDS.map((card, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <div className="bg-white p-4 md:p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-full h-full cursor-pointer space-y-2">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <card.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-gray-500 font-semibold lowercase">
                                        {card.description}
                                    </p>
                                    <p className="text-gray-900 font-bold text-lg">{card.value}</p>
                                    <Link
                                        href={card.href}
                                        className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
                                    >
                                        {card.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
