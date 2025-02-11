import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { FormField, FormStepProps } from "@/types/common";
import { AccountTypes } from "@/constants/common";

export const formFields: FormField[] = [
  {
    name: "bankDetails.accountType",
    label: "Account Type",
    type: "select",
    required: true,
    items: AccountTypes,
  },
  {
    name: "bankDetails.bankAccountNumber",
    label: "Account Number",
    placeholder: "0011223344",
    type: "input",
    required: true,
  },
  {
    name: "bankDetails.bankRoutingNumber",
    label: "Routing Number",
    placeholder: "021000021",
    type: "input",
    required: true,
  },
];

export const UsdInputs: React.FC<FormStepProps> = ({ register, setValue }) => {
  const renderField = (field: FormField) => {
    const { name, label, placeholder, type, required, items } = field;

    if (type === "select") {
      return (
        <Select
          isRequired={required}
          label={label}
          aria-label={label}
          aria-describedby={`${name}-error`}
          {...register(name, { required })}
          items={items}
        >
          {(item) => (
            <SelectItem
              value={item.code}
              key={item.code}
              onChange={() => setValue(name, item.code)}
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      );
    }

    return (
      <Input
        isRequired={required}
        label={label}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={`${name}-error`}
        {...register(name, { required })}
        onChange={(e) => setValue(name, e.target.value)}
      />
    );
  };

  return (
    <>
      {formFields.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}
    </>
  );
};
