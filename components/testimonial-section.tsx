"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Star, ArrowUpRight } from "lucide-react";
import ReviewCard from "@/components/testimonial-card";
import TestimonialSkeleton from "./skeletons/testimonial-skeleton";
import { useReviewsQuery } from "@/hooks/queries/use-reviews";
import { GoogleIcon, StarsIcon } from "@/components/icons";



export default function Testimonials() {
    const { data: reviewsData, isLoading } = useReviewsQuery();

    if (isLoading) {
        return <TestimonialSkeleton />;
    }

    if (!reviewsData?.reviews?.length) {
        return null;
    }

    const reviews = reviewsData.reviews;
    const rating = reviewsData.rating || 0;
    const totalRatings = reviewsData.totalRatings || 0;
    const googleReviewsUrl = reviewsData.googleReviewsUrl;

    return (
        <div className="bg-white px-4 md:px-8 pt-20">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-6">
                    <StarsIcon className="shrink-0" />
                    What Our customers say
                </h2>
                {/* Rating bar */}
                <div className="inline-flex items-center gap-3 flex-wrap justify-center">
                    <span className="text-sm font-medium text-gray-700">Our customers say</span>
                    <div className="flex gap-[3px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="w-[22px] h-[22px] bg-amber-400 rounded-[3px] flex items-center justify-center">
                                <Star size={14} fill="white" stroke="none" />
                            </span>
                        ))}
                    </div>
                    <span className="text-base font-bold text-gray-900 tracking-wide uppercase">Excellent</span>
                    <span className="text-base text-gray-500">
                        Rated <strong>{rating.toFixed(1)}</strong> / 5
                        based on <strong>{totalRatings.toLocaleString()}</strong> reviews
                    </span>
                    <a
                        href={googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="flex items-center gap-1.5 border-l border-gray-200 pl-3">
                            <GoogleIcon />
                            <span className="text-sm font-semibold text-gray-500">Google</span>
                        </div>
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>

            {/* Cards Slider */}
            <div className="container mx-auto mb-8 relative group">
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
                    className="testimonial-swiper !p-4"
                >
                    {reviews.map((r: any, i: number) => (
                        <SwiperSlide key={i} className="pb-8 !h-auto !flex">
                            <ReviewCard review={r} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style jsx global>{`
        .testimonial-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .testimonial-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
      `}</style>
        </div>
    );
}

