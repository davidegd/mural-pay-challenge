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

export type TransactionStatus =
  | "IN_REVIEW"
  | "PENDING"
  | "EXECUTED"
  | "FAILED"
  | "CANCELLED";

export interface TransactionRequest {
  payoutAccountId: string;
  memo: string;
  recipientsInfo: {
    name: string;
    currencyCode: string;
    tokenAmount: number;
    email?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    bankDetails: {
      bankName: string;
      bankAccountOwnerName: string;
      currencyCode: string;
      accountType: string;
      bankAccountNumber: string;
      bankRoutingNumber: string;
      bankCode?: string;
      documentNumber?: string;
      documentType?: string;
      physicalAddress: {
        address1: string;
        address2?: string;
        country: string;
        state: string;
        city: string;
        zip: string;
      };
    };
  }[];
}

export interface CreatedTransactionResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  payoutAccountId: string;
  memo: string;
  status: TransactionStatus;
  recipientsInfo: {
    id: string;
    currencyCode: string;
    tokenAmount: number;
    createdAt: string;
    updatedAt: string;
    withdrawalRequestStatus: "AWAITING_SOURCE_DEPOSIT" | "COMPLETED" | "FAILED";
  }[];
}
