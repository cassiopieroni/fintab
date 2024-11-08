import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sem autorização</h1>
      <p className="mb-4">Você não possui autorização para esta seção.</p>
    </div>
  );
};

export default Unauthorized;
