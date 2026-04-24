"use client";
import { FAQAccordion } from "./FAQAccordion";

export default function ContactFAQSection() {
    return (
        <section className="pb-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Side */}
                    <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:sticky lg:top-32 h-fit">
                        <div className="flex flex-col gap-2">
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                                FAQ
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                Frequently Asked <br className="hidden lg:block" /> Questions
                            </h2>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            Everything you need to know about booking a vehicle with us. <br className="hidden md:block" />
                            Can't find the answer you're looking for?
                        </p>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <FAQAccordion />
                    </div>
                </div>
            </div>
        </section>
    );
}
