import { combinedReducers } from "@/store/reducers";
import { useImmerReducer } from "use-immer";
import { useCustomer } from "./useAuth";
import { useAccounts } from "./useAccounts";

export const useAppStore = (customerId?: string | null) => {
  const initialState = {
    customerId,
  };

  const [state, dispatch] = useImmerReducer(combinedReducers, initialState);
  const hooks = {
    ...useCustomer(dispatch),
    ...useAccounts(dispatch),
  };

  return { state, dispatch, hooks };
};
