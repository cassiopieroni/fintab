import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { addTransaction, fetchTransactions, removeTransaction, Transaction } from './api/transactionsApi';
import TransactionForm from './components/TransactionForm';


const App: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: transactions, isFetching, error: getTransactionsError, } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const { mutate: addNewTransactionMutate, error: addTransactionError, isPending: isAddingTransaction } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const { mutate: removeTransactionMutate, error: removeTransactionError, isPending: isRemovingTransaction } = useMutation({
    mutationFn: removeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const handleAddTransaction = (description: string, amount: number) => {
    addNewTransactionMutate({ description, amount });
  };

  const handleDeleteTransaction = (id: number) => {
    removeTransactionMutate(id);
  };

  const isLoading = isFetching || isAddingTransaction || isRemovingTransaction;
  const hasError = getTransactionsError || addTransactionError || removeTransactionError;

  if (isLoading) return <div>Carregando...</div>;
  if (hasError) return <div>Ocorreu um erro</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Transações</h1>

      <TransactionForm onAddTransaction={handleAddTransaction} />

      <ul className="mt-4">
        {(transactions ?? []).map((transaction) => (
          <li key={transaction.id} className="p-2 border-b">
            <span>{transaction.description}</span>
            <span className="ml-4">${transaction.amount}</span>

            <button
              className="bg-red-400 text-white rounded p-2 ml-5"
              onClick={() => handleDeleteTransaction(transaction.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
