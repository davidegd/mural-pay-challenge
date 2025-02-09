import { getData } from "country-list";

export const Currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "COP", name: "Colombian Peso" },
];

export const AccountTypes = [
  { code: "SAVINGS", name: "Savings" },
  { code: "CHECKING", name: "Checking" },
];

export const ColombiaDocumentTypes = [
  { name: "C.C", value: "CC" },
  { name: "C.E", value: "CE" },
  { name: "NIT", value: "NIT" },
  { name: "Passport", value: "PASSPORT" },
];

export const CountriesList = getData();

export enum TransferFormStepsEnum {
  Amount = "Amount",
  BankDetails = "BankDetails",
  Review = "Review",
  Requested = "Requested",
  Executed = "Executed",
}

export enum TransferStatusEnum {
  Pending = "Pending",
  Requested = "Requested",
  Executed = "Executed",
  Failed = "Failed",
}

export const TransferSteps = [
  { label: TransferFormStepsEnum.Amount, value: 0, text: "Payout account" },
  { label: TransferFormStepsEnum.BankDetails, value: 1, text: "Bank details" },
  { label: TransferFormStepsEnum.Review, value: 2, text: "Resume" },
  {
    label: TransferFormStepsEnum.Requested,
    value: 3,
    text: "Transaction requested",
  },
  {
    label: TransferFormStepsEnum.Executed,
    value: 4,
    text: "Transaction executed",
  },
];
