"use client";

import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
    destination: {
        name: string;
        description?: string;
        image: string;
        href: string;
    };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
    return (
        <Link
            href={destination.href}
            className="relative h-[260px] md:h-[320px] w-full rounded-md overflow-hidden group cursor-pointer shadow-sm transition-all duration-500 block"
        >
            <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-500 group-hover:-translate-y-14">
                <h3 className="text-white font-bold text-lg leading-[1.3] tracking-tight drop-shadow-md">
                    {destination.name}
                </h3>
            </div>
            {destination.description && (
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2">
                        {destination.description}
                    </p>
                </div>
            )}
        </Link>
    );
}