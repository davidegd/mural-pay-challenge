import React from "react";
import { TransferForm } from "@/components/TransferForm";

export function TransferPage() {
  const customerId = localStorage.getItem("customerId");

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 min-h-screen bg-gray-50 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Transfer</h1>
      <div className="max-w-2xl">
        <TransferForm accountId={customerId} onTransferCreated={() => {}} />
      </div>
    </div>
  );
}
