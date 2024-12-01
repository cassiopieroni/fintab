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
    <div className='w-full flex justify-center'>
      <form onSubmit={handleSubmit} className="p-md bg-gray-100 rounded shadow-md">
        <h2 className="text-lg font-bold mb-md">Nova Transação</h2>

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

        <button type="submit" className="bg-primary text-white rounded p-2 w-full mt-md" disabled={isPending}>
          {isPending ? 'Adicionando a transação...' : 'Adicionar Transação'}
        </button>
      </form>

      {error && <span>Ocorreu um erro ao adicionar a transação. Por favor, tente novamente.</span>}
    </div>
  );
};

export default TransactionForm;
