import API_ROUTES from "@/config/routes";
import { api } from "./client";

export interface UploadResponse {
    url: string;
    publicId: string;
}

export const uploadImage = async (file: File, folder: string = "partners"): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await api.post<any>(
        `${API_ROUTES.UPLOAD_PUBLIC}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    
    // response is the body due to interceptor: { success: true, data: { url, public_id } }
    return {
        url: response.data.url,
        publicId: response.data.public_id
    };
};
