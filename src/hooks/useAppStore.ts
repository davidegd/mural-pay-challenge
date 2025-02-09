import { combinedReducers } from "@/store/reducers";
import { useImmerReducer } from "use-immer";
import { useCustomer } from "./useAuth";
import { useAccounts } from "./useAccounts";
import { useTransactions } from "./useTransactions";

export const useAppStore = (customerId?: string | null) => {
  const initialState = {
    customerId,
  };

  const [state, dispatch] = useImmerReducer(combinedReducers, initialState);
  const hooks = {
    ...useCustomer(dispatch),
    ...useAccounts(dispatch),
    ...useTransactions(dispatch),
  };

  return { state, dispatch, hooks };
};
