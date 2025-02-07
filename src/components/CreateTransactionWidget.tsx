import { Button } from "@heroui/button";
import { ArrowRightLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateTransactionWidget: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateTransaction = () => {
    navigate("/create-transaction"); // Redirige a la pantalla de creación de transacciones
  };

  return (
    <div
      role="button"
      onClick={handleCreateTransaction}
      className="bg-gradient-to-r flex justify-between items-center to-blue-600 from-purple-600 rounded shadow-lg p-6 text-white"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Transaction</h2>
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
        <ArrowRightLeftIcon className="h-14 w-14 " />
      </Button>
    </div>
  );
};
