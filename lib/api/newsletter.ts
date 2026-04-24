import API_ROUTES from "@/config/routes";
import { api } from "./client";

export interface NewsletterPayload {
    email: string;
}

export const subscribeToNewsletter = async (payload: NewsletterPayload) => {
    const response = await api.post(`${API_ROUTES.NEWSLETTER}`, payload);
    return response.data;
};
