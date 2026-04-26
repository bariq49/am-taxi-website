import { uploadImage } from "@/lib/api/upload";
import { useMutation } from "@tanstack/react-query";

export const useUpload = () => {
    return useMutation({
        mutationFn: (file: File) => uploadImage(file, "partners"),
    });
};
