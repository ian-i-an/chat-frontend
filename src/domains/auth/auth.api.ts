const ENDPOINT = "/api/auth";
const API_URL = import.meta.env.VITE_API_URL;

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }
};
