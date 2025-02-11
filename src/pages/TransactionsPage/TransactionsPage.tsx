import React, { useEffect, useState } from "react";
import TransactionsList from "@/components/TransactionList";
import { useAppContext } from "@/hooks/useAppContext";
import { Button, ButtonGroup } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constants/routes";
import { SwitchCamera } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { TransferStatusEnum } from "@/constants/common";
import { ExecutedTransactionModal } from "@/components/ExecutedTransactionModal";

const TransactionsPage: React.FC = () => {
  const {
    state: { transactions },
    dispatch,
  } = useAppContext();
  const navigate = useNavigate();
  const { getTransactions, loadingTransactions, executeTransaction } =
    useTransactions(dispatch);
  const [transactionStatus, setTransactionStatus] = useState<
    TransferStatusEnum[] | null
  >([TransferStatusEnum.InReview]);
  const [executeTransactionModal, setExecuteTransactionModal] = useState(false);

  useEffect(() => {
    getTransactions(transactionStatus);
  }, [transactionStatus]);

  const handleExecuteTransaction = async (transactionId: string) => {
    const response = await executeTransaction(transactionId);
    if (response) {
      setExecuteTransactionModal(true);
      getTransactions(transactionStatus);
    }
  };

  return (
    <div className="min-h-screen flex py-4 sm:py-6 lg:py-8">
      <div className="w-full  space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Transactions
          </h2>
          <Button
            size="lg"
            color="primary"
            radius="md"
            onPress={() =>
              navigate(`${AppRoutes.dashboard}${AppRoutes.transfer}`)
            }
            startContent={<SwitchCamera size={24} />}
          >
            Make Transaction
          </Button>
        </div>

        <ButtonGroup>
          <Button
            size="lg"
            variant={
              transactionStatus?.includes(TransferStatusEnum.InReview)
                ? "solid"
                : "ghost"
            }
            color="secondary"
            onPress={() => setTransactionStatus([TransferStatusEnum.InReview])}
          >
            In Review
          </Button>
          <Button
            size="lg"
            color="secondary"
            variant={
              transactionStatus?.includes(TransferStatusEnum.Pending)
                ? "solid"
                : "ghost"
            }
            onPress={() => setTransactionStatus([TransferStatusEnum.Pending])}
          >
            Pending
          </Button>
        </ButtonGroup>

        <TransactionsList
          transactions={transactions || { results: [], total: 0 }}
          isLoading={loadingTransactions}
          executeTransaction={handleExecuteTransaction}
        />
        <ExecutedTransactionModal
          isOpen={executeTransactionModal}
          onClose={() => setExecuteTransactionModal(false)}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
