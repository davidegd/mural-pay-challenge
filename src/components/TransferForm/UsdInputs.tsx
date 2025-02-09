import React from "react";
import { useForm } from "react-hook-form";
import { Input, Select, SelectItem } from "@heroui/react";
import { AccountTypes } from "@/constants/common";
import { FormStepProps } from "@/types/common";

export const UsdInputs: React.FC<FormStepProps> = ({
  register,
  setValue,
  getValues,
  watch,
}) => {
  useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  watch();
  return (
    <>
      <Select
        isRequired
        label="Account Type"
        {...register(`bankDetails.accountType`, {
          required: true,
        })}
        items={AccountTypes}
      >
        {(item) => (
          <SelectItem
            value={item?.code}
            key={item?.code}
            onChange={() => setValue("bankDetails.accountType", item?.code)}
          >
            {item?.name}
          </SelectItem>
        )}
      </Select>

      <Input
        isRequired
        {...register(`bankDetails.bankAccountNumber`, {
          required: true,
        })}
        placeholder="0011223344"
        label="Account Number"
        onChange={() =>
          setValue(
            "bankDetails.bankAccountNumber",
            getValues("bankDetails.bankAccountNumber")
          )
        }
      />
      <Input
        isRequired
        {...register(`bankDetails.bankRoutingNumber`, {
          required: true,
        })}
        placeholder="021000021"
        label="Routing Number"
        onChange={() =>
          setValue(
            "bankDetails.bankRoutingNumber",
            getValues("bankDetails.bankRoutingNumber")
          )
        }
      />
    </>
  );
};
