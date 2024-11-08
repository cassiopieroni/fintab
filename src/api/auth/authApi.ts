import { LoginRequest } from "../../interfaces/auth/LoginRequest";
import { Roles } from "../../interfaces/auth/Roles";

export async function fakeAuthApi({ username, password }: LoginRequest): Promise<{ token: string, refreshToken: string, role: Roles }> {
  if (username === 'test' && password === 'test') {
    return new Promise((resolve) => setTimeout(() => resolve({ token: 'fake-jwt-token', refreshToken: 'fake-refresh-token', role: Roles.ADMIN }), 1000));
  } else if (username === 'user' && password === 'user') {
    return new Promise((resolve) => setTimeout(() => resolve({ token: 'fake-jwt-token', refreshToken: 'fake-refresh-token', role: Roles.USER }), 1000));
  } else {
    throw new Error('Credenciais inválidas');
  }
}

export async function fakeRefreshTokenApi(refreshToken: string): Promise<{ token: string }> {
  if (refreshToken === 'fake-refresh-token') {
    return new Promise((resolve) => setTimeout(() => resolve({ token: 'new-fake-jwt-token' }), 1000));
  } else {
    throw new Error('Invalid refresh token');
  }
}