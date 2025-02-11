import React, { useMemo } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { formatAmount } from "@/utils/formatter";
import { Currencies } from "@/constants/common";
import { ArrowRight, WalletCards } from "lucide-react";
import { Account } from "@/types/api";
import { FormStepProps } from "@/types/common";

interface TransferAmountFormProps extends FormStepProps {
  accounts: Account[];
}

export const TransferAmountForm: React.FC<TransferAmountFormProps> = ({
  accounts,
  onContinue,
  register,
  setValue,
  getValues,
  watch,
  isValid,
}) => {
  const maxAmount = useMemo(
    () =>
      accounts?.find((account) => account.id === getValues("payoutAccountId"))
        ?.balance.balance,
    [accounts, getValues("payoutAccountId")]
  );

  watch();

  return (
    <>
      <p className="font-medium text-foreground  text-lg flex gap-2 items-center">
        Payout Account <WalletCards size={20} />
      </p>
      <Select
        {...register("payoutAccountId", { required: "required" })}
        label="Select payout Account"
        size="lg"
        variant="flat"
        isRequired
        aria-label="Select payout Account"
        aria-describedby="payoutAccountId-error"
      >
        {Array.isArray(accounts) &&
          accounts.length &&
          accounts.map((account) => (
            <SelectItem
              textValue={account?.name}
              key={account?.id}
              onSelect={() => {
                setValue("payoutAccountId", account?.id);
              }}
            >
              <div className="flex justify-between items-center w-full flex-wrap">
                <div className="flex flex-col ">
                  <p>{account.name}</p>
                  <p>{account.address}</p>
                </div>
                <span className="font-semibold text-primary">
                  {formatAmount(account?.balance.balance ?? 0)}
                </span>
              </div>
            </SelectItem>
          ))}
      </Select>

      <Input
        {...register("tokenAmount", { required: "required" })}
        onChange={(e) => setValue("tokenAmount", e.target.value)}
        label="You will send"
        type="number"
        id="tokenAmount"
        required
        min="0"
        step="0.01"
        isRequired
        size="lg"
        placeholder={formatAmount(1000)}
        endContent={Currencies[0].code}
        max={maxAmount}
        maxLength={maxAmount?.toString()?.length}
        isDisabled={!getValues("payoutAccountId")}
        aria-label="Amount to send"
        aria-describedby="tokenAmount-error"
      />

      <div className="flex justify-end pt-6">
        <Button
          color="primary"
          size="lg"
          className="w-1/2"
          radius="md"
          onPress={onContinue}
          endContent={<ArrowRight />}
          isDisabled={!isValid}
          aria-label="Next"
        >
          Next
        </Button>
      </div>
    </>
  );
};
