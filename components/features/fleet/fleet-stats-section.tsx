"use client";

import React from "react";
import { Car, Clock, MapPin, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const STATS = [
    {
        icon: Car,
        value: "50+",
        label: "Premium Models",
        description: "Curated from top luxury brands like Rolls Royce, Bentley & Ferrari"
    },
    {
        icon: Clock,
        value: "24/7",
        label: "Concierge Service",
        description: "Dedicated support team available anytime, anywhere for you"
    },
    {
        icon: MapPin,
        value: "15",
        label: "Global Locations",
        description: "Seamless pickup and drop-off at major airports and cities"
    },
    {
        icon: ShieldCheck,
        value: "100%",
        label: "Maintenance Score",
        description: "Rigorous 150-point inspection before every single drive"
    }
];

export default function FleetStatsSection() {
    return (
        <section className="bg-[#0A0A0A] py-10">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    speed={3000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="fleet-stats-swiper linear-swiper"
                >
                    {STATS.map((stat, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center group space-y-2">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary/5">
                                    <stat.icon className="w-5 h-5 text-white group-hover:text-secondary transition-colors duration-500" />
                                </div>

                                <h3 className="text-3xl font-bold text-secondary tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-white font-semibold text-base uppercase">
                                    {stat.label}
                                </p>
                                <p className="text-gray-500 text-sm  font-semibold text-center max-w-[260px]">
                                    {stat.description}
                                </p>

                                {index !== STATS.length - 1 && (
                                    <div className="hidden lg:block absolute -right-[12px] top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
