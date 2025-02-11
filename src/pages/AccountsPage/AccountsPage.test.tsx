import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AccountsPage from "./AccountsPage";
import { useAccounts } from "@/hooks/useAccounts";
import { useAppContext } from "@/hooks/useAppContext";
import { vi, Mock } from "vitest";

vi.mock("@/hooks/useAccounts", () => ({
  useAccounts: vi.fn(),
}));

vi.mock("@/hooks/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("AccountsPage", () => {
  const mockAccounts = [
    {
      id: "33334d5d-c1cc-4202-944e-cfba7a3327b3",
      name: "Account 1",
      balance: 100,
    },
    {
      id: "45459d5d-c1cc-4202-944e-cfba7a3327b3",
      name: "Account 2",
      balance: 20,
    },
  ];

  const MockState = {
    state: {
      accounts: mockAccounts,
      customerId: "36e89d5d-c1cc-4202-944e-cfba7a3327b3",
    },
    dispatch: vi.fn(),
  };

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue(MockState);

    (useAccounts as Mock).mockReturnValue({
      getCustomerAccounts: vi.fn(),
      createCustomerAccount: vi.fn(),
      loadingAccounts: false,
      errorAccounts: null,
      successCreation: false,
    });
  });

  it("should render the AccountsPage component", () => {
    render(
      <Router>
        <AccountsPage />
      </Router>
    );

    screen.debug();

    expect(screen.findByText("Accounts")).toBeTruthy();
  });

  it("should render the Spinner when loadingAccounts is true", () => {
    (useAccounts as Mock).mockReturnValue({
      loadingAccounts: true,
      getCustomerAccounts: vi.fn(),
      createCustomerAccount: vi.fn(),
      errorAccounts: null,
      successCreation: false,
    });

    render(
      <Router>
        <AccountsPage />
      </Router>
    );

    expect(screen.findByText("status")).toBeTruthy();
    screen.debug();

    expect(screen.findByText("Loading accounts")).toBeTruthy();
  });

  it('should render "No accounts found" when there are no accounts', () => {
    (useAppContext as Mock).mockReturnValue({
      state: {
        accounts: [],
        customerId: "36e89d5d-c1cc-4202-944e-cfba7a3327b3",
      },
      dispatch: vi.fn(),
    });

    render(
      <Router>
        <AccountsPage />
      </Router>
    );

    expect(screen.findByText("No accounts found")).toBeTruthy();
  });

  it("should render the account cards when accounts are available", () => {
    render(
      <Router>
        <AccountsPage />
      </Router>
    );

    screen.debug();

    expect(screen.findByText("Account 1")).toBeTruthy();
    expect(screen.findByText("Account 2")).toBeTruthy();
  });
});
