import React from "react";
import { Account } from "@/types/api";
import { Button } from "@heroui/react";
import { AccountCard } from "./AccountCard";

interface Props {
  accounts: Account[];
}

export function AccountsWidget({ accounts }: Props) {
  return (
    <div className="bg-background rounded shadow-sm px-4 py-2.5">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Accounts</h2>
      {accounts.slice(0, 2).map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
      <div className="flex justify-center ">
        <Button variant="bordered" color="primary" className="text-primary">
          View all accounts
        </Button>
      </div>
    </div>
  );
}
