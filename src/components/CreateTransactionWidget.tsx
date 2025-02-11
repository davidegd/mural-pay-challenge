import { AppRoutes } from "@/constants/routes";
import { Button } from "@heroui/button";
import { SwitchCameraIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateTransactionWidget: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateTransaction = () => {
    navigate(`${AppRoutes.dashboard}${AppRoutes.transfer}`);
  };

  return (
    <div
      role="button"
      onClick={handleCreateTransaction}
      className="bg-gradient-to-r flex justify-between items-center to-blue-600 from-purple-600 rounded shadow-sm p-5 text-white"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Make a Transaction</h2>
        <p className="text-sm text-blue-100 mb-6 max-w-56">
          Easily send money to everyone. Start a new transaction now!
        </p>
      </div>

      <Button
        onPress={handleCreateTransaction}
        variant="flat"
        isIconOnly
        className="h-16 w-16 bg-background text-indigo-600 py-2 px-4 rounded-full hover:bg-green-50 transition-colors"
      >
        <SwitchCameraIcon className="h-14 w-14 " />
      </Button>
    </div>
  );
};
