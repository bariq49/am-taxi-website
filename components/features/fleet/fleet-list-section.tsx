"use client";

import React, { useState } from "react";
import { useFleets } from "@/hooks/queries/use-fleet";
import { Fleet } from "@/lib/api/fleets";
import FleetCard from "./fleet-card";
import { SlidersHorizontal, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
    "All",
    "SUV",
    "MPV",
    "Minivan",
    "Sedan",
    "Hatchback",
    "Luxury",
    "Sports"
];

export default function FleetListSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { data: fleets, isLoading, error, refetch } = useFleets();

    const filteredFleets = fleets?.filter((fleet: Fleet) => {
        if (selectedCategory === "All") return true;

        const carType = fleet.carType?.toLowerCase() || "";
        const name = fleet.name?.toLowerCase() || "";
        const category = selectedCategory.toLowerCase();

        return carType.includes(category) || name.includes(category);
    });

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Filter Tabs */}
                <div className="flex items-center justify-between gap-6 mb-12 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 w-full sm:w-auto">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                    selectedCategory === category
                                        ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors shrink-0">
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-[16/20] bg-gray-50 animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : filteredFleets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredFleets.map((fleet: Fleet) => (
                            <FleetCard key={fleet._id} fleet={fleet} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <SlidersHorizontal className="w-8 h-8 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-[#003048] mb-2">No vehicles found</h3>
                        <p className="text-gray-500 max-w-sm mb-8">
                            We couldn't find any vehicles matching your criteria. Try selecting another category.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedCategory("All")}
                            className="rounded-xl border-gray-200"
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}

                {/* Load More */}
                {filteredFleets.length > 0 && (
                    <div className="mt-20 flex justify-center">
                        <Button
                            variant="outline"
                            className="h-14 px-10 rounded-full border-gray-200 font-bold text-[#003048] hover:bg-gray-50 gap-3 group"
                        >
                            LOAD MORE VEHICLES
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
