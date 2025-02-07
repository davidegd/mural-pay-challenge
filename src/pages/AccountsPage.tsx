import { AccountCard } from "@/components/AccountCard";
import { CreateAccountModal } from "@/components/CreateAccountModal";
import { useAccounts } from "@/hooks/useAccounts";
import { useAppContext } from "@/hooks/useAppContext";
import { CreateAccount } from "@/types/api";
import { Button, Spinner } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

export const AccountsPage = () => {
  const {
    state: { accounts, customerId },
    dispatch,
  } = useAppContext();
  const {
    getCustomerAccounts,
    createCustomerAccount,
    loadingAccounts,
    errorAccounts,
    successCreation,
  } = useAccounts(dispatch);
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);

  useEffect(() => {
    if (!accounts || successCreation) {
      getCustomerAccounts(customerId);
    }
  }, [accounts, customerId, successCreation]);

  const handleCreateAccount = useCallback(
    (accountInfo: CreateAccount) => {
      createCustomerAccount({
        ...accountInfo,
        organizationCustomerId: customerId,
      });
    },
    [customerId]
  );

  if (loadingAccounts) {
    return (
      <div className="min-h-screen  flex flex-col space-y-4 items-center justify-center p-4">
        <Spinner size="lg" />
        <div className="text-lg text-gray-600">Loading accounts</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen  flex flex-col  py-4 sm:py-6 lg:py-8  space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Accounts</h2>{" "}
        <Button
          onPress={() => setOpenCreateAccountModal(!openCreateAccountModal)}
          radius="sm"
          startContent={<PlusIcon />}
          color="primary"
          isDisabled={accounts && accounts.length > 1}
        >
          Create Account
        </Button>
      </div>
      <div className="bg-background shadow-sm rounded py-4 px-4">
        {Array.isArray(accounts) && accounts.length ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="text-lg text-gray-600 text-center">
            No accounts found
          </div>
        )}
      </div>
      <CreateAccountModal
        isOpen={openCreateAccountModal}
        onClose={() => setOpenCreateAccountModal(false)}
        onContinue={handleCreateAccount}
        loading={loadingAccounts}
        error={errorAccounts}
        successCreation={successCreation}
      />
    </div>
  );
};
