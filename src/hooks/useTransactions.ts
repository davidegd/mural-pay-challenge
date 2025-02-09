import { TransferStatusEnum } from "@/constants/common";
import {
  createTransactionRequest,
  executeTransactionRequested,
  getCustomerTransactions,
} from "@/services/transactions";
import { ActionType } from "@/store/actions/base-action";
import { setTransactionsDataAction } from "@/store/actions/transactions";
import { useState } from "react";

export const useTransactions = (dispatch: (action: ActionType) => void) => {
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [errorTransactions, setErrorTransactions] = useState<string | null>(
    null
  );
  const [transactionStatus, setTransactionStatus] =
    useState<TransferStatusEnum | null>(null);

  const getTransactions = async (accountId: string, status: string) => {
    setLoadingTransactions(true);

    try {
      const transactions = await getCustomerTransactions(accountId, status);
      dispatch(setTransactionsDataAction(transactions));
    } catch (error) {
      console.error("Error:", error);
      setErrorTransactions("Failed to fetch transactions. Please try again.");
      throw error;
    } finally {
      setLoadingTransactions(false);
    }
  };

  const createTransaction = async (
    transactionData
  ): Promise<{ id: string }> => {
    const data = {
      payoutAccountId: transactionData.payoutAccountId,
      recipientsInfo: [
        {
          ...transactionData,
          recipientType: "BUSINESS",
          recipientTransferType: "FIAT",
          currencyCode: transactionData.bankDetails.currencyCode,
        },
      ],
    };
    setTransactionStatus(TransferStatusEnum.Pending);
    try {
      const response = await createTransactionRequest(data);
      if (response) {
        setTransactionStatus(null);
      }
      return response;
    } catch (error) {
      console.error("Error:", error);
      setTransactionStatus(TransferStatusEnum.Failed);
      setErrorTransactions("Failed to create transaction. Please try again.");
      throw error;
    }
  };

  const executeTransaction = async (transferRequestId: string) => {
    setTransactionStatus(TransferStatusEnum.Pending);

    try {
      const response = await executeTransactionRequested(transferRequestId);
      if (response) {
        setTransactionStatus(null);
      }
      return response;
    } catch (error) {
      console.error("Error:", error);
      setTransactionStatus(TransferStatusEnum.Failed);
      setErrorTransactions("Failed to execute transaction. Please try again.");
      throw error;
    }
  };

  return {
    getTransactions,
    createTransaction,
    errorTransactions,
    loadingTransactions,
    transactionStatus,
    setTransactionStatus,
    executeTransaction,
  };
};
