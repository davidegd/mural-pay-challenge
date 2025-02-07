import React, { useState } from "react";
import { createTransferRequest } from "@/services/transactions";
import { Send } from "lucide-react";
import { Button, Input } from "@heroui/react";

interface Props {
  accountId: string;
  onTransferCreated: () => void;
}

export function TransferForm({ accountId, onTransferCreated }: Props) {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTransferRequest({
        accountId,
        amount,
        recipientDetails: {
          bankName,
          accountNumber,
          routingNumber,
        },
      });
      onTransferCreated();
      setAmount("");
      setBankName("");
      setAccountNumber("");
      setRoutingNumber("");
    } catch (error) {
      console.error("Error creating transfer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background rounded shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Transfer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (USD)
          </label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="bankName"
            className="block text-sm font-medium text-gray-700"
          >
            Recipient Bank Name
          </label>
          <Input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="accountNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Account Number
          </label>
          <Input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="routingNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Routing Number
          </label>
          <Input
            type="text"
            id="routingNumber"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          color="primary"
          disabled={loading}
          className="w-full flex items-center justify-center  font-medium text-white"
        >
          {loading ? (
            "Creating Transfer..."
          ) : (
            <>
              Create Transfer
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
