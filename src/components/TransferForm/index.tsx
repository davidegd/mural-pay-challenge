import React from "react";
import { RecipientInfoForm } from "./RecipientInfoForm";
import { TransferFormStepsEnum, TransferStatusEnum } from "@/constants/common";
import { TransferAmountForm } from "./TransferAmountForm";
import { Account, CreatedTransactionResponse } from "@/types/api";
import { ReviewForm } from "./ReviewForm";
import { useForm } from "react-hook-form";
import { TransferRequested } from "./TransferRequested";
import { TransferExecuted } from "./TransferExecuted";
import { useLocation } from "react-router-dom";

interface Props {
  accounts: Account[];
  transferStep: TransferFormStepsEnum;
  setTransferStep: (step: TransferFormStepsEnum) => void;
  createTransaction: (data) => Promise<CreatedTransactionResponse>;
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
  const location = useLocation();

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
    await createTransaction(data).then((response) => {
      location.state = { transferRequestId: response.id };
      setTransferStep(TransferFormStepsEnum.Requested);
    });
  };

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
        transferRequestId={location?.state?.transferRequestId}
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
