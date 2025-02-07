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

export interface TransferRequest {
  id: string;
  amount: string;
  status: "pending" | "executed";
  recipientDetails: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  createdAt: string;
}
