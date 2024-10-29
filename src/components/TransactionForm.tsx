// src/components/TransactionForm.tsx
import React, { useState } from 'react';

const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ description, amount });

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Nova Transação</h2>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        className="border rounded p-2 mb-2 w-full"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Valor"
        className="border rounded p-2 mb-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Adicionar Transação
      </button>
    </form>
  );
};

export default TransactionForm;
