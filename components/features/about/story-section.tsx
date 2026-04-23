import React from "react";
import Image from "next/image";
import ExcellenceIcon from "@/components/icons/excellence-icon";
import AnimatedCounter from "@/components/ui/animated-counter";
import { Check } from "lucide-react";

interface StatItem {
    label: string;
    value: string;
}

interface StorySectionProps {
    image: string;
    topText?: string;
    title: string | React.ReactNode;
    description: string;
    points?: string[];
    badgeText?: string;
    stats?: StatItem[];
    imageSide?: "left" | "right";
    className?: string;
}

const parseStatValue = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    return { num, suffix };
};

export default function StorySection({
    image,
    topText,
    title,
    description,
    points,
    badgeText,
    stats,
    imageSide = "left",
    className = "",
}: StorySectionProps) {
    return (
        <section className={`py-12 md:py-16 bg-white overflow-hidden ${className}`}>
            <div className="container mx-auto px-4">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                    <div className={`relative self-stretch ${imageSide === "right" ? "lg:order-2" : ""}`}>
                        <div className="relative h-full min-h-[500px] rounded-md overflow-hidden">
                            <Image
                                src={image}
                                alt="Story image"
                                fill
                                className="h-full w-full object-cover"
                            />
                            {badgeText && (
                                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end p-8 pb-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                                            <ExcellenceIcon className="w-12 h-12 text-secondary" />
                                        </div>
                                        <span className="text-white font-bold text-xl md:text-2xl leading-tight max-w-[220px]">
                                            {badgeText}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        {topText && (
                            <span className="text-secondary font-semibold text-base mb-2">
                                {topText}
                            </span>
                        )}
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                            {title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-2">
                            {description}
                        </p>
                        {points && points.length > 0 && (
                            <ul className="space-y-3 mb-10">
                                {points.map((point, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-500 text-sm mt-2">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary md:h-7 md:w-7 ">
                                            <Check className="h-3 w-3 text-white md:h-4 md:w-4 drop-shadow-sm" />
                                        </div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Stats Row */}
                        {stats && stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-8 w-full border-t border-border mt-4 pt-4">
                                {stats.map((stat, index) => {
                                    const { num, suffix } = parseStatValue(stat.value);
                                    return (
                                        <div key={index} className="flex flex-col items-center md:items-start">
                                            <span className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                                                <AnimatedCounter end={num} suffix={suffix} />
                                            </span>
                                            <span className="text-gray-400 text-xs md:text-sm font-medium">
                                                {stat.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
