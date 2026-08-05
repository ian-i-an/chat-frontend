import type { User } from "@/types/types";

const ENDPOINT = "/api/auth";
const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(error?.message);
  }

  return response.json();
};

export const checkIdDuplication = async ({
  loginId,
}: {
  loginId: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/check-id`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(error?.message);
  }
};

export const signUp = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(error?.message);
  }

  return response.json();
};

export const fetchMyProfile = async (): Promise<User> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(error?.message);
  }

  return response.json();
};

export const signOut = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(error?.message);
  }
};
