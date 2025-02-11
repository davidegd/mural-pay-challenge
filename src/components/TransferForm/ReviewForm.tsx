import { formatAmount } from "@/utils/formatter";
import { Button, Input } from "@heroui/react";
import { NotepadText, SendIcon } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TransactionDetail {
  label: string;
  value: string;
  formatter?: (value: any) => string;
}

export const ReviewForm = ({ onContinue, onBack }) => {
  const { register, watch } = useFormContext();

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
      <p className="font-medium text-foreground text-lg flex gap-2 items-center">
        Review Transaction <NotepadText />
      </p>
      <p className="text-sm mb-6">
        Please review the transaction details before requesting it.
      </p>

      <div className="space-y-4 my-5 border-b border-neutral-200 pb-3">
        {transactionDetails.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between"
            aria-label={detail.label}
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{detail.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {detail.formatter
                ? detail.formatter(watch(detail.value))
                : watch(detail.value)}
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
          Confirm transaction
        </Button>
      </div>
    </>
  );
};
