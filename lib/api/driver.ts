import API_ROUTES from "@/config/routes";
import { api } from "./client";

export interface DriverRegistrationPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    licenseNumber: string;
    experience: string;
    chauffeurPassFront: string;
    chauffeurPassBack: string;
    kiwaPermit: string;
    insurancePolicy: string;
    bankpas: string;
    kvkExtract: string;
}

export const registerDriver = async (payload: DriverRegistrationPayload) => {
    const response = await api.post(`${API_ROUTES.DRIVERS}`, payload);
    return response.data;
};
