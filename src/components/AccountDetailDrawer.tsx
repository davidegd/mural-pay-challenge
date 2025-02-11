import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { formatAmount, formatWallet, handleCopy } from "@/utils/formatter";
import { CopyIcon, Landmark } from "lucide-react";

interface AccountDetailDrawerProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedAccount: unknown;
  setSelectedAccount: (account: unknown) => void;
}

export const AccountDetailDrawer: React.FC<AccountDetailDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedAccount,
  setSelectedAccount,
}) => {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>Account Details</DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Landmark className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedAccount.name}
                </h2>
                <span className="text-lg font-bold text-indigo-600">
                  {selectedAccount.balance.tokenSymbol}
                </span>{" "}
                <span className="text-lg font-bold text-primary">
                  {formatAmount(selectedAccount.balance.balance)}
                </span>
              </div>
            </div>
            <div className="space-y-4 border-b pb-4">
              <span className="font-semibold text-lg">
                Deposit account details
              </span>
              <div className="flex items-center justify-between">
                <span>Beneficiary Name:</span>
                <span className=" rounded"> {selectedAccount.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bank Account Number:</span>
                <div className="text-right">
                  <span>
                    {selectedAccount.depositAccount?.bankAccountNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Bank Routing Number:</span>
                <div className="text-right">
                  <span>
                    {selectedAccount.depositAccount?.bankRoutingNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Bank Name:</span>
                <div className="text-right flex flex-col">
                  <span>{selectedAccount.depositAccount?.bankName}</span>
                  <span className="text-xs">
                    {selectedAccount.depositAccount?.bankAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Beneficiary Name:</span>
                <div className="text-right flex flex-col">
                  <span>
                    {selectedAccount.depositAccount?.bankBeneficiaryName}
                  </span>
                  <span className="text-xs">
                    {" "}
                    {selectedAccount.depositAccount?.bankBeneficiaryAddress}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="font-semibold text-lg">
                Digital account details
              </span>
              <div className="flex items-center justify-between">
                <span>Wallet:</span>
                <div className="text-right flex items-center">
                  <span className="font-mono">
                    {formatWallet(selectedAccount?.address)}
                  </span>
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => handleCopy(selectedAccount?.address)}
                  >
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Currency:</span>
                <div className="text-right">
                  <span>{selectedAccount.balance?.tokenSymbol}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Network:</span>
                <div className="text-right">
                  <span>{selectedAccount?.blockchain}</span>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onPress={() => {
              setSelectedAccount(null);
              onOpenChange();
            }}
            color="primary"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
