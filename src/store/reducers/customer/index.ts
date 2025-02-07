import { AppState } from "@/types/appState";
import { ActionType } from "../../actions/base-action";

export const customerData = (state: AppState, action: ActionType) => {
  state.customerId = (action.payload as { id: string }).id;
  state.customerName = (action.payload as { name: string }).name;
};
