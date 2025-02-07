import React, { useState } from "react";
import { TransactionList } from "@/components/TransactionList";

export function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    {
      date: "Nov 3",
      from: "Core Account",
      to: "Sinclair Toffa",
      tags: "(payroll)",
      amount: "500.00 USDC",
    },
    {
      date: "Oct 31",
      from: "Chris Fernandes",
      to: "Third Party Vendor Account",
      tags: "(reimbursement)",
      amount: "+200.00 USDC",
    },
  ]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen flex py-4 sm:py-6 lg:py-8">
      <div className="w-full  space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
