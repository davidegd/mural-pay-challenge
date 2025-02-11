import React, { useState } from "react";
import { Account } from "../types/api";
import { Button, Card } from "@heroui/react";
import { formatAmount, handleCopy } from "@/utils/formatter";
import { CopyIcon, Wallet } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
}: AccountCardProps) => {
  return (
    <Card
      shadow="none"
      className="py-3 px-4 mb-3 border border-foreground-200 hover:bg-background-50 bg-surface"
    >
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold text-foreground">
          {account?.name}
        </h4>
        <div className="flex items-end ">
          <div>
            <h3 className="text-md font-medium text-foreground">Balance</h3>
            <span className="text-xl font-bold text-indigo-700">
              {account.balance.tokenSymbol}
            </span>{" "}
            <span className="text-xl font-bold text-indigo-600">
              {formatAmount(account.balance.balance)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Wallet className="h-5 w-5 text-primary" />
        <div className="flex text-wrap items-center break-words w-5/6 sm:w-auto overflow-x-clip">
          <span className="text-sm font-mono text-foreground   rounded break-words *:break-words *:break-all">
            {account.address}
          </span>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onPress={() => handleCopy(account.address)}
          >
            <CopyIcon className="h-4 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
