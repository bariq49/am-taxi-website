import { registerDriver } from "@/lib/api/driver";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDriverRegistration = () => {
    return useMutation({
        mutationFn: registerDriver,
        onSuccess: () => {
            toast.success("Application submitted successfully! We will contact you soon.");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to submit application. Please try again.";
            toast.error(message);
        },
    });
};
