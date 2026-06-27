import { UserData } from "@Types/User";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type LoginSuccess = {
  success: string;
  data: UserData;
};

type LoginError = {
  message: string;
  email?: string;
  errorType?: string;
};

export type LoginResponse = {
  ok: boolean;
  status: number;
  data: LoginSuccess | LoginError;
};

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<{ ok: boolean; status: number }> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return { ok: response.ok, status: response.status };
};

export const resendEmailVerify = async (email: string): Promise<{ status: number }> => {
  const response = await fetch(`${BASE_URL}/auth/email-resend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return { status: response.status };
};

export const verifyCode = async (
  code: string,
  email: string
): Promise<{ success: boolean; message?: string }> => {
  const response = await fetch(`${BASE_URL}/auth/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, email }),
  });
  return await response.json();
};

export const logout = async (): Promise<{ ok: boolean }> => {
  const response = await fetch(`${BASE_URL}/auth/clear-cookies`, {
    method: "POST",
    credentials: "include",
  });
  return { ok: response.ok };
};