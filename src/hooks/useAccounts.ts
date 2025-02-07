import { getAccountById, getAccounts } from "@/services/accounts";
import { setAccountsAction } from "@/store/actions/accounts";
import { ActionType } from "@/store/actions/base-action";
import { useState } from "react";

export const useAccounts = (dispatch: (action: ActionType) => void) => {
  const [loadingAccounts, setLoadingAccounts] = useState(false);

  const getCustomerAccounts = async (customerId: string) => {
    setLoadingAccounts(true);

    const accounts = await getAccounts(customerId);
    dispatch(setAccountsAction(accounts));
  };

  const getCustomerAccount = async (accountId: string) => {
    setLoadingAccounts(true);

    const account = await getAccountById(accountId);
    return account;
  };

  return { getCustomerAccounts, getCustomerAccount, loadingAccounts };
};
