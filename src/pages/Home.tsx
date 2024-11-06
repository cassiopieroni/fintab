import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Gerenciador de Transações</h1>
      <p className="mb-4">Esta é a página inicial. Aqui você encontra informações públicas sobre o aplicativo.</p>

      <Link to="/login" className="text-blue-500 hover:underline">
        Faça login para acessar suas transações
      </Link>
    </div>
  );
};

export default Home;
