import Image from "next/image";
import { Star } from "lucide-react";

export interface Review {
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time?: number;
}

function AmberStars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`w-[19px] h-[19px] rounded-[2px] flex items-center justify-center ${i < rating ? "bg-amber-400" : "bg-gray-200"
                        }`}
                >
                    <Star size={11} fill="white" stroke="none" />
                </span>
            ))}
        </div>
    );
}

function VerifiedBadge() {
    return (
        <span className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-[2px] whitespace-nowrap">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <polyline points="2,6 5,9 10,3" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            VERIFIED
        </span>
    );
}

export default function TestimonialCard({ review }: { review: Review }) {
    return (
        <div className="bg-white rounded-2xl p-5 flex flex-col min-h-[250px] h-full w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
                <AmberStars rating={review.rating} />
                <VerifiedBadge />
            </div>

            <p className="text-[15px] font-semibold text-gray-900 mb-2 truncate">{review.author_name}</p>
            <p className="text-[13px] text-gray-500 leading-[1.55] flex-1 line-clamp-4">{review.text}</p>

            <div className="flex justify-between items-center mt-[18px]">
                <div className="flex items-center gap-2">
                    {review.profile_photo_url ? (
                        <Image
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            width={24}
                            height={24}
                            className="rounded-full shrink-0"
                        />
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <span className="text-[10px] text-white font-bold">{review.author_name.charAt(0)}</span>
                        </div>
                    )}
                    <span className="text-[12px] text-gray-500 truncate max-w-[100px]">{review.author_name}</span>
                </div>
                <span className="text-[12px] text-gray-400 shrink-0">{review.relative_time_description}</span>
            </div>
        </div>
    );
}

