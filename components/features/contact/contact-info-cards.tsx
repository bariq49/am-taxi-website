"use client";

import React from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_PHONE_HREF, COMPANY_EMAIL_HREF } from "@/constants/app-default";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CONTACT_CARDS = [
    {
        icon: Phone,
        title: "24/7 Reservations",
        description: "IMMEDIATE ASSISTANCE FOR ALL YOUR BOOKING NEEDS.",
        value: COMPANY_PHONE,
        href: COMPANY_PHONE_HREF,
        cta: "Call Now"
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Send us a detailed inquiry and we'll respond within 2 hours.",
        value: COMPANY_EMAIL,
        href: COMPANY_EMAIL_HREF,
        cta: "Send Email"
    },
    {
        icon: MapPin,
        title: "Headquarters",
        description: "VISIT OUR GLOBAL OPERATIONS CENTER IN BEVERLY HILLS.",
        value: COMPANY_ADDRESS,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`,
        cta: "Get Directions"
    }
];

export default function ContactInfoCards() {
    return (
        <section className="py-16 relative z-30">
            <div className="container mx-auto px-4">
                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="contact-info-swiper !p-4 !-m-4"
                    >
                        {CONTACT_CARDS.map((card, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <div className="bg-white p-4 md:p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-full h-full cursor-pointer space-y-2">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                        <card.icon className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900  uppercase tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-gray-500 font-semibold lowercase">
                                        {card.description}
                                    </p>
                                    <p className="text-gray-900 font-bold text-lg">{card.value}</p>
                                    <Link
                                        href={card.href}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:gap-3 transition-all duration-300"
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
