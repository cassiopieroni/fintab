import React, { useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ username, password });
      setError('');
      navigate('/transactions');
    } catch {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <p>Carregando...</p>}

        <div className="mb-4">
          <label className="block mb-2">Usuário</label>
          <input
            disabled={isLoading}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Senha</label>
          <input
            disabled={isLoading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full"
          disabled={isLoading}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
