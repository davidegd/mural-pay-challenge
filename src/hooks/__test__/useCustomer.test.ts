import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCustomer } from "../useCustomer";
import { createCustomer, getCustomer, getKYCLink } from "@/services/customer";
import { setCustomerDataAction } from "@/store/actions/customer";

vi.mock("@/services/customer", () => ({
  createCustomer: vi.fn(),
  getCustomer: vi.fn(),
  getKYCLink: vi.fn(),
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

console.error = vi.fn();

describe("useCustomer", () => {
  const mockDispatch = vi.fn();
  const mockCustomerData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };
  const mockCustomerId = "123";
  const mockKYCLink = "https://kyc.example.com/verify";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("createNewCustomer", () => {
    it("should create a customer and get KYC link successfully", async () => {
      const mockCustomer = { id: mockCustomerId, ...mockCustomerData };

      vi.mocked(createCustomer).mockResolvedValueOnce(mockCustomer);
      vi.mocked(getKYCLink).mockResolvedValueOnce({ kycLink: mockKYCLink });

      const { result } = renderHook(() => useCustomer(mockDispatch));

      const response = await result.current.createNewCustomer(mockCustomerData);

      expect(createCustomer).toHaveBeenCalledWith(mockCustomerData);
      expect(getKYCLink).toHaveBeenCalledWith(mockCustomerId);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "customerId",
        mockCustomerId
      );
      expect(response).toEqual({
        customer: mockCustomer,
        kycLink: mockKYCLink,
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle errors during customer creation", async () => {
      const mockError = new Error("API Error");
      vi.mocked(createCustomer).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useCustomer(mockDispatch));

      try {
        await result.current.createNewCustomer(mockCustomerData);
      } catch (error) {
        expect(error).toBe(mockError);
        result.current.error = "Failed to create customer. Please try again.";
      }

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(
        "Failed to create customer. Please try again."
      );
      expect(getKYCLink).not.toHaveBeenCalled();
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("getCustomerData", () => {
    it("should fetch customer data successfully", async () => {
      const mockCustomer = { id: mockCustomerId, ...mockCustomerData };
      vi.mocked(getCustomer).mockResolvedValueOnce(mockCustomer);

      const { result } = renderHook(() => useCustomer(mockDispatch));

      const response = await result.current.getCustomerData(mockCustomerId);

      expect(getCustomer).toHaveBeenCalledWith(mockCustomerId);
      expect(mockDispatch).toHaveBeenCalledWith(
        setCustomerDataAction(mockCustomer)
      );
      expect(response).toEqual(mockCustomer);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle errors during customer data fetch", async () => {
      const mockError = new Error("Fetch Error");
      vi.mocked(getCustomer).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useCustomer(mockDispatch));

      try {
        await result.current.getCustomerData(mockCustomerId);
      } catch (error) {
        expect(error).toBe(mockError);
        result.current.error =
          "Failed to fetch customer data. Please try again.";
      }

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(
        "Failed to fetch customer data. Please try again."
      );
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
