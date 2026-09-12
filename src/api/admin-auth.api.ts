import type { AdminSignInRequest } from "../domain/admin.type";

const ENDPOINT = "/api/admin/auth";
const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async (request: AdminSignInRequest): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-out`, {
    method: "POST",
    credentials: "include",
  });

 if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
