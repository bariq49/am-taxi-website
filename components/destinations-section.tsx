"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/image-constants";

const DESTINATIONS = [
    {
        name: "Amsterdam Airport Schiphol",
        image: IMAGES.DESTINATIONS.SCHIPHOL,
    },
    {
        name: "Rotterdam The Hague Airport",
        image: IMAGES.DESTINATIONS.ROTTERDAM,
    },
    {
        name: "Eindhoven Airport",
        image: IMAGES.DESTINATIONS.EINDHOVEN,
    },
    {
        name: "Groningen Airport Eelde",
        image: IMAGES.DESTINATIONS.GRONINGEN,
    },
];

export default function DestinationsSection() {
    return (
        <section className="bg-gray py-20 pb-32">
            <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-3xl">
                        <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4 block">
                            DESTINATIONS
                        </span>
                        <h2 className="text-3xl md:text-[44px] font-extrabold text-primary mb-5 leading-[1.1] tracking-tight">
                            Explore Popular Airport We cover
                        </h2>
                        <p className="text-muted text-base md:text-[17px] font-medium opacity-90 max-w-xl">
                            Discover the best taxi transportation deals in airport destinations.
                        </p>
                    </div>
                    <div className="shrink-0 pb-2">
                        <Link
                            href="/locations"
                            className="inline-flex flex-col group"
                        >
                            <span className="text-sm font-extrabold text-secondary tracking-tight">
                                View All Locations
                            </span>
                            <div className="h-[2px] w-full bg-secondary mt-[6px] group-hover:w-[110%] transition-all duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {DESTINATIONS.map((destination, index) => (
                        <div
                            key={index}
                            className="relative h-[260px] md:h-[320px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />
                            {/* Overlay - Premium gradient from bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                            {/* Text content with subtle slide up on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:-translate-y-1">
                                <h3 className="text-white font-bold text-[19px] leading-[1.3] tracking-tight drop-shadow-md">
                                    {destination.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
