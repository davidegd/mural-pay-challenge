import React from "react";
import { TransferRequest } from "@/types/api";
import { executeTransfer } from "@/services/transfer";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface Props {
  transfers: TransferRequest[];
  onTransferExecuted: () => void;
}

export function TransferList({ transfers, onTransferExecuted }: Props) {
  const handleExecuteTransfer = async (transferId: string) => {
    try {
      await executeTransfer(transferId);
      onTransferExecuted();
    } catch (error) {
      console.error("Error executing transfer:", error);
    }
  };

  const pendingTransfers = transfers.filter((t) => t.status === "pending");
  const executedTransfers = transfers.filter((t) => t.status === "executed");

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transfers</h2>

      <div className="space-y-8">
        {pendingTransfers.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              Pending Transfers
            </h3>
            <div className="space-y-4">
              {pendingTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">${transfer.amount}</p>
                    <p className="text-sm text-gray-500">
                      To: {transfer.recipientDetails.bankName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleExecuteTransfer(transfer.id)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Execute
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {executedTransfers.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Executed Transfers
            </h3>
            <div className="space-y-4">
              {executedTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <p className="font-medium">${transfer.amount}</p>
                  <p className="text-sm text-gray-500">
                    To: {transfer.recipientDetails.bankName}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Executed on:{" "}
                    {new Date(transfer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {transfers.length === 0 && (
          <p className="text-center text-gray-500">No transfers yet</p>
        )}
      </div>
    </div>
  );
}
