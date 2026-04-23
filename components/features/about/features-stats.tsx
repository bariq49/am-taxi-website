"use client";

import React from "react";
import { Sparkles, Clock, Armchair, ShieldCheck, LucideIcon } from "lucide-react";

interface StatItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeaturesStatsProps {
    items?: StatItem[];
    className?: string;
}

const DEFAULT_STATS: StatItem[] = [
    { icon: Sparkles, title: "Excellence", description: "In Every Detail" },
    { icon: Clock, title: "Reliability", description: "Always On Time" },
    { icon: Armchair, title: "Comfort", description: "First Class Experience" },
    { icon: ShieldCheck, title: "Privacy", description: "Guaranteed Discretion" },
];

export default function FeaturesStats({ items = DEFAULT_STATS, className = "" }: FeaturesStatsProps) {
    return (
        <section className={`bg-[#0A0A0A] py-8 sm:py-10 border-b border-white/5 ${className}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center lg:flex-row lg:items-center gap-3 lg:gap-4 group cursor-default"
                        >
                            {/* Icon circle */}
                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-secondary/40 group-hover:bg-secondary/5">
                                <item.icon className="w-6 h-6 text-secondary transition-transform duration-500 group-hover:scale-110" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h3 className="text-white font-bold text-base sm:text-lg lg:text-lg leading-tight text-center lg:text-left transition-colors duration-300 group-hover:text-secondary/90">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm  font-semibold mt-1 text-center lg:text-left">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}