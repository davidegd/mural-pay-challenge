import { Account, CreateAccount } from "@/types/api";
import { api } from "./api";

export const getAccounts = async (customerId: string): Promise<Account> => {
  const response = await api.get(`/accounts`);
  return response.data;
};

export const getAccountById = async (accountId: string): Promise<Account> => {
  const response = await api.get(`/accounts/${accountId}`);
  return response.data;
};

export const createAccount = async (
  accountInfo: CreateAccount
): Promise<CreateAccount> => {
  const response = await api.post(`/accounts`, accountInfo);
  return response.data;
};
