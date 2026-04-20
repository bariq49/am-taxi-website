"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useRef } from "react";

interface TimeColumnProps {
    label: string;
    values: (number | string)[];
    selected: number | string | null;
    onSelect: (val: any) => void;
}

export default function TimeColumn({
    label,
    values,
    selected,
    onSelect,
}: TimeColumnProps) {
    const ref = useRef<HTMLDivElement>(null);

    const scroll = (dir: "up" | "down") => {
        if (!ref.current) return;

        const amount = 40;
        ref.current.scrollBy({
            top: dir === "up" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col">
            <label className="text-xs text-center mb-2 text-gray-500">
                {label}
            </label>

            <div className="relative border rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => scroll("up")}
                    className="w-full py-1 border-b flex justify-center"
                >
                    <ChevronUp size={16} />
                </button>
                <div
                    ref={ref}
                    className="max-h-40 overflow-y-auto scrollbar-hide"
                >
                    {values.map((val) => {
                        const isSelected = selected === val;

                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => onSelect(val)}
                                className={`w-full py-2 text-sm border-b last:border-b-0 transition ${isSelected
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                {typeof val === "number"
                                    ? val.toString().padStart(2, "0")
                                    : val}
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={() => scroll("down")}
                    className="w-full py-1 border-t flex justify-center"
                >
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
}