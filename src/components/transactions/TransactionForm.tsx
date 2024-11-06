import React, { useState } from 'react';
import { useAddTransactionMutate } from '../../hooks/transactions/useAddTransactionMutate';

const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);

  const { mutate, error, isPending } = useAddTransactionMutate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description && amount) {
      await mutate({ description, amount });

      setDescription('');
      setAmount(0);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-lg font-bold mb-2">Nova Transação</h2>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="border rounded p-2 mb-2 w-full"
          required
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Valor"
          className="border rounded p-2 mb-2 w-full"
          required
        />

        <button type="submit" className="bg-blue-500 text-white rounded p-2" disabled={isPending}>
          {isPending ? 'Adicionando a transação...' : 'Adicionar Transação'}
        </button>
      </form>

      {error && <span>Ocorreu um erro ao adicionar a transação. Por favor, tente novamente.</span>}
    </>
  );
};

export default TransactionForm;
