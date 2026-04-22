"use client";

import Image from "next/image";
import Step1 from "./booking/setp-1/setp-1";
import { IMAGES } from "@/constants/image-constants";
import { Check } from "lucide-react";

export default function HeroSection() {
    const defaultImage = IMAGES.HOME_BANNER;

    return (
        <section
            className="relative w-full pt-16 md:pt-48"
        >
            <div className="absolute inset-0 h-full w-full">
                <div className="absolute inset-0">
                    <Image
                        src={defaultImage}
                        alt={"Hero image"}
                        fill
                        sizes="100vw"
                        className="h-full w-full object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_rgba(0,0,0,0.8)_60%,_#000_90%)]" />
                </div>
            </div>

            <div className="relative z-20">
                <div className="mx-auto grid max-w-screen-2xl gap-6 pt-16 lg:grid-cols-2 lg:px-5 lg:pt-32 lg:pb-32 xl:grid-cols-3">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-6 max-lg:px-3 md:items-start lg:gap-8 xl:col-span-2">
                        <div className="flex flex-col items-center gap-2 md:items-start">
                            <h1 className="text-center text-4xl font-extrabold text-white md:text-left md:text-6xl">
                                Taxi service throughout <br />
                                <span className="text-center md:text-left md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">the Netherlands</span>
                            </h1>
                            <div className="flex flex-row items-center justify-center gap-y-4 gap-x-6 mt-6 flex-wrap md:items-start md:justify-start md:flex-col md:ml-2">
                                {[
                                    "Fixed Taxi prices",
                                    "Secure online payment",
                                    "Premium Vehicles at Economy Prices",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 md:gap-4">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-white shadow-lg md:h-7 md:w-7">
                                            <Check className="h-3 w-3 text-white md:h-4 md:w-4" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90 md:text-lg">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-full w-full">
                        <div className="w-full max-w-md">
                            <Step1 />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}