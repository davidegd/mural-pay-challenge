import { baseAction } from "../base-action";

export const SET_ACCOUNTS_ACTION = "SET_ACCOUNTS_ACTION";

export const setAccountsAction = (payload: unknown) =>
  baseAction(SET_ACCOUNTS_ACTION, payload);
