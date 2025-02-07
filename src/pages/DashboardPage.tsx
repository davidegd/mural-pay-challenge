import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AccountDetails, AccountsWidget } from "@/components/AccountsWidget";
import { TransferForm } from "@/components/TransferForm";
import { TransferList } from "@/components/TransferList";
import { getAccount, getTransfers } from "@/services/api";
import type { Account, TransferRequest } from "@/types/api";
import { useCustomer } from "@/hooks/useAuth";
import { useAppContext } from "@/hooks/useAppContext";
import { Spinner } from "@heroui/spinner";
import { AddAccountWidget } from "@/components/AddAccountWidget";
import { CreateTransactionWidget } from "@/components/CreateTransactionWidget";
import { useAccounts } from "@/hooks/useAccounts";
export function DashboardPage() {
  const customerId = localStorage.getItem("customerId");
  const {
    state: { customerName, accounts },
    dispatch,
  } = useAppContext();
  const [transfers, setTransfers] = useState<TransferRequest[]>([]);

  const { getCustomerData, loading, error } = useCustomer(dispatch);
  const { getCustomerAccounts } = useAccounts(dispatch);

  useEffect(() => {
    if (customerId) {
      getCustomerData(customerId);
      getCustomerAccounts(customerId);
    }
  }, [customerId, customerName]);

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen  flex flex-col space-y-4 items-center justify-center p-4">
        <Spinner size="lg" />
        <div className="text-lg text-gray-600">Loading account data</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => getCustomerData(customerId)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex py-4 sm:py-6">
      <div className="w-full max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6">
          <div className="col-span-2">
            <AccountsWidget accounts={accounts || []} />
          </div>
          <div className="flex flex-col  gap-4">
            <CreateTransactionWidget />
            <AddAccountWidget onAddAccount={() => {}} />
          </div>
        </div>
        <TransferList transfers={transfers} onTransferExecuted={() => {}} />
      </div>
    </div>
  );
}
