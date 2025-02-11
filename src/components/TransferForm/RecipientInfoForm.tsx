import React from "react";
import { UsdInputs } from "./UsdInputs";
import { EuroInputs } from "./EurInputs";
import { CopInputs } from "./CopInputs";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Currencies } from "@/constants/common";
import { ArrowRight, ReceiptTextIcon, UserIcon } from "lucide-react";
import { PhysicalAddressInputs } from "./PhysicalAddressInputs";
import { FormStepProps } from "@/types/common";

export const RecipientInfoForm: React.FC<FormStepProps> = ({
  onContinue,
  onBack,
  register,
  setValue,
  getValues,
  watch,
  isValid,
}) => {
  watch();
  const InputsByCurrency = (props) => {
    const render = {
      USD: <UsdInputs {...props} />,
      EUR: <EuroInputs {...props} />,
      COP: <CopInputs {...props} />,
    };
    return render[getValues("bankDetails.currencyCode") as string];
  };
  return (
    <>
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-foreground  text-lg flex gap-2 items-center">
          Account holder details <UserIcon size={20} />
        </p>
        <Input
          label="Full legal name"
          {...register("name", { required: "required" })}
          placeholder="Doe Company Corp"
          isRequired
          onChange={(e) => {
            setValue("bankDetails.bankAccountOwnerName", e.target.value);
            setValue("name", e.target.value);
          }}
        />
        <Input
          label="Email"
          {...register("email", { required: "required" })}
          placeholder="doe@company.com"
        />
      </div>
      <div className="flex flex-col space-y-3 py-2 ">
        <p className="font-medium text-foreground  text-lg flex gap-2 items-center">
          Bank account Details <ReceiptTextIcon size={20} />
        </p>

        <Select
          {...register("bankDetails.currencyCode", {
            required: "required",
          })}
          label="Currency"
          isRequired
          aria-label="Currency"
        >
          {Currencies.map((currency) => (
            <SelectItem
              key={currency.code}
              textValue={currency.code}
              onSelect={() => {
                setValue("bankDetails.currencyCode", currency.code);
              }}
            >
              {currency.code} - {currency.name}
            </SelectItem>
          ))}
        </Select>
        {getValues("bankDetails.currencyCode") && (
          <Input
            {...register(`bankDetails.bankName`, {
              required: "required",
            })}
            label="Bank Name"
            isRequired
            aria-label="Bank Name"
          />
        )}
        {InputsByCurrency({ register, setValue, getValues, watch })}
      </div>
      <div>
        <PhysicalAddressInputs
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </div>
      <div className="flex w-full justify-between mt-8  space-x-8">
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
