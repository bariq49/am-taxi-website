import API_ROUTES from "@/config/routes";
import { api } from "./client";


export interface ContactPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const contactUs = async (payload: ContactPayload) => {
    const response = await api.post(`${API_ROUTES.CONTACT}`, payload);
    return response.data;
};
