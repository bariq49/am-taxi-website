import { getReviews } from "@/lib/api/reviews";
import { useQuery } from "@tanstack/react-query";

export const useReviewsQuery = () => {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: getReviews,
    });
};
