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
    <div className="mt-lg max-w-5xl flex flex-col justify-center mx-auto">
      <ul className="w-full">
        {transactions?.map((transaction) => (
          <li key={transaction.id} className={`flex p-md px-md border-b  items-center justify-between`}>
            <span>{transaction.description}</span>
            <div>
              <span className="ml-4">${transaction.amount}</span>

              <button
                className={`${(isPendingDelete || isFetchingTransactions) ? 'text-gray-500' : 'text-danger'} ml-md min-w-32`}
                onClick={() => handleDeleteTransaction(transaction.id)}
                disabled={isPendingDelete || isFetchingTransactions}
              >
                {isPendingDelete && removedTrasactionId === transaction.id ? 'Removendo...' : 'Remover'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="p-md border-b flex items-center justify-between">
        <span>Current Page: {currPageLabel}</span>

        <div>
          <button
            className={`${(currPage === 1 || isFetchingTransactions) ? 'text-gray-500' : 'text-primary'}`}
            onClick={() => onChangePage(currPage - 1)}
            disabled={currPage === 1 || isFetchingTransactions}
          >
            Página Anterior
          </button>

          <button
            className={`${(isFetchingTransactions || currPage === totalPages) ? 'text-gray-500' : 'text-primary'} ml-md min-w-32`}
            onClick={() => onChangePage(currPage + 1)}
            disabled={isFetchingTransactions || currPage === totalPages}
          >
            Próxima Página
          </button>
        </div>
      </div>

      {(isFetchingTransactions || isPendingDelete) && <span className='mt-lg font-bold text-center'>Atualizando as transações...</span>}
    </div>
  );
};

export default TransactionList;
