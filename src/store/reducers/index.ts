import { AppState } from "@/types/appState";
import { ActionType } from "../actions/base-action";
import { SET_CUSTOMER_DATA_ACTION } from "../actions/customer";
import { customerData } from "./customer";
import { setAccounts } from "./accounts";
import { SET_ACCOUNTS_ACTION } from "../actions/accounts";

const reducers: {
  [type: string]: (draftState: AppState, action: ActionType) => void;
} = {
  [SET_CUSTOMER_DATA_ACTION]: customerData,
  [SET_ACCOUNTS_ACTION]: setAccounts,
};

export const combinedReducers = (state: AppState, action: ActionType) => {
  reducers[action.type](state, action);
};
