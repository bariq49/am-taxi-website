"use client";

import { MapPin, Car, CreditCard, MoveRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const STEPS = [
    {
        id: "Step 01",
        title: "Enter your taxi ride data",
        description: "Provide your pickup and drop-off details to get started with your journey.",
        icon: MapPin,
    },
    {
        id: "Step 02",
        title: "Calculate the fixed fee",
        description: "Instantly view a transparent, fixed price based on your selected route and vehicle.",
        icon: Car,
    },
    {
        id: "Step 03",
        title: "Book and pay safely online",
        description: "Confirm your booking and complete payment securely in just a few clicks.",
        icon: CreditCard,
    },
];

export default function ProcessSection() {
    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
                            Taxi Transportation In 3 Simple Steps
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            We streamlined the taxi transportation process to get you on the road faster. No paperwork, no hidden fees, just pure driving pleasure.
                        </p>
                    </div>
                    <div className="md:pb-2  hidden lg:block">
                        <Link
                            href="/booking"
                            className="inline-flex flex-col group"
                        >
                            <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
                                Start Booking
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </span>
                            <div className="h-[2px] w-full bg-secondary mt-[6px] group-hover:w-[110%] transition-all duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-[56px] left-0 right-0 h-[1px] border-t border-dashed border-gray-200 z-0" />

                    <div className="relative z-10 w-full">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 0,
                                    allowTouchMove: false
                                },
                            }}
                            className="process-swiper"
                        >
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col items-center text-center group md:px-4 py-4">
                                            {/* Icon Container */}
                                            <div className="relative mb-10">
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center border border-gray-100 relative z-10 transform transition-all duration-500 group-hover:border-secondary/20 group-hover:scale-105 shadow-sm">
                                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />
                                                </div>
                                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm z-20">
                                                    <span className="text-[10px] md:text-xs font-bold text-primary whitespace-nowrap">
                                                        {step.id}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-primary mb-3 tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[320px]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
