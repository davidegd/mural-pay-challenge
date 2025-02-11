import { Button } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionsList from "./TransactionList";
import { Transaction } from "@/types/common";
import { AppRoutes } from "@/constants/routes";
import { ArrowUpRight } from "lucide-react";

interface TransactionsWidgetProps {
  transactions: { total: number; results: Transaction[] };
  loadingTransactions: boolean;
}

export const TransactionsWidget: React.FC<TransactionsWidgetProps> = ({
  transactions,
  loadingTransactions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded shadow-sm my-4 space-y-4 bg-background p-5">
      <div className="flex  justify-between ">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Last transactions
        </h2>

        <Button
          onPress={() =>
            navigate(`${AppRoutes.dashboard}${AppRoutes.transactions}`)
          }
          variant="light"
          color="primary"
          className="text-primary"
          endContent={<ArrowUpRight />}
        >
          View all transactions
        </Button>
      </div>
      <TransactionsList
        transactions={transactions}
        isWidget
        isLoading={loadingTransactions}
      />
    </div>
  );
};
