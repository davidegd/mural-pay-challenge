import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { Account } from "@/types/api";
import { User, Wallet, Building } from "lucide-react";

export function ProfilePage() {
  const customerId = localStorage.getItem("customerId");
  const [account, setAccount] = useState<Account | null>({
    id: "0",
    balance: "0",
    walletAddress: "0x0000000000000000000000000000000000000",
    bankAccount: {
      accountNumber: "0000000000",
      routingNumber: "000000000",
      bankName: "Bank of America",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      loadAccount();
    }
  }, [customerId]);

  const loadAccount = async () => {
    if (!customerId) return;
    try {
      setLoading(true);
      const data = await getAccount(customerId);
      setAccount(data);
    } catch (error) {
      console.error("Error loading account:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  sm:py-6 lg:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      {account && (
        <div className="bg-background rounded-xl shadow-lg p-8 max-w-2xl">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Details
                </h2>
                <p className="text-gray-500">Your account information</p>
              </div>
            </div>

            {account && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Wallet Address</span>
                  </div>
                  <span className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {account.walletAddress}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Bank Details</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">
                      {account.bankAccount?.bankName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Account: {account.bankAccount?.accountNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      Routing: {account.bankAccount?.routingNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
