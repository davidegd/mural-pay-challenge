import { AppRoutes } from "@/constants/routes";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AddAccountWidget: React.FC = () => {
  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate(`${AppRoutes.dashboard}${AppRoutes.accounts}`, {
      state: { openCreateAccount: true },
    });
  };

  return (
    <div
      role="button"
      onClick={handleAddAccount}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between rounded shadow-sm p-5 text-white"
    >
      <div>
        {" "}
        <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
        <p className="text-sm text-green-100 mb-6 max-w-52">
          Create new account or add a new wallet to manage your funds.
        </p>
      </div>

      <Button
        onPress={handleAddAccount}
        variant="flat"
        isIconOnly
        className="h-16 w-16 bg-background text-purple-600 py-2 px-4 rounded-full hover:bg-green-50 transition-colors"
      >
        <PlusIcon className="h-14 w-14 " />
      </Button>
    </div>
  );
};
