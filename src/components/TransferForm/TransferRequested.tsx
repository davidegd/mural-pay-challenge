import { TransferFormStepsEnum, TransferStatusEnum } from "@/constants/common";
import { Button } from "@heroui/react";
import { Check } from "lucide-react";
import React from "react";

interface TransferRequestedProps {
  setTransferStep: (step: TransferFormStepsEnum) => void;
  setTransactionStatus: (status: TransferStatusEnum) => void;
  handleExecuteTransaction: (transactionId: string) => void;
  transferRequestId: string;
}

export const TransferRequested: React.FC<TransferRequestedProps> = ({
  setTransferStep,
  setTransactionStatus,
  handleExecuteTransaction,
  transferRequestId,
}) => {
  console.log("ttt", transferRequestId);
  return (
    <div className="flex flex-col items-center justify-between space-y-6 ">
      <div className="flex flex-col items-center text-lg text-primary text-center">
        <Check size={72} />
        <h2 className="font-semibold">Transaction requested successfully</h2>
      </div>
      <div>
        <p className="mb-4 font-bold">
          You need to execute the transaction to complete the process
        </p>

        <div className="flex space-x-4">
          <Button
            size="lg"
            variant="light"
            color="secondary"
            radius="md"
            onPress={() => {
              setTransferStep(TransferFormStepsEnum.Amount);
              setTransactionStatus(null);
            }}
            className="w-full  my-4"
            aria-label="Back"
          >
            Do it later
          </Button>
          <Button
            size="lg"
            color="primary"
            radius="md"
            onPress={() => {
              handleExecuteTransaction(transferRequestId);
            }}
            className="w-full text-white my-4"
            aria-label="Next"
          >
            Execute transaction
          </Button>
        </div>
      </div>
    </div>
  );
};
