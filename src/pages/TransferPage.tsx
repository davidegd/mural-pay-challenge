import React, { useCallback, useEffect, useState } from "react";
import { TransferForm } from "@/components/TransferForm";
import { Navigate } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext";
import { useTransactions } from "@/hooks/useTransactions";
import { Spinner } from "@heroui/spinner";
import { TransferFormStepsEnum, TransferStatusEnum } from "@/constants/common";
import { Button } from "@heroui/button";
import { TriangleAlert } from "lucide-react";
import { TransactionStepper } from "@/components/TransferStepper";
export function TransferPage() {
  const {
    state: { accounts, customerId },
  } = useAppContext();
  const {
    hooks: { getCustomerAccounts },
    dispatch,
  } = useAppContext();
  const {
    createTransaction,
    transactionStatus,
    setTransactionStatus,
    executeTransaction,
  } = useTransactions(dispatch);

  const [transferStep, setTransferStep] = useState(
    TransferFormStepsEnum.Amount
  );

  useEffect(() => {
    if (!accounts) {
      getCustomerAccounts(customerId);
    }
  }, [accounts, customerId, getCustomerAccounts]);

  const handleExecuteTransaction = useCallback(
    async (transactionId) => {
      const response = await executeTransaction(transactionId);
      if (response) {
        setTransferStep(TransferFormStepsEnum.Executed);
        setTransactionStatus(null);
      }
    },
    [executeTransaction, setTransactionStatus]
  );

  if (!customerId) {
    return <Navigate to="/" replace />;
  }
  const TransactionStatus = {
    [TransferStatusEnum.Pending]: (
      <div className="flex flex-col items-center justify-center">
        <Spinner
          size="lg"
          label="Processing transaction..."
          labelColor="primary"
        />
      </div>
    ),
    [TransferStatusEnum.Failed]: (
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="flex flex-col items-center text-lg text-pink-600 text-center">
          <TriangleAlert size={72} />
          <h2 className="font-semibold">Transaction failed</h2>
          <p>Failed to create transaction. Please try again.</p>
        </div>
        <Button
          size="lg"
          color="danger"
          radius="md"
          onPress={() => {
            setTransactionStatus(null);
            setTransferStep(TransferFormStepsEnum.Amount);
          }}
        >
          Go back
        </Button>
      </div>
    ),
  };

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-foreground mb-6 mx-auto">
        New Transaction
      </h2>
      <div className="flex  w-full  items-center justify-center ">
        <TransactionStepper currentStep={transferStep} />
      </div>

      <div className="flex  w-full mx-auto sm:w-1/2 items-center justify-center min-h-80  bg-background shadow rounded-md ">
        {transactionStatus ? (
          <>{TransactionStatus[transactionStatus]}</>
        ) : (
          <TransferForm
            accounts={accounts}
            createTransaction={createTransaction}
            handleExecuteTransaction={handleExecuteTransaction}
            setTransactionStatus={setTransactionStatus}
            transferStep={transferStep}
            setTransferStep={setTransferStep}
          />
        )}
      </div>
    </div>
  );
}
