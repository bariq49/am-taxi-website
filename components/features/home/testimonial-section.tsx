"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRight, Star } from "lucide-react";
import ReviewCard from "@/components/features/testimonial/testimonial-card";
import TestimonialSkeleton from "../skeletons/testimonial-skeleton";
import { useReviewsQuery } from "@/hooks/queries/use-reviews";
import { GoogleIcon, StarsIcon } from "@/components/icons";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function Testimonials() {
    const { data: reviewsData, isLoading } = useReviewsQuery();

    if (isLoading) {
        return <TestimonialSkeleton />;
    }

    const reviews = reviewsData.reviews;
    const googleReviewsUrl = reviewsData.googleReviewsUrl;

    return (
        <div className="bg-white py-16">
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-3">
                    <StarsIcon className="shrink-0" />
                    What Our Customers Say
                </h2>
                <p className="text-sm md:text-base text-gray-500 mx-auto leading-relaxed">
                    Trusted by thousands of riders for reliable, comfortable, and professional journeys — every single day.
                    <a
                        href={googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 ml-2 align-middle hover:opacity-80 transition-opacity"
                    >
                        <span className="h-4 w-4 flex items-center justify-center">
                            <GoogleIcon className="h-4 w-4" />
                        </span>

                        <span className="text-sm font-medium text-gray-500 leading-none">
                            Google
                        </span>

                        <ArrowUpRight size={14} className="text-gray-400" />
                    </a>
                </p>
            </div>
            <div className="container mx-auto px-4 relative group">
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
                    className="testimonial-swiper !p-1"
                >
                    {reviews?.map((r: any, i: number) => (
                        <SwiperSlide key={i} className="!h-auto !flex">
                            <ReviewCard review={r} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mt-14 gap-0">
                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                            <AnimatedCounter end={500} suffix="+" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Happy Customers
                        </span>
                    </div>

                    <div className="w-px h-10 md:h-14 bg-gray-200 shrink-0" />

                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                            <AnimatedCounter end={4} prefix="0" suffix="+" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Countries
                        </span>
                    </div>

                    <div className="w-px h-10 md:h-14 bg-gray-200 shrink-0" />

                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                            <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                                <AnimatedCounter end={4.9} decimals={1} />
                            </div>
                            <Star className="w-7 h-7 text-secondary fill-secondary" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Avg Rating
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}