import React, { useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { AplicationRoutes } from '@/routes/routes.enum';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { loginMutation } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await loginMutation.mutateAsync({ username, password });
    navigate(AplicationRoutes.TRANSACTIONS);
  };

  const { error, isPending } = loginMutation;

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error.message || 'Erro ao fazer login'}</p>}

        {isPending && <p>Carregando...</p>}

        <div className="mb-4">
          <label className="block mb-2">Usuário</label>
          <input
            disabled={isPending}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Senha</label>
          <input
            disabled={isPending}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full"
          disabled={isPending}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
