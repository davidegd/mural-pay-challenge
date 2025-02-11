import { CreatedTransactionResponse } from "@/types/api";
import { api, clearCache } from "./api";
import { API_KEY, TRANSFER_API_KEY } from "@/constants/api";

const transferPost = async (url: string, data?: unknown) => {
  return await api.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "mural-account-api-key": TRANSFER_API_KEY,
    },
  });
};

export const createTransactionRequest = async (
  data
): Promise<CreatedTransactionResponse> => {
  const response = await transferPost("/transfer-requests", data);
  return response.data;
};

export const executeTransactionRequested = async (
  transferRequestId: string
) => {
  const response = await transferPost(`/transfer-requests/execute`, {
    transferRequestId,
  });
  return response.data;
};

export const getCustomerTransactions = async (
  status: string[],
  limit: number = 20
) => {
  clearCache("/transfer-requests");
  const response = await api.get(`/transfer-requests`, {
    params: {
      limit,
      status,
    },
  });
  return response.data;
};

export const getTransactionFee = async (currency: string, amount: number) => {
  const response = await api.get(
    `/tranfer-fees?tokenAmount=${amount}&fiatCurrencyCodes=${currency}`
  );
  return response.data;
};
