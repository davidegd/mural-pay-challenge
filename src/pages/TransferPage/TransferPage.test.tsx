import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { TransferPage } from "./index";
import { useAppContext } from "@/hooks/useAppContext";
import { useTransactions } from "@/hooks/useTransactions";
import "@testing-library/jest-dom";
import { vi, Mock } from "vitest";

vi.mock("@/hooks/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("@/hooks/useTransactions", () => ({
  useTransactions: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual(
    "react-router-dom"
  )) as typeof import("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

const setupLocationMock = (customLocation = {}) => {
  const defaultLocation = {
    pathname: "/transfer",
    search: "",
    hash: "",
    state: null,
    key: "default",
  };

  return vi.mocked(useLocation).mockReturnValue({
    ...defaultLocation,
    ...customLocation,
  });
};

const mockCustomerId = "36e89d5d-c1cc-4202-944e-cfba7a3327b3";
const mockAccounts = [
  {
    id: "67889d5d-c1cc-4202-944e-cfba7a3327b3",
    name: "Account 1",
    balance: { balance: 1000, currency: "USDC" },
  },
];
describe("TransferPage", () => {
  beforeEach(() => {
    setupLocationMock();

    (useAppContext as Mock).mockReturnValue({
      state: {
        accounts: mockAccounts,
        customerId: mockCustomerId,
      },
      hooks: {
        getCustomerAccounts: vi.fn(),
      },
      dispatch: vi.fn(),
    });

    (useTransactions as Mock).mockReturnValue({
      createTransaction: vi.fn(),
      transactionStatus: null,
      setTransactionStatus: vi.fn(),
      executeTransaction: vi.fn(),
    });

    (useLocation as Mock).mockReturnValue({});
  });

  it("should render correctly", () => {
    const { getByText } = render(<TransferPage />);
    expect(getByText("New Transaction")).toBeInTheDocument();
  });
});

it("should redirect to home if customerId is not present", () => {
  (useAppContext as Mock).mockReturnValue({
    state: {
      accounts: mockAccounts,
      customerId: null,
    },
    hooks: {
      getCustomerAccounts: vi.fn(),
    },
    dispatch: vi.fn(),
  });

  render(
    <Router>
      <TransferPage />
    </Router>
  );

  expect(window.location.pathname).toBe("/");
});

it("should render the Spinner when transactionStatus is Pending", () => {
  (useTransactions as Mock).mockReturnValue({
    transactionStatus: "Pending",
    createTransaction: vi.fn(),
    setTransactionStatus: vi.fn(),
    executeTransaction: vi.fn(),
  });

  render(
    <Router>
      <TransferPage />
    </Router>
  );
  screen.debug();

  expect(screen.findByText("Processing transaction...")).toBeTruthy();
});

it("should render the Failed transaction message when transactionStatus is Failed", () => {
  (useTransactions as Mock).mockReturnValue({
    createTransaction: vi.fn(),
    transactionStatus: "Failed",
    setTransactionStatus: vi.fn(),
    executeTransaction: vi.fn(),
  });

  render(
    <Router>
      <TransferPage />
    </Router>
  );

  expect(screen.findByText("Transaction Failed")).toBeTruthy();
});

it("should call getCustomerAccounts if accounts are not present", async () => {
  (useAppContext as Mock).mockReturnValue({
    state: {
      accounts: null,
      customerId: mockCustomerId,
    },
    hooks: {
      getCustomerAccounts: vi.fn(),
    },
    dispatch: vi.fn(),
  });

  render(
    <Router>
      <TransferPage />
    </Router>
  );

  await waitFor(() => {
    expect(useAppContext().hooks.getCustomerAccounts).toHaveBeenCalledWith(
      mockCustomerId
    );
  });
});
