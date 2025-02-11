import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { AccountTypes, ColombiaDocumentTypes } from "@/constants/common";
import { FormField, FormStepProps } from "@/types/common";

const formFields: FormField[] = [
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
    name: "bankDetails.documentType",
    label: "Document Type",
    type: "select",
    required: true,
    items: ColombiaDocumentTypes,
  },
  {
    name: "bankDetails.documentNumber",
    label: "Document Number",
    placeholder: "123456789",
    type: "input",
    required: true,
  },
];

export const CopInputs: React.FC<FormStepProps> = ({ register, setValue }) => {
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
              value={item.code || item.name}
              key={item.code || item.name}
              onChange={() => setValue(name, item.code || item.name)}
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
