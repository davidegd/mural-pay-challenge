import { api } from "@/services/api";
import { CustomerData } from "@/types/api";

export const createCustomer = async (customerData: CustomerData) => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const getKYCLink = async (customerId: string) => {
  try {
    const response = await api.get(`/customers/${customerId}/kyc-link`);
    return response.data;
  } catch (error) {
    console.error("Error fetching KYC link:", error);
    throw error;
  }
};

export const getCustomer = async (customerId: string) => {
  try {
    const response = await api.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};
