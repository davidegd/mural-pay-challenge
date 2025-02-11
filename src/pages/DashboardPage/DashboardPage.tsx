import React, { useEffect } from "react";
import { AccountsWidget } from "@/components/AccountsWidget";
import { useCustomer } from "@/hooks/useCustomer";
import { useAppContext } from "@/hooks/useAppContext";
import { Spinner } from "@heroui/spinner";
import { AddAccountWidget } from "@/components/AddAccountWidget";
import { CreateTransactionWidget } from "@/components/CreateTransactionWidget";
import { useAccounts } from "@/hooks/useAccounts";
import { useTransactions } from "@/hooks/useTransactions";
import { TransferStatusEnum } from "@/constants/common";
import { TransactionsWidget } from "@/components/TransactionsWidget";

const DashboardPage = () => {
  const customerId = localStorage.getItem("customerId");
  const {
    state: { customerName, accounts, transactions },
    dispatch,
  } = useAppContext();

  const { getCustomerData, loading, error } = useCustomer(dispatch);
  const { getCustomerAccounts } = useAccounts(dispatch);
  const { getTransactions, loadingTransactions } = useTransactions(dispatch);

  useEffect(() => {
    if (customerId) {
      getCustomerData(customerId);
      getCustomerAccounts(customerId);
      getTransactions(
        [TransferStatusEnum.InReview, TransferStatusEnum.Pending],
        5
      );
    }
  }, [customerId, customerName]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col space-y-4 items-center justify-center p-4"
        role="status"
        aria-live="polite"
      >
        <Spinner size="lg" color="primary" />
        <h2 className="text-primary text-lg">Loading account data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-background rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full"
          role="alert"
          aria-live="assertive"
        >
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => getCustomerData(customerId)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex py-4 sm:py-10">
      <div className="w-full max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-7">
          <div className="col-span-2">
            <AccountsWidget accounts={accounts || []} />
          </div>
          <div className="flex flex-col  gap-4">
            <CreateTransactionWidget />
            <AddAccountWidget />
          </div>
        </div>
        <TransactionsWidget
          loadingTransactions={loadingTransactions}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
