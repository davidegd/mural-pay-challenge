export interface CustomerData {
  email?: string;
  name?: string;
  organizationType?: string;
}

export interface CreateAccount {
  name: string;
  description?: string;
  organizationCustomerId?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: { balance: number; tokenSymbol: string };
  address: string;
  customer: object;
}
