"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function HeroSection() {
    const defaultImage = "/assets/images/banner/home.banner.png";

    return (
        <section
            className="relative w-full overflow-hidden pt-16 md:pt-52"
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
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 pt-16 lg:pt-32 lg:pb-32">
                    <div className="flex flex-col items-center justify-center gap-6 md:items-start lg:gap-8">
                        <div className="flex flex-col items-center gap-4 md:items-start">
                            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white text-center md:text-left md:text-6xl lg:text-7xl xl:text-8xl">
                                Taxi service<br />
                                <span className="text-light">throughout the Netherlands</span>
                            </h1>
                            <div className="mt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide text-white/90 md:text-lg lg:text-xl">
                                        Premium Vehicles at Economy Prices
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide text-white/90 md:text-lg lg:text-xl">
                                        Fixed Taxi prices
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide text-white/90 md:text-lg lg:text-xl">
                                        Secure online payment
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}