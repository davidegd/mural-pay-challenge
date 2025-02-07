import { baseAction } from "../base-action";

export const SET_CUSTOMER_DATA_ACTION = "SET_CUSTOMER_DATA_ACTION";

export const setCustomerDataAction = (payload: unknown) =>
  baseAction(SET_CUSTOMER_DATA_ACTION, payload);
