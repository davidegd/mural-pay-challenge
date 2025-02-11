import { useState } from "react";
import { CustomerData } from "@/types/api";
import { createCustomer, getCustomer, getKYCLink } from "@/services/customer";
import { setCustomerDataAction } from "@/store/actions/customer";
import { ActionType } from "@/store/actions/base-action";

export const useCustomer = (dispatch: (action: ActionType) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewCustomer = async (customerData: CustomerData) => {
    setLoading(true);
    setError(null);

    try {
      const customer = await createCustomer(customerData);
      console.log("Customer created:", customer);

      const kycLinkResponse = await getKYCLink(customer.id);
      console.log("KYC Link:", kycLinkResponse.kycLink);

      localStorage.setItem("customerId", customer.id);

      return { customer, kycLink: kycLinkResponse.kycLink };
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create customer. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCustomerData = async (customerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const customer = await getCustomer(customerId);
      dispatch(setCustomerDataAction(customer));
      return customer;
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch customer data. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createNewCustomer, getCustomerData, loading, error };
};
