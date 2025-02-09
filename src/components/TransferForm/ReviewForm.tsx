import { formatAmount } from "@/utils/formatter";
import { Button, Input } from "@heroui/react";
import { NotepadText, SendIcon } from "lucide-react";
import React from "react";

export const ReviewForm = ({
  onContinue,
  onBack,
  register,
  setValue,
  getValues,
}) => {
  return (
    <>
      <p className="font-medium text-foreground  text-lg flex gap-2 items-center">
        Review Transaction <NotepadText />
      </p>
      <p className="text-sm mb-6 ">
        Please review the transaction details before request it.
      </p>

      <div className="space-y-4 my-5 border-b border-neutral-200 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Amount</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {formatAmount(getValues("tokenAmount"))}{" "}
            {getValues("bankDetails.currencyCode")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Recipient</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {getValues("name")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Bank name</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {getValues("bankDetails.bankName")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Bank account</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {getValues("bankDetails.accountType")} -{" "}
            {getValues("bankDetails.bankAccountNumber") ??
              getValues("bankDetails.iban")}
          </span>
        </div>
      </div>
      <Input
        label="Description (optional)"
        placeholder="Add a short description"
        {...register("memo")}
        size="lg"
        className="my-3"
        onChange={(e) => setValue("memo", e.target.value)}
      />
      <input
        type="text"
        {...register("transferRequestId", { value: "" })}
        hidden
      />
      <div className="flex w-full justify-between  space-x-8 pt-4">
        <Button
          onPress={onBack}
          size="lg"
          radius="md"
          variant="light"
          color="secondary"
          className="w-full"
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
        >
          Confirm transaction
        </Button>
      </div>
    </>
  );
};
