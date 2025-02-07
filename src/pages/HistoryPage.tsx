import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { TransferList } from "@/components/TransferList";
import { getTransfers } from "@/services/api";
import type { TransferRequest } from "@/types/api";

export function HistoryPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const [transfers, setTransfers] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      loadTransfers();
    }
  }, [customerId]);

  const loadTransfers = async () => {
    if (!customerId) return;
    try {
      setLoading(true);
      const data = await getTransfers(customerId);
      setTransfers(data);
    } catch (error) {
      console.error("Error loading transfers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lg text-gray-600">Loading transfers...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Transfer History
      </h1>
      <TransferList transfers={transfers} onTransferExecuted={loadTransfers} />
    </div>
  );
}
