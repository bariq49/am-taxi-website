"use client";

import { MapPin, Car, CreditCard, MoveRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
    {
        id: "Step 01",
        title: "Choose Location",
        description: "Select your preferred pickup location and dates. We have coverage in major cities and airports.",
        icon: MapPin,
    },
    {
        id: "Step 02",
        title: "Pick Your Taxi",
        description: "Browse our premium fleet and choose the vehicle that fits your style and travel needs.",
        icon: Car,
    },
    {
        id: "Step 03",
        title: "Book & Go",
        description: "Complete your secure booking in minutes. Your car will be ready and waiting for you.",
        icon: CreditCard,
    },
];

export default function ProcessSection() {
    return (
        <section className="bg-white py-24 md:py-32 overflow-hidden">
            <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-20 md:mb-28">
                    <div className="max-w-3xl">
                        <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4 block">
                            PROCESS
                        </span>
                        <h2 className="text-3xl md:text-[44px] font-extrabold text-primary mb-6 leading-[1.1] tracking-tight">
                            Taxi Transportation In 3 Simple Steps
                        </h2>
                        <p className="text-muted text-base md:text-[17px] font-medium max-w-2xl opacity-80 leading-relaxed">
                            We streamlined the taxi transportation process to get you on the road faster. No paperwork, no hidden fees, just pure driving pleasure.
                        </p>
                    </div>
                    <div className="shrink-0 pt-2">
                        <Link
                            href="/booking"
                            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-secondary/10 hover:border-secondary text-secondary font-bold text-sm transition-all duration-300 group shadow-sm bg-white"
                        >
                            Start Booking
                            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[25%] left-[10%] right-[10%] h-[1px] border-t-2 border-dashed border-border z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    {/* Icon Circle */}
                                    <div className="relative mb-10">
                                        <div className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-white shadow-xl flex items-center justify-center border border-border transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl relative z-10">
                                            <Icon className="w-12 h-12 md:w-14 md:h-14 text-secondary" strokeWidth={1.5} />
                                        </div>
                                        
                                        {/* Step Label */}
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-border z-20">
                                            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                                                {step.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted text-[15px] md:text-base leading-relaxed opacity-70 max-w-[280px]">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
