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
  { name: "C.C", code: "CC" },
  { name: "C.E", code: "CE" },
  { name: "NIT", code: "NIT" },
  { name: "Passport", code: "PASSPORT" },
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
  Pending = "PENDING",
  Failed = "FAILED",
  Executed = "EXECUTED",
  InReview = "IN_REVIEW",
  Cancelled = "CANCELLED",
}

export const TransferSteps = [
  { label: TransferFormStepsEnum.Amount, value: 0, text: "Payout account" },
  {
    label: TransferFormStepsEnum.BankDetails,
    value: 1,
    text: "Recipient details",
  },
  { label: TransferFormStepsEnum.Review, value: 2, text: "Resume" },
  {
    label: TransferFormStepsEnum.Requested,
    value: 3,
    text: "Transaction requested",
  },
  {
    label: TransferFormStepsEnum.Executed,
    value: 4,
    text: "Execution",
  },
];
