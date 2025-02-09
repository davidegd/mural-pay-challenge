import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { CountriesList } from "@/constants/common";
import { FormStepProps } from "@/types/common";

export const EuroInputs: React.FC<FormStepProps> = ({
  register,
  setValue,
  getValues,
  watch,
}) => {
  watch();
  return (
    <>
      <Select
        label="Bank Country"
        {...register("bankDetails.bankCountry", {
          required: "Bank country is required",
        })}
        isRequired
      >
        {CountriesList &&
          CountriesList.map((country) => (
            <SelectItem
              key={country?.code}
              value={country?.code}
              onChange={() =>
                setValue("bankDetails.bankCountry", country?.code)
              }
            >
              {country?.name}
            </SelectItem>
          ))}
      </Select>

      <Input
        label="IBAN"
        type="text"
        isRequired
        name="iban"
        {...register("bankDetails.iban", {
          required: "IBAN is required",
        })}
        errorMessage="Please enter a valid IBAN"
        onChange={(e) => setValue("bankDetails.iban", e.target.value)}
        isInvalid={
          getValues("bankDetails.iban") &&
          !getValues("bankDetails.iban")?.match(
            /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/
          )
        }
        placeholder="DE89370400440532013000"
      />

      <Input
        label="BIC"
        name="bic"
        type="text"
        {...register("bankDetails.bic", {
          required: "BIC is required",
          pattern: {
            value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
            message: "Invalid BIC format",
          },
        })}
        isInvalid={
          getValues("bankDetails.bic") &&
          !getValues("bankDetails.bic")?.match(
            /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/
          )
        }
        isRequired
        onChange={(e) => setValue("bankDetails.bic", e.target.value)}
        errorMessage="Please enter a valid BIC"
        placeholder="ABCDDEFFXXX"
      />
    </>
  );
};
