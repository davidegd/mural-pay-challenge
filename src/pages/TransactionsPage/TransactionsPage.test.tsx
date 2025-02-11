import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import TransactionsPage from "./TransactionsPage";
import { useAppContext } from "@/hooks/useAppContext";
import { useTransactions } from "@/hooks/useTransactions";
import { useNavigate } from "react-router-dom";
import { TransferStatusEnum } from "@/constants/common";
import { AppRoutes } from "@/constants/routes";
import "@testing-library/jest-dom";

vi.mock("@/hooks/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("@/hooks/useTransactions", () => ({
  useTransactions: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/components/TransactionList", () => ({
  default: ({ transactions, isLoading, executeTransaction }: any) => (
    <div data-testid="transaction-list">
      <span>Total: {transactions.total}</span>
      {transactions.results.map((tx: any) => (
        <div key={tx.id}>
          <span>{tx.id}</span>
          <button onClick={() => executeTransaction(tx.id)}>Execute</button>
        </div>
      ))}
      {isLoading && <span>Loading...</span>}
    </div>
  ),
}));

vi.mock("@/components/ExecutedTransactionModal", () => ({
  ExecutedTransactionModal: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="executed-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("TransactionsPage", () => {
  const mockNavigate = vi.fn();
  const mockGetTransactions = vi.fn();
  const mockExecuteTransaction = vi.fn();

  const mockTransactions = {
    results: [
      { id: "1", status: TransferStatusEnum.InReview },
      { id: "2", status: TransferStatusEnum.InReview },
    ],
    total: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as Mock).mockReturnValue(mockNavigate);

    (useAppContext as Mock).mockReturnValue({
      state: {
        transactions: mockTransactions,
      },
      dispatch: vi.fn(),
    });

    (useTransactions as Mock).mockReturnValue({
      getTransactions: mockGetTransactions,
      loadingTransactions: false,
      executeTransaction: mockExecuteTransaction,
    });
  });

  it("should render the page with initial state", () => {
    render(<TransactionsPage />);

    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Make Transaction")).toBeInTheDocument();
    expect(screen.getByText("In Review")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
  });

  it("should call getTransactions on mount with InReview status", () => {
    render(<TransactionsPage />);

    expect(mockGetTransactions).toHaveBeenCalledWith([
      TransferStatusEnum.InReview,
    ]);
  });

  it("should navigate to transfer page when clicking Make Transaction button", () => {
    render(<TransactionsPage />);

    fireEvent.click(screen.getByText("Make Transaction"));

    expect(mockNavigate).toHaveBeenCalledWith(
      `${AppRoutes.dashboard}${AppRoutes.transfer}`
    );
  });

  it("should change transaction status filter when clicking status buttons", async () => {
    render(<TransactionsPage />);

    fireEvent.click(screen.getByText("Pending"));

    await waitFor(() => {
      expect(mockGetTransactions).toHaveBeenCalledWith([
        TransferStatusEnum.Pending,
      ]);
    });
  });

  it("should show loading state in transaction list", () => {
    (useTransactions as Mock).mockReturnValue({
      getTransactions: mockGetTransactions,
      loadingTransactions: true,
      executeTransaction: mockExecuteTransaction,
    });

    render(<TransactionsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should handle execute transaction and show modal on success", async () => {
    mockExecuteTransaction.mockResolvedValueOnce(true);

    render(<TransactionsPage />);

    const executeButton = screen.getAllByText("Execute")[0];
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(mockExecuteTransaction).toHaveBeenCalledWith("1");
      expect(screen.getByTestId("executed-modal")).toBeInTheDocument();
    });
  });

  it("should close executed transaction modal", async () => {
    mockExecuteTransaction.mockResolvedValueOnce(true);

    render(<TransactionsPage />);

    const executeButton = screen.getAllByText("Execute")[0];
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(screen.getByTestId("executed-modal")).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("executed-modal")).not.toBeInTheDocument();
  });

  it("should not show modal if execute transaction fails", async () => {
    mockExecuteTransaction.mockResolvedValueOnce(false);

    render(<TransactionsPage />);

    const executeButton = screen.getAllByText("Execute")[0];
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(mockExecuteTransaction).toHaveBeenCalledWith("1");
      expect(screen.queryByTestId("executed-modal")).not.toBeInTheDocument();
    });
  });

  it("should refresh transactions after successful execution", async () => {
    mockExecuteTransaction.mockResolvedValueOnce(true);

    render(<TransactionsPage />);

    const executeButton = screen.getAllByText("Execute")[0];
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(mockGetTransactions).toHaveBeenCalledTimes(2);
    });
  });
});
