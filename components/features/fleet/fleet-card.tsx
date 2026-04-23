"use client";

import Image from "next/image";
import { Luggage, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Fleet {
    name: string;
    description?: string;
    image: string;
    passengers: number;
    suitcases: number;
}

export default function FleetCard({ fleet }: { fleet: Fleet }) {
    return (
        <div className="bg-white rounded-md p-3 flex flex-col h-full w-full border border-gray-100 transition-all duration-500 group">
            {/* Image Container */}
            <div className="bg-gray-50 rounded-md mb-3 p-2 flex items-center justify-center aspect-[2.2] relative overflow-hidden">
                <Image
                    src={fleet.image}
                    alt={fleet.name}
                    width={400}
                    height={300}
                    className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                />
            </div>

            {/* Content */}
            <div className="flex-1 px-1">
                <h3 className="text-base md:text-lg font-bold text-primary mb-1">
                    {fleet.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {fleet.description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 mt-auto px-1">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <Luggage className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold whitespace-nowrap">{fleet.suitcases} Bags</span>
                    </div>
                    <div className="w-[1px] h-3 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold whitespace-nowrap">{fleet.passengers} Seats</span>
                    </div>
                </div>

                <Button className="bg-secondary text-white px-4 py-2 rounded-full font-bold text-[10px] md:text-xs hover:bg-secondary-600 transition-all duration-300 active:scale-95 whitespace-nowrap">
                    Book Now
                </Button>
            </div>
        </div>
    );
}
