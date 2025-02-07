import { TransferRequest } from "@/types/api";
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

export const createTransferRequest = async (data: {
  accountId: string;
  amount: string;
  recipientDetails: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
}): Promise<TransferRequest> => {
  const response = await transferPost("/transfers", data);
  return response.data;
};

export const executeTransfer = async (
  transferId: string
): Promise<TransferRequest> => {
  const response = await transferPost(`/transfers/${transferId}/execute`);
  return response.data;
};

export const getTransfers = async (
  accountId: string
): Promise<TransferRequest[]> => {
  const response = await api.get(`/transfers?accountId=${accountId}`);
  return response.data;
};
