import { api } from "./api";
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

export const createTransactionRequest = async (data) => {
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
  accountId: string,
  status: string
) => {
  const response = await api.get(`/transfer-requests`, {
    params: {
      limit: 10,
      nextId: accountId,
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
