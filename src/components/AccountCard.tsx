import React from "react";
import { Account } from "../types/api";
import { Card } from "@heroui/react";
import { formatAmount } from "@/utils/formatter";
import { Wallet } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
}: AccountCardProps) => {
  return (
    <Card shadow="none" className="py-3 px-4 mb-4 border border-neutral-100">
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold">{account?.name}</h4>
        <div className="flex items-end ">
          <div>
            <h3 className="text-md font-medium text-neutral-600">Balance</h3>
            <span className="text-md font-bold text-indigo-600">
              {account.balance.tokenSymbol}
            </span>{" "}
            <span className="text-lg font-bold text-primary">
              {formatAmount(account.balance.balance)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Wallet className="h-5 w-5 text-primary" />
        <div className="flex flex-col text-wrap break-words w-5/6 sm:w-auto overflow-x-clip">
          <span className="text-sm font-mono  p-2 rounded break-words *:break-words *:break-all">
            {account.address}
          </span>
        </div>
      </div>
    </Card>
  );
};
