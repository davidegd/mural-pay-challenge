import { Account } from "./api";

export interface AppState {
  customerId?: string | null;
  customerName?: string;
  accounts?: Account[];
}
