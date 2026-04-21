"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";

import Step1 from "./booking/setp-1/setp-1";

export default function HeroSection() {
    const defaultImage = IMAGES.HOME_BANNER;

    return (
        <section
            className="relative w-full overflow-visible pt-16 md:pt-40 lg:pt-48"
        >
            <div className="absolute inset-0 h-[100%] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={defaultImage}
                        alt={"Hero image"}
                        fill
                        sizes="100vw"
                        className="h-full w-full object-cover object-top"
                        priority
                    />
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_rgba(0,0,0,0.6)_60%,_#000_90%)]" />
                </div>
            </div>

            <div className="relative z-20 flex flex-col">
                <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-16 lg:pt-24 flex-1">
                    <div className="flex flex-col items-center justify-center gap-6 md:items-start lg:gap-8">
                        <div className="flex flex-col items-center gap-6 md:items-start max-w-3xl">
                            <h1 className="text-4xl font-bold tracking-tight text-white text-center md:text-left md:text-5xl lg:text-6xl leading-[1.1]">
                                Taxi service throughout<br />
                                the Netherlands
                            </h1>
                            <div className="flex flex-col gap-3">
                                {[
                                    "Premium Vehicles at Economy Prices",
                                    "Fixed Taxi prices",
                                    "Secure online payment"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                            <Check className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span className="text-sm font-normal text-white/90 md:text-base">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-24 lg:mt-32 transform translate-y-1/2">
                    <Step1 />
                </div>
            </div>
        </section>
    );
}