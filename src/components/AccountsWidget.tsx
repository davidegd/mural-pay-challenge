import React from "react";
import { Account } from "@/types/api";
import { Button } from "@heroui/react";
import { AccountCard } from "./AccountCard";
import { ArrowUpRight } from "lucide-react";
import { AppRoutes } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  accounts: Account[];
}

export function AccountsWidget({ accounts }: Props) {
  const navigate = useNavigate();
  return (
    <div className="bg-background rounded shadow-sm px-2 py-2 sm:px-4 sm:py-5 border border-foreground-200">
      <div className="flex  justify-between ">
        <h2 className="text-2xl font-bold text-foreground mb-3">Accounts</h2>

        <Button
          variant="light"
          color="primary"
          className="text-primary"
          endContent={<ArrowUpRight className="text-foreground" />}
          onPress={() =>
            navigate(`${AppRoutes.dashboard}${AppRoutes.accounts}`)
          }
        >
          <span className="text-foreground"> View all accounts</span>
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        {accounts.slice(0, 2).map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
