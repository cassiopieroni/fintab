/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from 'react';
import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { fakeAuthApi } from '../api/auth/authApi';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: ({ username, password }: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async ({ username, password }: LoginRequest) => {
    const response = await fakeAuthApi({ username, password });
    setToken(response.token);
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
