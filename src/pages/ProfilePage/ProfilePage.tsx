import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { Account } from "@/types/api";
import { User, Wallet, Building, User2 } from "lucide-react";
import { useAppContext } from "@/hooks/useAppContext";
import { useCustomer } from "@/hooks/useCustomer";
import { Spinner } from "@heroui/spinner";

const ProfilePage = () => {
  const {
    state: { customerId, customerData },
    dispatch,
  } = useAppContext();
  const { getCustomerData, loading } = useCustomer(dispatch);

  useEffect(() => {
    if (customerId) {
      getCustomerData(customerId);
    }
  }, [customerId]);

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    <div className="min-h-screen  flex flex-col space-y-4 items-center justify-center p-4">
      <Spinner
        size="lg"
        color="primary"
        label="Loading accounts..."
        labelColor="primary"
      />
    </div>;
  }
  return (
    <div className="max-w-7xl mx-auto  sm:py-6 lg:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      {customerData && (
        <div className="bg-background rounded-xl shadow-lg p-8 max-w-2xl">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {customerData.name}
                </h2>
                <p className="text-gray-500">Your account information</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 py-4">
            <span className="font-semibold"> Deposit Account</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User2 className="h-5 w-5 text-gray-400" />
                <span>Beneficiary Name</span>
              </div>
              <span className=" rounded">
                {customerData.account.depositAccount.bankBeneficiaryName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Bank Details</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">
                  {customerData.account.depositAccount?.bankName}
                </p>
                <p className="text-sm text-gray-500">
                  Account:{" "}
                  {customerData.account.depositAccount?.bankAccountNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Routing:{" "}
                  {customerData.account.depositAccount?.bankRoutingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
