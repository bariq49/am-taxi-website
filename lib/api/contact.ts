import API_ROUTES from "@/config/routes";
import { api } from "./client";


export interface ContactPayload {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
}

export const contactUs = async () => {
    const response = await api.get(`${API_ROUTES.CONTACT}`);
    return response.data;
};
