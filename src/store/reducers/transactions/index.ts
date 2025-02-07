import { ActionType } from "@/store/actions/base-action";
import { AppState } from "@/types/appState";

export const setTransactions = (state: AppState, action: ActionType) => {
  state.transactions = action.payload as unknown[];
};
