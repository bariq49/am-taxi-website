import axios, { AxiosError } from "axios";

const baseURL = process.env.BACKEND_URL;

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError<any>) => {
        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Something went wrong";

        if (error.response?.status === 401) {
            console.warn("Unauthorized");
        }
        return Promise.reject({
            message,
            status: error.response?.status,
        });
    }
);