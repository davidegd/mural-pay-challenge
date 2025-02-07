import { baseAction } from "../base-action";

export const SET_TRANSACTIONS_DATA_ACTION = "SET_TRANSACTIONS_DATA_ACTION";

export const setTransactionsDataAction = (payload: unknown) =>
  baseAction(SET_TRANSACTIONS_DATA_ACTION, payload);
