// src/components/AddAccountWidget.tsx
import { Button } from "@heroui/react";
import { PlusCircle, PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AddAccountWidget: React.FC = () => {
  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate("/add-account"); // Redirige a la pantalla de agregar cuenta
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Create a New Account</h2>
      <p className="text-sm text-green-100 mb-6">
        Create new account or add a new wallet to manage your funds.
      </p>
      <Button
        onPress={handleAddAccount}
        variant="flat"
        isIconOnly
        className="h-20 w-20 bg-white text-indigo-600 py-2 px-4 rounded-full hover:bg-green-50 transition-colors"
      >
        <PlusIcon className="h-14 w-14 " />
      </Button>
    </div>
  );
};
