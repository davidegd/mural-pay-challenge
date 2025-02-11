import React, { useCallback, useEffect, useState } from "react";
import { AccountCard } from "@/components/AccountCard";
import { CreateAccountModal } from "@/components/CreateAccountModal";
import { useAccounts } from "@/hooks/useAccounts";
import { useAppContext } from "@/hooks/useAppContext";
import { CreateAccount } from "@/types/api";
import { Button, Spinner, useDisclosure } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AccountDetailDrawer } from "@/components/AccountDetailDrawer";

const AccountsPage = () => {
  const { state } = useLocation();
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
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(
    state?.openCreateAccount || false
  );
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
  const handleClickAccountDetails = useCallback((account) => {
    setSelectedAccount(account);
    onOpen();
  }, []);

  if (loadingAccounts) {
    return (
      <div className="min-h-screen  flex flex-col space-y-4 items-center justify-center p-4">
        <Spinner
          size="lg"
          color="primary"
          label="Loading accounts..."
          labelColor="primary"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col  py-4 sm:py-6 lg:py-8  space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Accounts</h2>{" "}
        <Button
          onPress={() => setOpenCreateAccountModal(!openCreateAccountModal)}
          radius="md"
          size="lg"
          startContent={<PlusIcon />}
          color="primary"
        >
          Create new account
        </Button>
      </div>
      <div className=" bg-surface shadow-sm rounded py-4 px-4">
        {Array.isArray(accounts) && accounts.length ? (
          accounts.map((account) => (
            <div
              key={account.id}
              role="button"
              onClick={() => handleClickAccountDetails(account)}
            >
              <AccountCard key={account.id} account={account} />
            </div>
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
      {isOpen && (
        <AccountDetailDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      )}
    </div>
  );
};

export default AccountsPage;
