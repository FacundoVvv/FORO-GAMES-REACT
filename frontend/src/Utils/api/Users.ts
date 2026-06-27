import { UserData } from "@Types/User";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserInfo = async (username: string): Promise<UserData | null> => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("No se pudo obtener la información del usuario");
  const data = await response.json();
  return data.user;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: boolean }> => {
  const response = await fetch(`${BASE_URL}/users/change-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
  return { ok: response.ok };
};

export const updateUserLastResend = async (email: string): Promise<{ ok: boolean }> => {
  try {
    await fetch(`${BASE_URL}/user/updateUserLRT`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(email),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};