import { FormStepProps } from "@/types/common";
import { formatAmount } from "@/utils/formatter";
import { Button, Input } from "@heroui/react";
import { NotepadText, SendIcon } from "lucide-react";
import React, { ReactNode } from "react";

interface TransactionDetail extends Partial<FormStepProps> {
  label: string;
  value: string;
  formatter?: (value: unknown) => string | ReactNode;
}

export const ReviewForm: React.FC<FormStepProps> = ({
  onContinue,
  onBack,
  register,
  watch,
}) => {
  const transactionDetails: TransactionDetail[] = [
    {
      label: "Amount",
      value: "tokenAmount",
      formatter: (value) =>
        `${formatAmount(value)} ${watch("bankDetails.currencyCode")}`,
    },
    {
      label: "Recipient",
      value: "name",
    },
    {
      label: "Bank name",
      value: "bankDetails.bankName",
    },
    {
      label: "Bank account",
      value: "bankDetails.accountType",
      formatter: (value) =>
        `${value} - ${
          watch("bankDetails.bankAccountNumber") ?? watch("bankDetails.iban")
        }`,
    },
  ];

  return (
    <>
      <p className="font-medium text-foreground text-lg flex gap-2 items-center ">
        Review Transaction <NotepadText />
      </p>
      <p className="text-sm mb-6 text-foreground">
        Please review the transaction details before requesting it.
      </p>

      <div className="space-y-4 my-5 border-b border-neutral-200 pb-3">
        {transactionDetails.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between text-foreground"
            aria-label={detail.label}
          >
            <div className="flex items-center space-x-2">
              <span className="text-foreground-700">{detail.label}</span>
            </div>
            <span className="text-sm font-semibold ">
              {detail.formatter
                ? (detail.formatter(watch(detail.value)) as ReactNode) || ""
                : ((watch(detail.value) ?? "") as ReactNode)}
            </span>
          </div>
        ))}
      </div>

      <Input
        label="Description (optional)"
        placeholder="Add a short description"
        {...register("memo")}
        size="lg"
        className="my-3"
        aria-label="Description"
        aria-describedby="memo-description"
      />

      <div className="flex w-full justify-between space-x-8 pt-4">
        <Button
          onPress={onBack}
          size="lg"
          radius="md"
          variant="light"
          color="secondary"
          className="w-full"
          aria-label="Back"
        >
          Back
        </Button>
        <Button
          onPress={onContinue}
          size="lg"
          radius="md"
          color="primary"
          className="w-full"
          endContent={<SendIcon />}
          aria-label="Confirm transaction"
        >
          Request transaction
        </Button>
      </div>
    </>
  );
};
