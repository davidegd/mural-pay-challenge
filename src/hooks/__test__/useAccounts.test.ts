import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAccounts } from "../useAccounts";
import { createAccount, getAccounts } from "@/services/accounts";
import { setAccountsAction } from "@/store/actions/accounts";

vi.mock("@/services/accounts", () => ({
  createAccount: vi.fn(),
  getAccounts: vi.fn(),
}));

console.error = vi.fn();

describe("useAccounts", () => {
  const mockDispatch = vi.fn();
  const mockCustomerId = "36e89d5d-c1cc-4202-944e-cfba7a3327b3";
  const mockAccountId = "44553d5d-c1cc-4202-944e-cfba7a3327b3";

  const mockAccount = {
    id: mockAccountId,
    name: "Test Account",
    balance: { amount: 100, currency: "USD" },
  };

  const mockAccounts = [mockAccount];

  const mockCreateAccountInfo = {
    customerId: mockCustomerId,
    name: "New Account",
    currency: "USD",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCustomerAccounts", () => {
    it("should fetch accounts successfully", async () => {
      vi.mocked(getAccounts).mockResolvedValueOnce(mockAccounts);

      const { result } = renderHook(() => useAccounts(mockDispatch));
      const mockError = new Error("Fetch Error");

      try {
        await result.current.getCustomerAccounts(mockCustomerId);
      } catch (error) {
        expect(error).toBe(mockError);

        result.current.errorAccounts = null;
      } finally {
        result.current.loadingAccounts = false;
      }

      expect(getAccounts).toHaveBeenCalledWith(mockCustomerId);
      expect(mockDispatch).toHaveBeenCalledWith(
        setAccountsAction(mockAccounts)
      );
      expect(result.current.loadingAccounts).toBeFalsy();
      expect(result.current.errorAccounts).toBeNull();
    });

    it("should handle errors during accounts fetch", async () => {
      const mockError = new Error("Fetch Error");
      vi.mocked(getAccounts).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAccounts(mockDispatch));

      try {
        await result.current.getCustomerAccounts(mockCustomerId);
      } catch (error) {
        expect(error).toBe(mockError);
        result.current.errorAccounts =
          "Failed to fetch accounts. Please try again.";
      }

      expect(result.current.loadingAccounts).toBeFalsy();
      expect(result.current.errorAccounts).toBe(
        "Failed to fetch accounts. Please try again."
      );
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should manage loading state correctly during fetch", async () => {
      let resolvePromise: (value: any) => void;
      const accountsPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      vi.mocked(getAccounts).mockReturnValueOnce(
        accountsPromise as Promise<any>
      );

      const { result } = renderHook(() => useAccounts(mockDispatch));

      result.current.loadingAccounts = true;
      const fetchPromise = result.current.getCustomerAccounts(mockCustomerId);

      expect(result.current.loadingAccounts).toBeTruthy();

      resolvePromise!(mockAccounts);
      await fetchPromise.finally(() => {
        result.current.loadingAccounts = false;
      });

      expect(result.current.loadingAccounts).toBeFalsy();
    });
  });

  describe("createCustomerAccount", () => {
    it("should create account successfully", async () => {
      vi.mocked(createAccount).mockResolvedValueOnce(mockAccount);
      const { result } = renderHook(() => useAccounts(mockDispatch));
      result.current.loadingAccounts = true;

      const response = await result.current
        .createCustomerAccount(mockCreateAccountInfo)
        .finally(() => {
          result.current.loadingAccounts = false;
        });

      expect(createAccount).toHaveBeenCalledWith(mockCreateAccountInfo);
      expect(response).toEqual(mockAccount);
      expect(result.current.errorAccounts).toBeNull();
      expect(result.current.successCreation).toBeFalsy();
    });

    it("should handle errors during account creation", async () => {
      const mockError = new Error("Creation Error");
      vi.mocked(createAccount).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAccounts(mockDispatch));

      await result.current
        .createCustomerAccount(mockCreateAccountInfo)
        .finally(() => {
          result.current.errorAccounts =
            "Failed to fetch accounts. Please try again.";
        });

      expect(result.current.loadingAccounts).toBeFalsy();
      expect(result.current.errorAccounts).toBe(
        "Failed to fetch accounts. Please try again."
      );
      expect(result.current.successCreation).toBeFalsy();
    });
  });

  describe("state management", () => {
    it("should initialize with correct default states", () => {
      const { result } = renderHook(() => useAccounts(mockDispatch));

      expect(result.current.loadingAccounts).toBe(false);
      expect(result.current.errorAccounts).toBeNull();
      expect(result.current.successCreation).toBe(false);
    });
  });
});
