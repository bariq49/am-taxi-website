"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "What do I need to booking a car?",
        answer: "You will need a valid driver's license, a credit card in the driver's name for the security deposit, and a valid ID or passport."
    },
    {
        question: "Is insurance included in the rental price?",
        answer: "Yes, basic insurance is included. However, we offer additional coverage options for your peace of mind during your journey."
    },
    {
        question: "Can I pick up the car in one city and drop it off in another?",
        answer: "Absolutely. We offer one-way rentals across major cities in the Netherlands. Additional fees may apply based on the location."
    },
    {
        question: "What is your fuel policy?",
        answer: "We typically operate on a full-to-full policy. You'll receive the car with a full tank and should return it full to avoid extra charges."
    }
];

export function FAQAccordion() {
    return (
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full flex flex-col gap-4">
            {FAQS.map((faq, index) => (
                <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-none group cursor-pointer"
                >
                    <div className="rounded-md border border-gray-100 transition-all duration-500 bg-white shadow-sm group-data-[state=open]:shadow-2xl group-data-[state=open]:shadow-gray-200/60 group-data-[state=open]:border-transparent group-hover:border-gray-200 cursor-pointer overflow-hidden">
                        <AccordionTrigger className="w-full flex items-center justify-between text-left px-6 py-4 hover:no-underline group outline-none cursor-pointer  ">
                            <span className="text-base md:text-lg font-semibold transition-colors duration-300 text-gray-900 cursor-pointer group-data-[state=open]:text-secondary">
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 md:px-8">
                            <div className="pb-0">
                                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mt-2">
                                    {faq.answer}
                                </p>
                            </div>
                        </AccordionContent>
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
