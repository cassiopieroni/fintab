import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { AplicationRoutes } from '@/routes/routes.enum';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="container mx-auto p-4 flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo ao Gerenciador de Transações</h1>
      <p className="mb-4 text-center">Esta é a página inicial. Aqui você encontra informações públicas sobre o aplicativo.</p>

      {!isAuthenticated && (
        <div className="flex justify-center">
          <Link to={AplicationRoutes.LOGIN} className="text-blue-500 hover:underline">
            Faça login para acessar suas transações
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
