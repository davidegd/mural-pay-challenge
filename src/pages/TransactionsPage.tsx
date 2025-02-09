import React, { useEffect, useState } from "react";
import { TransactionList } from "@/components/TransactionList";
import { useAppContext } from "@/hooks/useAppContext";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constants/routes";
import { SwitchCamera } from "lucide-react";

export function TransactionsPage() {
  const {
    hooks: { getTransactions },
    state: { transactions, customerId },
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions(customerId, "IN_REVIEW");
  }, []);

  return (
    <div className="min-h-screen flex py-4 sm:py-6 lg:py-8">
      <div className="w-full  space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Transactions</h2>
          <Button
            size="lg"
            color="primary"
            radius="md"
            onPress={() =>
              navigate(`${AppRoutes.dashboard}${AppRoutes.transfer}`)
            }
            startContent={<SwitchCamera size={24} />}
          >
            Make Transaction
          </Button>
        </div>
        <TransactionList transactions={transactions || []} />
      </div>
    </div>
  );
}
