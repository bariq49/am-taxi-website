"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { IMAGES } from "@/constants/image-constants";
import DestinationCard from "./destination-card";

const DESTINATIONS = [
    {
        name: "Amsterdam Airport Schiphol",
        description: "Primary international hub with 24/7 premium taxi services.",
        image: IMAGES.DESTINATIONS.SCHIPHOL,
    },
    {
        name: "Rotterdam The Hague Airport",
        description: "Quick business transfers and regional travel connections.",
        image: IMAGES.DESTINATIONS.ROTTERDAM,
    },
    {
        name: "Eindhoven Airport",
        description: "Reliable transport for the technology and design capital.",
        image: IMAGES.DESTINATIONS.EINDHOVEN,
    },
    {
        name: "Groningen Airport Eelde",
        description: "Convenient airport transfers serving the northern regions.",
        image: IMAGES.DESTINATIONS.GRONINGEN,
    },
];

export default function DestinationsSection() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                            Explore Popular Airport We cover
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            Discover the best taxi transportation deals in airport destinations.
                        </p>
                    </div>
                    <div className="md:pb-2 hidden lg:block">
                        <Link
                            href="/locations"
                            className="inline-flex flex-col group"
                        >
                            <span className="text-sm font-semibold text-secondary">
                                View All Locations
                            </span>
                            <div className="h-[2px] w-full bg-secondary mt-[6px] group-hover:w-[110%] transition-all duration-300" />
                        </Link>
                    </div>
                </div>

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
                            1024: { slidesPerView: 4 },
                        }}
                        className="destinations-swiper !p-1"
                    >
                        {DESTINATIONS.map((destination, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <DestinationCard destination={destination} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .destinations-swiper .swiper-wrapper {
                    align-items: stretch;
                }
                .destinations-swiper .swiper-slide {
                    height: auto;
                    display: flex;
                }
            `}</style>
        </section>
    );
}
