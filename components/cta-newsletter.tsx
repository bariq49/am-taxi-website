"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Map, Send } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { CompassIcon } from "./icons";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "./form/Input";
import { Button } from "./ui/button";

export default function CtaNewsletter() {
    const methods = useForm({
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (data: any) => {
        console.log("Newsletter Subscribe:", data);
    };

    return (
        <section className="bg-gray-100 py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#1a1a1a] rounded-md p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group flex-1">
                            <div className="absolute top-6 right-6 text-white/5 transform group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                                <CompassIcon width={120} height={120} />
                            </div>

                            <div className="z-10">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                    <Map className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-white text-2xl font-bold leading-tight tracking-tight mb-3">
                                    Explore new destinations with comfort
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                                    Discover hidden gems and scenic routes with our premium fleet.
                                </p>
                            </div>

                            <Link
                                href="/locations"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-600 text-white rounded-full font-bold text-xs transition-all duration-300 w-fit z-10 mt-6"
                            >
                                Start Exploring
                                <MoveRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative rounded-md overflow-hidden group min-h-[260px] flex-1">
                            <Image
                                src={IMAGES.FEATURED_BG}
                                alt="Featured Experience"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                                    Featured Experience
                                </span>
                                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Live Status
                                </span>
                            </div>

                            <div className="absolute bottom-6 left-6">
                                <p className="text-white/70 text-[10px] font-bold mb-0.5 tracking-[0.1em] uppercase">Vehicles Available</p>
                                <h4 className="text-white text-4xl font-black tracking-tighter">50+</h4>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 relative rounded-md overflow-hidden group min-h-[580px] shadow-lg flex flex-col justify-end p-8 md:p-14 lg:p-16">
                        <Image
                            src={IMAGES.NEWSLETTER_BG}
                            alt="Subscribe to newsletter"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-5 py-2 rounded-full border border-white/20 uppercase tracking-[0.15em] mb-6">
                                Subscribe
                            </span>
                            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                                Subscribe to our newsletter and get 5% off on your first ride!
                            </h2>
                            <p className="text-white/60 text-sm md:text-base lg:text-lg font-medium mb-8 md:mb-12">
                                Get the latest updates and offers directly in your inbox.
                            </p>

                            {/* Newsletter Form */}
                            <FormProvider {...methods}>
                                <form 
                                    className="relative w-full group/input" 
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                required
                                                icon={<Send className="w-5 h-5 text-gray-400" />}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="px-6 md:px-8 bg-secondary hover:bg-secondary-600 text-white rounded-md font-bold text-xs md:text-sm transition-all duration-300 shadow-lg active:scale-95 whitespace-nowrap h-[46px]"
                                        >
                                            Subscribe
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
