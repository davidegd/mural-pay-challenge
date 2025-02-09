import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { AccountTypes, ColombiaDocumentTypes } from "@/constants/common";
import { FormStepProps } from "@/types/common";

export const CopInputs: React.FC<FormStepProps> = ({
  register,
  setValue,
  getValues,
  watch,
}) => {
  watch();
  return (
    <form className="space-y-4">
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
            value={item.code}
            onChange={() => setValue("bankDetails.accountType", item.code)}
          >
            {item.name}
          </SelectItem>
        )}
      </Select>

      <Input
        isRequired
        {...register(`bankDetails.bankAccountNumber`, {
          required: true,
        })}
        label="Account Number"
        onChange={() =>
          setValue(
            "bankDetails.bankAccountNumber",
            getValues("bankDetails.bankAccountNumber")
          )
        }
        placeholder="0011223344"
      />
      <Select
        isRequired
        label="Document Type"
        {...register(`bankDetails.documentType`, {
          required: true,
        })}
      >
        {ColombiaDocumentTypes.map((type) => (
          <SelectItem
            value={type.value}
            onChange={() => setValue("bankDetails.documentType", type.value)}
          >
            {type.name}
          </SelectItem>
        ))}
      </Select>
      <Input
        isRequired
        {...register(`bankDetails.documentNumber`, {
          required: true,
        })}
        label="Document Number"
        onChange={() =>
          setValue(
            "bankDetails.documentNumber",
            getValues("bankDetails.documentNumber")
          )
        }
        placeholder="123456789"
      />
    </form>
  );
};
