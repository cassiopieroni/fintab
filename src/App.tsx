// src/App.tsx
import React from 'react';
import TransactionForm from './components/TransactionForm';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Transações</h1>
      <TransactionForm />
    </div>
  );
};

export default App;
