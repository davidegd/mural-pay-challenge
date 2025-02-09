import React, { useCallback, useState } from "react";
import { RecipientInfoForm } from "./RecipientInfoForm";
import { TransferFormStepsEnum, TransferStatusEnum } from "@/constants/common";
import { TransferAmountForm } from "./TransferAmountForm";
import { Account } from "@/types/api";
import { ReviewForm } from "./ReviewForm";
import { useForm } from "react-hook-form";
import { Check, CheckCheck } from "lucide-react";
import { Button } from "@heroui/button";

interface Props {
  accounts: Account[];
  transferStep: TransferFormStepsEnum;
  setTransferStep: (step: TransferFormStepsEnum) => void;
  createTransaction: (data) => Promise<{ id: string }>;
  setTransactionStatus: (status: TransferStatusEnum) => void;
  handleExecuteTransaction: (transactionId: string) => void;
}

export function TransferForm({
  accounts,
  createTransaction,
  setTransactionStatus,
  handleExecuteTransaction,
  transferStep,
  setTransferStep,
}: Props) {
  const {
    getValues,
    register,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [transferRequestId, setTransferRequestId] = useState<string | null>(
    null
  );

  const CommonFormProps = {
    register,
    setValue,
    getValues,
    watch,
    isValid,
  };

  watch();

  const handleCreateTransaction = useCallback(
    async (transferData) => {
      const response = await createTransaction(transferData);
      setTransferRequestId(response?.id);
    },
    [createTransaction, register, setValue]
  );

  const TransferStepsComponents = {
    [TransferFormStepsEnum.Amount]: (
      <TransferAmountForm
        {...CommonFormProps}
        accounts={accounts ?? []}
        onContinue={() => setTransferStep(TransferFormStepsEnum.BankDetails)}
      />
    ),
    [TransferFormStepsEnum.BankDetails]: (
      <RecipientInfoForm
        {...CommonFormProps}
        onBack={() => setTransferStep(TransferFormStepsEnum.Amount)}
        onContinue={() => setTransferStep(TransferFormStepsEnum.Review)}
      />
    ),
    [TransferFormStepsEnum.Review]: (
      <ReviewForm
        {...CommonFormProps}
        onBack={() => setTransferStep(TransferFormStepsEnum.BankDetails)}
        onContinue={() => {
          handleCreateTransaction({ ...getValues() });
          setTransferStep(TransferFormStepsEnum.Requested);
        }}
      />
    ),
    [TransferFormStepsEnum.Requested]: (
      <div className="flex flex-col items-center justify-between space-y-6 ">
        <div className="flex flex-col items-center text-lg text-primary text-center">
          <Check size={72} />
          <h2 className="font-semibold">Transaction requested successfully</h2>
        </div>
        <div>
          <p className="mb-4 font-bold">
            You need to execute the transaction to complete the process
          </p>

          <Button
            size="lg"
            color="primary"
            radius="md"
            onPress={() => {
              handleExecuteTransaction(transferRequestId);
            }}
            className="w-full text-white my-4"
          >
            Execute transaction
          </Button>
        </div>
      </div>
    ),
    [TransferFormStepsEnum.Executed]: (
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="flex flex-col items-center text-lg text-success text-center">
          <CheckCheck size={72} />
          <h2 className="font-semibold">Transaction executed successfully</h2>
        </div>
        <Button
          size="lg"
          color="success"
          radius="md"
          onPress={() => setTransactionStatus(null)}
          className="w-full text-white my-4"
        >
          Done
        </Button>
      </div>
    ),
  };

  return (
    <form className="flex flex-col w-full  space-y-4 p-6">
      {TransferStepsComponents[transferStep]}
    </form>
  );
}
