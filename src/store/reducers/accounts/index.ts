import { ActionType } from "@/store/actions/base-action";
import { Account } from "@/types/api";
import { AppState } from "@/types/appState";

export const setAccounts = (state: AppState, action: ActionType) => {
  state.accounts = action.payload as Account[];
};
