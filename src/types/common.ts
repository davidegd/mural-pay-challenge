import { UseFormRegister, FieldValues } from "react-hook-form";

export interface FormStepProps {
  onBack?: () => void;
  onContinue: () => void;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown) => void;
  getValues: (name: string) => unknown;
  watch: () => void;
  isValid: boolean;
}

export interface Transaction {
  id: string;
  createdAt: string;
  recipientsInfo: {
    id: string;
    tokenAmount: number;
    fiatDetails: {
      currencyCode: string;
    };
  }[];
  status: string;
}
