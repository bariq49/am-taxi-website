"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { useFleets } from "@/hooks/queries/use-fleet";
import FleetSkeleton from "../skeletons/fleet-skeleton";
import { Fleet } from "@/lib/api/fleets";
import FleetCard from "../fleet/fleet-card";
import { ArrowUpRight } from "lucide-react";

export default function FleetSection() {
    const { data: fleetsData, isLoading } = useFleets();
    console.log(fleetsData)

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
                            Explore Our Top Vehicles
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            From luxury sedans to spacious family SUVs, find the perfect taxi transportation vehicle for your next journey.
                        </p>
                    </div>
                    <div className="md:pb-2 hidden lg:block">
                        <Link
                            href="/fleets"
                            className="inline-flex flex-col group"
                        >
                            <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
                                View All Fleets
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
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
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2.5 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="fleets-swiper !p-4 !-m-4"
                    >
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={`skeleton-${index}`} className="!h-auto !flex">
                                    <FleetSkeleton />
                                </SwiperSlide>
                            ))
                        ) : (
                            fleetsData?.map((fleet: Fleet, index: number) => (
                                <SwiperSlide key={fleet?._id || index} className="!h-auto !flex">
                                    <FleetCard fleet={fleet} />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .fleets-swiper .swiper-wrapper {
                    align-items: stretch;
                }
                .fleets-swiper .swiper-slide {
                    height: auto;
                    display: flex;
                }
            `}</style>
        </section>
    );
}
