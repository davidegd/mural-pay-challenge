import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
  Chip,
} from '@heroui/react';
import { formatAmount, formatDate } from '@/utils/formatter';
import { TransferStatusEnum } from '@/constants/common';
import { Transaction } from '@/types/common';

interface TransactionsListProps {
  transactions: { total: number; results: Transaction[] };
  isLoading?: boolean;
  executeTransaction?: (transactionId: string) => void;
  isWidget?: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  isLoading,
  executeTransaction,
  isWidget = false,
}) => {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(20);

  const pages = React.useMemo(() => {
    return transactions?.total ? Math.ceil(transactions?.total / pageSize) : 0;
  }, [transactions?.total, pageSize]);

  const items = React.useMemo(() => {
    if (!transactions) return [];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return transactions.results.slice(start, end);
  }, [page, transactions]);

  const StatusBadge = (status: string) => {
    const statusColor = {
      [TransferStatusEnum.Pending]: 'success',
      [TransferStatusEnum.Failed]: 'danger',
      [TransferStatusEnum.Executed]: 'success',
      [TransferStatusEnum.InReview]: 'warning',
      [TransferStatusEnum.Cancelled]: 'danger',
    };

    const statusLabel = {
      [TransferStatusEnum.Pending]: 'Pending',
      [TransferStatusEnum.Failed]: 'Failed',
      [TransferStatusEnum.Executed]: 'Executed',
      [TransferStatusEnum.InReview]: 'In Review',
      [TransferStatusEnum.Cancelled]: 'Cancelled',
    };

    return (
      <Chip
        color={statusColor[status]}
        className={` badge-${statusColor[status]} rounded-full`}
      >
        {statusLabel[status]}
      </Chip>
    );
  };
  return (
    <Table
      aria-label="Transactions Table"
      className="bg-surface "
      bottomContent={
        pages > 0 && !isWidget ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Currency</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>{''}</TableColumn>
      </TableHeader>
      <TableBody
        className="bg-surface "
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {transactions &&
          Array.isArray(transactions?.results) &&
          transactions.results.length &&
          items.map(transaction => (
            <TableRow className="bg-surface " key={transaction.id}>
              <TableCell>
                <span className="text-foreground">
                  {formatDate(transaction.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-foreground">
                  {transaction.recipientsInfo[0].fiatDetails.currencyCode}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-foreground">
                  {formatAmount(transaction.recipientsInfo[0].tokenAmount)}
                </span>
              </TableCell>

              <TableCell>{StatusBadge(transaction.status)}</TableCell>
              <TableCell>
                {transaction.status === TransferStatusEnum.InReview &&
                !isWidget ? (
                  <Button
                    isDisabled={isLoading}
                    size="sm"
                    variant="ghost"
                    color="secondary"
                    onPress={() => executeTransaction(transaction.id)}
                  >
                    <span className="text-foreground"></span> Execute
                    transaction
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsList;
