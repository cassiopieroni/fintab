import React from 'react';
import { useDeleteTransactionMutate } from '../../hooks/transactions/useDeleteTransactionMutate';
import { Transaction } from '../../interfaces/transactions/transaction';

interface Props {
  transactions: Transaction[];
  currPage: number;
  totalPages: number;
  isFetchingTransactions: boolean;
  onChangePage: (page: number) => void;
}

const TransactionList: React.FC<Props> = ({
  transactions,
  isFetchingTransactions,
  currPage,
  totalPages,
  onChangePage
}) => {
  const {
    mutate,
    isPending: isPendingDelete,
    variables: removedTrasactionId
  } = useDeleteTransactionMutate();

  const handleDeleteTransaction = async (id: number) => {
    await mutate(id);
  };

  const currPageLabel = `${currPage}/${totalPages || ''}`;

  return (
    <>
      <ul className="mt-4">
        {transactions?.map((transaction) => (
          <li key={transaction.id} className="p-2 border-b">
            <span>{transaction.description}</span>
            <span className="ml-4">${transaction.amount}</span>

            <button
              className="bg-red-400 text-white rounded p-2 ml-5"
              onClick={() => handleDeleteTransaction(transaction.id)}
              disabled={isPendingDelete}
            >
              {(isPendingDelete && removedTrasactionId === transaction.id) ? 'Removendo...' : 'Remover'}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-2 border-b mb-4">
        <span>Current Page: {currPageLabel}</span>

        <button
          className="bg-red-400 text-white rounded p-2 ml-5"
          onClick={() => onChangePage(currPage - 1)}
          disabled={currPage === 1 || isFetchingTransactions}
        >
          Página Anterior
        </button>

        <button
          className="bg-red-400 text-white rounded p-2 ml-5"
          onClick={() => onChangePage(currPage + 1)}
          disabled={isFetchingTransactions || currPage === totalPages}
        >
          Próxima Página
        </button>
      </div>

      {isFetchingTransactions && <span className='ml-2'>Atualizando as transações</span>}
    </>
  );
};

export default TransactionList;
