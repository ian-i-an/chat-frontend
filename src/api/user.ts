import type { UserDto } from "@/types/types";

const ENDPOINT = "/api/users";
const API_URL = import.meta.env.VITE_API_URL;

export const deleteAccount = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const updateNickname = async ({
  newNickname,
}: {
  newNickname: string;
}): Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newNickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchMyProfile = async (): Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json() ;
};

export const checkIdDuplication = async ({ loginId }: { loginId: string }) => {
  const response = await fetch(`${API_URL}${ENDPOINT}/check-id`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};


export const signUp = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}) : Promise<void>=> {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
