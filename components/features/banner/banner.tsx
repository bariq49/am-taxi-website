"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/image-constants";
import React from "react";

interface BannerProps {
    image?: string;
    topText?: string;
    title?: string | React.ReactNode;
    description?: string;
}

export default function Banner({ image, topText, title, description }: BannerProps) {
    const defaultImage = IMAGES.HOME_BANNER;
    const renderTitle = (title: string | React.ReactNode) => {
        if (typeof title !== "string") return title;
        const parts = title.split(/<br\s*\/?>/i);
        if (parts.length === 1) return title;

        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <section className="relative w-full pt-48 pb-4">
            <div className="absolute inset-0 h-full w-full">
                <div className="absolute inset-0">
                    <Image
                        src={image || defaultImage}
                        alt={"Hero image"}
                        fill
                        sizes="100vw"
                        className="h-full w-full object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_5%,_rgba(0,0,0,0.85)_50%,_#000_80%)]" />
                </div>
            </div>

            <div className="relative z-20">
                <div className="mx-auto grid max-w-screen-2xl gap-6 pt-16 lg:px-5 lg:pt-32 lg:pb-32">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-6 max-lg:px-3 md:items-start lg:gap-8">
                        <div className="flex flex-col items-center gap-4 md:items-start text-center md:text-left">
                            {topText && (
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2 md:mb-0">
                                    <div className="hidden md:block h-[2px] w-8 bg-secondary" />
                                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-widest text-white uppercase">
                                        {topText}
                                    </span>
                                    <div className="md:hidden h-[2.5px] w-12 bg-secondary mt-1" />
                                </div>
                            )}
                            <h1 className="text-center text-4xl font-extrabold text-white md:text-left md:text-6xl lg:text-7xl">
                                {renderTitle(title)}
                            </h1>

                            {description && (
                                <p className="max-w-2xl text-center text-sm leading-relaxed text-white/70 md:text-left md:text-base lg:text-lg">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}