import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useNewsletter = () => {
    return useMutation({
        mutationFn: subscribeToNewsletter,
        onSuccess: (data) => {
            toast.success(data.message || "You have been subscribed to our newsletter successfully");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to subscribe to newsletter. Please try again.");
        },
    });
};
