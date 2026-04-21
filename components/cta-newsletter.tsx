"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Map, Send } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";

export default function CtaNewsletter() {
    return (
        <section className="bg-gray py-24 md:py-32">
            <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Left Column - Two Stacked Blocks */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Top Block - Dark Explore */}
                        <div className="bg-[#1a1a1a] rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[340px] relative overflow-hidden group flex-1">
                            {/* Subtle Background Compass Icon */}
                            <div className="absolute top-8 right-8 text-white/5 transform group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                            </div>
                            
                            <div className="z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8">
                                    <Map className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-white text-3xl font-bold leading-tight tracking-tight mb-4">
                                    Explore new destinations with comfort
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed max-w-[260px]">
                                    Discover hidden gems and scenic routes with our premium fleet.
                                </p>
                            </div>
                            
                            <Link 
                                href="/locations"
                                className="inline-flex items-center gap-3 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm transition-all duration-300 w-fit z-10 mt-8"
                            >
                                Start Exploring
                                <MoveRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Bottom Block - Featured Image */}
                        <div className="relative rounded-[32px] overflow-hidden group min-h-[300px] shadow-lg flex-1">
                            <Image
                                src={IMAGES.FEATURED_BG}
                                alt="Featured Experience"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            
                            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
                                    Featured Experience
                                </span>
                                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Live Status
                                </span>
                            </div>

                            <div className="absolute bottom-8 left-8">
                                <p className="text-white/70 text-[11px] font-bold mb-1 tracking-[0.1em] uppercase">Vehicles Available Now</p>
                                <h4 className="text-white text-5xl font-extrabold tracking-tighter">50+</h4>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Large Newsletter Block */}
                    <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden group min-h-[660px] shadow-2xl flex flex-col justify-end p-8 md:p-14 lg:p-20">
                        <Image
                            src={IMAGES.NEWSLETTER_BG}
                            alt="Subscribe to newsletter"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                        
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[11px] font-extrabold px-6 py-2.5 rounded-full border border-white/20 uppercase tracking-[0.25em] mb-8">
                                Subscribe
                            </span>
                            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                                Beyond Subscribe to the newsletter and get 5% off on your first ride!
                            </h2>
                            <p className="text-white/60 text-base md:text-lg lg:text-xl font-medium mb-10 md:mb-14">
                                Get the latest updates and offers directly in your inbox.
                            </p>
                            
                            {/* Input Field */}
                            <form className="relative max-w-xl group/input" onSubmit={(e) => e.preventDefault()}>
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Send className="text-white/30 w-5 h-5 group-focus-within/input:text-orange-500 transition-colors" />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="Enter you remail address here........"
                                    className="w-full h-16 md:h-20 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[28px] pl-16 pr-36 md:pr-44 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all text-sm md:text-lg"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-6 md:px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl md:rounded-[22px] font-bold text-sm md:text-base transition-all duration-300 shadow-lg active:scale-95">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
