import { contactUs } from "@/lib/api/contact";
import { useQuery } from "@tanstack/react-query";

export const useContactUs = () => {
    return useQuery({
        queryKey: ["contact-us"],
        queryFn: contactUs,
    });
};