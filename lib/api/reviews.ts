import { api } from "./client";
import { API_ROUTES } from "@/config/routes";

export const getReviews = async () => {
    const response = await api.get(API_ROUTES.REVIEWS);
    return response.data;
};

