"use client";

import Image from "next/image";
import Step1 from "../booking/setp-1/setp-1";
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
                    <div className="absolute inset-0 bg-black/60" />
                    {/* <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_5%,_rgba(0,0,0,0.85)_50%,_#000_80%)]" /> */}
                </div>
            </div>

            <div className="relative z-20">
                <div className="mx-auto grid max-w-screen-2xl gap-6 pt-16 lg:grid-cols-2 lg:px-5 lg:pt-32 lg:pb-32 xl:grid-cols-3">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-6 max-lg:px-3 md:items-start lg:gap-8 xl:col-span-2">
                        <div className="flex flex-col items-start gap-2 md:items-start px-4 md:px-0">
                            <h1 className="text-left text-3xl sm:text-4xl font-extrabold text-white md:text-left md:text-6xl">
                                Private Taxi throughout <br />
                                <span className="text-left md:text-left md:text-6xl lg:text-7xl xl:text-8xl">The Netherland</span>
                            </h1>
                            <div className="flex flex-col items-start gap-4 mt-6 md:mt-8 md:ml-2">
                                {[
                                    "Taxi In 15 Mints",
                                    "Book your taxi online and save up to 75%",
                                    "Your Trusted Schiphol Taxi — Office at Schiphol Airport",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 md:gap-4 max-w-sm md:max-w-none">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full md:h-7 md:w-7 bg-white/20 backdrop-blur-md border border-white/30 shrink-0 mt-0.5 md:mt-0">
                                            <Check className="h-3 w-3 text-white md:h-4 md:w-4 drop-shadow-sm" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90 md:text-lg text-left leading-tight md:leading-normal">
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