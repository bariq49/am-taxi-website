"use client";

import React, { useState, useMemo } from "react";
import { useFleets, useFleetCategories } from "@/hooks/queries/use-fleet";
import { Fleet } from "@/lib/api/fleets";
import FleetCard from "./fleet-card";
import FleetFilterBar from "./fleet-filter-bar";
import FleetSkeleton from "../skeletons/fleet-skeleton";
import { SlidersHorizontal, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FleetListSection() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("All");
    const [limit, setLimit] = useState(10);

    const { data: categoriesData } = useFleetCategories();
    const categories = useMemo(() => {
        const cats = categoriesData?.data || [];
        return [{ _id: "All", name: "All" }, ...cats];
    }, [categoriesData]);

    const { data: fleetsData, isLoading, isFetching } = useFleets({
        category: selectedCategoryId === "All" ? undefined : selectedCategoryId,
        limit: limit,
        page: 1
    });
    const fleets = fleetsData?.data || [];
    const hasMore = (fleetsData?.meta?.page ?? 0) < (fleetsData?.meta?.pages ?? 0);

    const handleLoadMore = () => {
        setLimit(prev => prev + 10);
    };

    const handleCategoryChange = (id: string) => {
        setSelectedCategoryId(id);
        setLimit(10);
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <FleetFilterBar
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onCategoryChange={handleCategoryChange}
                />
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <FleetSkeleton key={i} />
                        ))}
                    </div>
                ) : fleets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {fleets.map((fleet: Fleet) => (
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
                            onClick={() => handleCategoryChange("All")}
                            className="rounded-xl border-gray-200"
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}

                {/* Load More */}
                {hasMore && fleets.length > 0 && (
                    <div className="mt-20 flex justify-center">
                        <Button
                            variant="outline"
                            onClick={handleLoadMore}
                            disabled={isFetching}
                            className="h-14 px-10 rounded-full border-gray-200 font-bold text-[#003048] hover:bg-gray-50 gap-3 group"
                        >
                            {isFetching ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    LOAD MORE VEHICLES
                                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
