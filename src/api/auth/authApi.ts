import { LoginRequest } from "../../interfaces/auth/LoginRequest";

export async function fakeAuthApi({ username, password }: LoginRequest): Promise<{ token: string }> {
  if (username === 'test' && password === 'test') {
    return new Promise((resolve) => setTimeout(() => resolve({ token: 'fake-jwt-token' }), 500));
  } else {
    throw new Error('Credenciais inválidas');
  }
}