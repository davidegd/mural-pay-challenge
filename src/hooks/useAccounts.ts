import {
  createAccount,
  getAccountById,
  getAccounts,
} from "@/services/accounts";
import { setAccountsAction } from "@/store/actions/accounts";
import { ActionType } from "@/store/actions/base-action";
import { CreateAccount } from "@/types/api";
import { useState } from "react";

export const useAccounts = (dispatch: (action: ActionType) => void) => {
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [errorAccounts, setErrorAccounts] = useState<string | null>(null);
  const [successCreation, setSuccessCreation] = useState(false);

  const getCustomerAccounts = async (customerId: string) => {
    setLoadingAccounts(true);

    try {
      const accounts = await getAccounts(customerId);
      dispatch(setAccountsAction(accounts));
    } catch (error) {
      console.error("Error:", error);
      setErrorAccounts("Failed to fetch accounts. Please try again.");
      throw error;
    } finally {
      setLoadingAccounts(false);
    }
  };

  const getCustomerAccount = async (accountId: string) => {
    setLoadingAccounts(true);

    const account = await getAccountById(accountId);
    return account;
  };

  const createCustomerAccount = async (accountInfo: CreateAccount) => {
    setLoadingAccounts(true);

    try {
      const account = await createAccount(accountInfo);
      setSuccessCreation(true);
      return account;
    } catch (error) {
      console.error("Error:", error);
      setErrorAccounts("Failed to create account. Please try again.");
    } finally {
      setLoadingAccounts(false);
    }
  };

  return {
    getCustomerAccounts,
    getCustomerAccount,
    loadingAccounts,
    createCustomerAccount,
    errorAccounts,
    successCreation,
  };
};
