import React, { useReducer } from 'react';
import TransactionForm from './components/TransactionForm';

type Transaction = {
  id: number;
  description: string;
  amount: number;
};

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'REMOVE_TRANSACTION'; payload: number };

const transactionReducer = (state: Transaction[], action: Action): Transaction[] => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.payload];
    case 'REMOVE_TRANSACTION':
      return state.filter(transaction => transaction.id !== action.payload);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [transactions, dispatch] = useReducer(transactionReducer, []);

  const addTransaction = (description: string, amount: number) => {
    const newTransaction = {
      id: Date.now(),
      description,
      amount,
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Transações</h1>

      <TransactionForm onAddTransaction={addTransaction} />

      <ul className="mt-4">
        {transactions.map(transaction => (
          <li key={transaction.id} className="p-2 border-b">
            <span>{transaction.description}</span>

            <span className="ml-4">${transaction.amount}</span>

            <button
              onClick={() => dispatch({ type: 'REMOVE_TRANSACTION', payload: transaction.id })}
              className="text-red-500 ml-2"
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
