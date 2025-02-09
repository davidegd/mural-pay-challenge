import React from "react";
import { SearchBar } from "./SearchBar";

interface Transaction {
  date: string;
  from: string;
  to: string;
  tags: string;
  amount: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="bg-background rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex w-full justify-end items-center mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="space-y-4">
        {transactions &&
          transactions.length &&
          transactions.map((transaction, index) => (
            <div
              key={index}
              className={` pb-4 ${
                index < transactions.length - 1 && "border-b border-gray-200"
              }`}
            >
              <p className="text-gray-600 text-sm">{transaction.date}</p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-gray-800 font-medium">
                    {transaction.from}
                  </p>
                  <p className="text-gray-500 text-sm">{transaction.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-medium">
                    {transaction.amount}
                  </p>
                  <p className="text-gray-500 text-sm">{transaction.tags}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
