"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { IMAGES } from "@/constants/image-constants";
import DestinationCard from "../destinations/destination-card";
import { ArrowUpRight } from "lucide-react";

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
                    {/* <div className="md:pb-2 hidden lg:block">
                        <Link
                            href="/locations"
                            className="inline-flex flex-col group"
                        >
                            <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
                                View All Locations
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </span>
                            <div className="h-[2px] w-full bg-secondary mt-[6px] group-hover:w-[110%] transition-all duration-300" />
                        </Link>
                    </div> */}
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        pagination={{ clickable: true }}
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
        </section>
    );
}
