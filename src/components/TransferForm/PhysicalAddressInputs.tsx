import React from "react";
import { CountriesList } from "@/constants/common";
import { Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { MapPinHouseIcon } from "lucide-react";

export const PhysicalAddressInputs = ({ register, setValue, watch }) => {
  useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  watch();
  return (
    <div className="space-y-3 mb-4">
      <p className="font-medium text-foreground  text-lg flex gap-2 items-center">
        Physical Address <MapPinHouseIcon size={20} />
      </p>
      <Select
        label="Country"
        {...register("bankDetails.physicalAddress.country", {
          required: "Country is required",
        })}
        isRequired
        aria-label="Country"
      >
        {CountriesList &&
          CountriesList.map((country) => (
            <SelectItem
              key={country?.code}
              value={country?.code}
              onChange={() =>
                setValue("bankDetails.physicalAddress.country", country?.code)
              }
            >
              {country?.name}
            </SelectItem>
          ))}
      </Select>
      <div className="flex space-x-2">
        <Input
          label="Address 1 "
          {...register("bankDetails.physicalAddress.address1", {
            required: true,
          })}
          placeholder="Enter address"
          isRequired
          onChange={(e) =>
            setValue("bankDetails.physicalAddress.address1", e.target.value)
          }
          aria-label="Address 1"
        />
        <Input
          label="Address 2 "
          {...register("bankDetails.physicalAddress.address2", {
            required: true,
          })}
          placeholder="Enter address 2"
          onChange={(e) =>
            setValue("bankDetails.physicalAddress.address2", e.target.value)
          }
          aria-label="Address 2"
        />
      </div>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2 ">
        <Input
          label="State"
          {...register("bankDetails.physicalAddress.state", {
            required: true,
          })}
          placeholder="Enter state"
          isRequired
          onChange={(e) =>
            setValue("bankDetails.physicalAddress.state", e.target.value)
          }
          aria-label="State"
        />
        <Input
          label="City"
          {...register("bankDetails.physicalAddress.city", {
            required: true,
          })}
          placeholder="Enter city"
          isRequired
          onChange={(e) =>
            setValue("bankDetails.physicalAddress.city", e.target.value)
          }
          aria-label="City"
        />
        <Input
          label="Zip Code"
          {...register("bankDetails.physicalAddress.zip", {
            required: true,
          })}
          placeholder="Enter zip code"
          isRequired
          onChange={(e) =>
            setValue("bankDetails.physicalAddress.zip", e.target.value)
          }
          aria-label="Zip Code"
        />
      </div>
    </div>
  );
};
