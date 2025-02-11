import React, { useCallback, useState } from "react";
import { RecipientInfoForm } from "./RecipientInfoForm";
import { TransferFormStepsEnum, TransferStatusEnum } from "@/constants/common";
import { TransferAmountForm } from "./TransferAmountForm";
import { Account } from "@/types/api";
import { ReviewForm } from "./ReviewForm";
import { useForm } from "react-hook-form";
import { Check, CheckCheck } from "lucide-react";
import { Button } from "@heroui/button";
import { TransferRequested } from "./TransferRequested";
import { TransferExecuted } from "./TransferExecuted";

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

  const handleCreateTransaction = async (transactionData) => {
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
    try {
      const response = await createTransaction(data);

      setTransferRequestId(response.id);
      console.log("RRRRR", response);
    } catch (error) {
      console.error("Error:", error);
      setTransactionStatus(TransferStatusEnum.Failed);
    }
    return;
  };
  console.log(transferRequestId);
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
      <TransferRequested
        transferRequestId={transferRequestId}
        handleExecuteTransaction={handleExecuteTransaction}
        setTransactionStatus={setTransactionStatus}
        setTransferStep={setTransferStep}
      />
    ),
    [TransferFormStepsEnum.Executed]: (
      <TransferExecuted
        onContinue={() => {
          setTransactionStatus(null);
          setTransferStep(TransferFormStepsEnum.Amount);
        }}
      />
    ),
  };

  return (
    <form className="flex flex-col w-full  space-y-4 p-6">
      {TransferStepsComponents[transferStep]}
    </form>
  );
}
