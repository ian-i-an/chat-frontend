import type { UserDto } from "./user.type";

const ENDPOINT = "/api/users";
const API_URL = import.meta.env.VITE_API_URL;

export const register = async (): Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-up`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteUser = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const updateUser = async ({
  nickname,
}: {
  nickname: string;
}): Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const getMe = async (): Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
