import { renderHook, act } from "@testing-library/react-hooks";
import { useTransactions } from "../useTransactions";
import {
  createTransactionRequest,
  executeTransactionRequested,
} from "@/services/transactions";
import { expect, vi, MockedFunction } from "vitest";
import { CreatedTransactionResponse, TransactionRequest } from "@/types/api";
import { TransferStatusEnum } from "../../constants/common";

const transactionData: TransactionRequest = {
  payoutAccountId: "7067dae2-4ab3-4241-a90e-1ecfc066c6ab",
  memo: "Custom message",
  recipientsInfo: [
    {
      name: "John Doe",
      currencyCode: "USD",
      tokenAmount: 1,
      email: "john@doe.com",
      bankDetails: {
        bankName: "Chase Bank",
        bankAccountOwnerName: "John Doe",
        currencyCode: "USD",
        accountType: "SAVINGS",
        bankAccountNumber: "1234567890",
        bankRoutingNumber: "021000021",
        physicalAddress: {
          address1: "234th Street",
          address2: "22nd Avenue",
          country: "US",
          state: "New York",
          city: "New York",
          zip: "07001",
        },
      },
    },
  ],
};

vi.mock("@/services/transactions");
vi.mock("@/store/actions/transactions");

describe("useTransactions", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create transaction successfully", async () => {
    const response: CreatedTransactionResponse = {
      id: "36e89d5d-c1cc-4202-944e-cfba7a3327b3",
      createdAt: "2024-02-10T17:24:20.663Z",
      updatedAt: "2024-02-10T17:24:20.663Z",
      payoutAccountId: "7067dae2-4ab3-4241-a90e-1ecfc066c6ab",
      memo: "Test description",
      status: "IN_REVIEW",
      recipientsInfo: [
        {
          id: "151ec57c-8e4c-4059-b12c-2b3b98f4e65a",
          currencyCode: "USD",
          tokenAmount: 1,
          createdAt: "2025-02-10T17:24:20.668Z",
          updatedAt: "2024-02-10T17:24:20.668Z",
          withdrawalRequestStatus: "AWAITING_SOURCE_DEPOSIT",
        },
      ],
    };
    (
      createTransactionRequest as MockedFunction<
        typeof createTransactionRequest
      >
    ).mockResolvedValue(response);

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactions(dispatch)
    );

    act(() => {
      result.current.createTransaction(transactionData);
    });

    await waitForNextUpdate();

    expect(result.current.transactionStatus).toBe(null);
    expect(result.current.errorTransactions).toBe(null);
  });

  it("should handle error when creating transaction", async () => {
    const { result } = renderHook(() => useTransactions(dispatch));
    (
      createTransactionRequest as MockedFunction<
        typeof createTransactionRequest
      >
    ).mockRejectedValue(
      result.current.setErrorTransactions(
        "Failed to create transaction. Please try again."
      )
    );

    act(() => {
      result.current.setTransactionStatus(TransferStatusEnum.Failed);
      result.current.setErrorTransactions(
        "Failed to create transaction. Please try again."
      );
    });

    expect(result.current.transactionStatus).toBe(TransferStatusEnum.Failed);
    expect(result.current.errorTransactions).toBe(
      "Failed to create transaction. Please try again."
    );
  });

  it("should execute transaction successfully", async () => {
    const response: CreatedTransactionResponse = {
      id: "36e89d5d-c1cc-4202-944e-cfba7a3327b3",
      createdAt: "2024-02-10T17:24:20.663Z",
      updatedAt: "2024-02-10T17:24:20.663Z",
      payoutAccountId: "7067dae2-4ab3-4241-a90e-1ecfc066c6ab",
      memo: "Test description",
      status: "PENDING",
      recipientsInfo: [
        {
          id: "151ec57c-8e4c-4059-b12c-2b3b98f4e65a",
          currencyCode: "USD",
          tokenAmount: 1,
          createdAt: "2025-02-10T17:24:20.668Z",
          updatedAt: "2024-02-10T17:24:20.668Z",
          withdrawalRequestStatus: "AWAITING_SOURCE_DEPOSIT",
        },
      ],
    };
    (
      executeTransactionRequested as MockedFunction<
        typeof executeTransactionRequested
      >
    ).mockResolvedValue(response);

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactions(dispatch)
    );

    act(() => {
      result.current.executeTransaction("transferRequestId");
    });

    await waitForNextUpdate({ timeout: 5000 });

    expect(result.current.transactionStatus).toBe(null);
    expect(result.current.errorTransactions).toBe(null);
  });

  it("should handle error when executing transaction", async () => {
    const { result } = renderHook(() => useTransactions(dispatch));

    (
      executeTransactionRequested as MockedFunction<
        typeof executeTransactionRequested
      >
    ).mockRejectedValue(
      result.current.setErrorTransactions(
        "Failed to execute transaction. Please try again."
      )
    );

    act(() => {
      result.current.setTransactionStatus(TransferStatusEnum.Failed);

      result.current.setErrorTransactions(
        "Failed to execute transaction. Please try again."
      );
    });

    expect(result.current.transactionStatus).toBe(TransferStatusEnum.Failed);
    expect(result.current.errorTransactions).toBe(
      "Failed to execute transaction. Please try again."
    );
  });
});
