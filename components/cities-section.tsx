"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/image-constants";

const CITIES = [
    {
        name: "Amsterdam",
        image: IMAGES.CITIES.AMSTERDAM,
    },
    {
        name: "Rotterdam",
        image: IMAGES.CITIES.ROTTERDAM,
    },
    {
        name: "Utrecht",
        image: IMAGES.CITIES.UTRECHT,
    },
    {
        name: "The Hague",
        image: IMAGES.CITIES.THE_HAGUE,
    },
];

export default function CitiesSection() {
    return (
        <section className="bg-primary py-24 pb-40">
            <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-3xl">
                        <span className="text-[#f97316] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4 block">
                            DESTINATIONS
                        </span>
                        <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
                            Explore PopularCities We cover
                        </h2>
                        <p className="text-white/70 text-base md:text-[17px] font-medium max-w-2xl">
                            Discover the best taxi transportation deals in cities of Netherland destinations.
                        </p>
                    </div>
                    <div className="shrink-0 pb-2">
                        <Link
                            href="/locations"
                            className="inline-flex flex-col group"
                        >
                            <span className="text-sm font-extrabold text-white tracking-tight">
                                View All Locations
                            </span>
                            <div className="h-[2px] w-full bg-white mt-[8px] group-hover:w-[110%] transition-all duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {CITIES.map((city, index) => (
                        <div
                            key={index}
                            className="relative h-[260px] md:h-[320px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm transition-all duration-500 border border-white/5"
                        >
                            <Image
                                src={city.image}
                                alt={city.name}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity group-hover:opacity-100" />

                            {/* Text content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-400 group-hover:-translate-y-2">
                                <h3 className="text-white font-bold text-[20px] leading-[1.3] tracking-tight drop-shadow-lg">
                                    {city.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
