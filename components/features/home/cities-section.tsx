"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { IMAGES } from "@/constants/image-constants";
import DestinationCard from "../destinations/destination-card";
import { ArrowUpRight } from "lucide-react";

const CITIES = [
    {
        name: "Amsterdam",
        description: "Primary international hub with 24/7 premium taxi services.",
        image: IMAGES.CITIES.AMSTERDAM,
        href: "/amsterdam",
    },
    {
        name: "Rotterdam",
        description: "Primary international hub with 24/7 premium taxi services.",
        image: IMAGES.CITIES.ROTTERDAM,
        href: "/rotterdam",
    },
    {
        name: "Utrecht",
        description: "Primary international hub with 24/7 premium taxi services.",
        image: IMAGES.CITIES.UTRECHT,
        href: "/utrecht",
    },
    {
        name: "The Hague",
        description: "Primary international hub with 24/7 premium taxi services.",
        image: IMAGES.CITIES.THE_HAGUE,
        href: "/the-hague",
    },
];

export default function CitiesSection() {
    return (
        <section className="bg-primary py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                            Explore Popular Cities We cover
                        </h2>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                            Discover the best taxi transportation deals in cities of Netherland destinations.
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
                        className="cities-swiper swiper-dark !p-1"
                    >
                        {CITIES.map((city, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <DestinationCard destination={city} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
