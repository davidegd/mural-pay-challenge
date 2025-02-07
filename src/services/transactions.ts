import { api } from "./api";
import { TRANSFER_API_KEY } from "@/constants/api";

const transferPost = async (url: string, data?: unknown) => {
  return await api.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TRANSFER_API_KEY}`,
    },
  });
};

export const createTransferRequest = async (data) => {
  const response = await transferPost("/transfer-request", data);
  return response.data;
};

export const executeTransfer = async (transferId: string) => {
  const response = await transferPost(`/transfers/${transferId}/execute`);
  return response.data;
};

export const getTransfers = async (accountId: string) => {
  const response = await api.get(`/transfers?accountId=${accountId}`);
  return response.data;
};
