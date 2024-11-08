/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from 'react';
import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { fakeAuthApi, fakeRefreshTokenApi } from '../api/auth/authApi';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Roles } from '../interfaces/auth/Roles';

type RefreshLoginMutation = UseMutationResult<{
  token: string;
}, Error, void, unknown>

type LoginMutation = UseMutationResult<{
  token: string;
  refreshToken: string;
}, Error, LoginRequest, unknown>

interface AuthContextType {
  isAuthenticated: boolean;
  loginMutation: LoginMutation;
  logout: () => void;
  refreshLoginMutation: RefreshLoginMutation;
  role: Roles | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [role, setRole] = useState<Roles | null>(localStorage.getItem('role') as Roles);

  const loginMutation = useMutation({
    mutationFn: fakeAuthApi,
    onSuccess: (data) => {
      setRole(data?.role);
      localStorage.setItem('role', data?.role);

      setToken(data?.token);
      localStorage.setItem('token', data?.token);

      setRefreshToken(data?.refreshToken);
      localStorage.setItem('refreshToken', data?.refreshToken);
    },
  });

  const refreshLoginMutation = useMutation({
    mutationFn: () => {
      if (!refreshToken) throw new Error('No refresh token available');

      return fakeRefreshTokenApi(refreshToken);
    },
    onSuccess: (data) => {
      setToken(data?.token);
      localStorage.setItem('token', data?.token);
    },
  });

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');

    setToken(null);
    localStorage.removeItem('token');

    setRefreshToken(null);
    localStorage.removeItem('refreshToken');
  };

  const contextValue = {
    isAuthenticated: Boolean(token),
    loginMutation,
    logout,
    refreshLoginMutation,
    role,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
