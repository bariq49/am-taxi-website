"use client";
import { LucideIcon } from "lucide-react";
import { ICON_COMPONENTS, IconName } from "@/constants/icon-constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface FeatureItem {
    icon: IconName | LucideIcon;
    title: string;
    description: string;
}

interface FeaturesGridProps {
    topText?: string;
    title?: string;
    description?: string;
    items?: FeatureItem[];
    className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
    {
        icon: "MapPin",
        title: "Based at Schiphol",
        description: "Our office is located directly at Amsterdam Schiphol Airport.",
    },
    {
        icon: "ShieldCheck",
        title: "No Outsourcing",
        description: "Fully controlled in-house professional team - no third parties.",
    },
    {
        icon: "PhoneCall",
        title: "15-Minute Response",
        description: "Taxi or limousine arranged within 15 minutes guaranteed.",
    },
    {
        icon: "Car",
        title: "Luxury Vehicles",
        description: "Premium fleet with executive limousine service available.",
    },
];

export default function FeaturesGrid({
    topText,
    title,
    description,
    items = DEFAULT_FEATURES,
    className = "",
}: FeaturesGridProps) {
    const hasHeader = topText || title || description;

    return (
        <section className={`py-16 bg-gray-100 overflow-hidden ${className}`}>
            <div className="container mx-auto px-4">
                {hasHeader && (
                    <div className="max-w-3xl mx-auto text-center mb-10 ">
                        {topText && (
                            <span className="text-secondary font-semibold text-base mb-2 block">
                                {topText}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="features-swiper !p-4 !-m-4"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className="!h-auto">
                                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-md h-full min-h-[250px] border border-border transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 group">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-secondary/20">
                                        {typeof item.icon === "string" ? (
                                            (() => {
                                                const Icon = ICON_COMPONENTS[item.icon as IconName];
                                                return <Icon className="w-6 h-6 text-secondary" />;
                                            })()
                                        ) : (
                                            <item.icon className="w-6 h-6 text-secondary" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
