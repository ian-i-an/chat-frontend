import type { UserDto } from "@/types/types";

const ENDPOINT = "/api/auth";
const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}):Promise<UserDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-in`, {
    method: "POST",
    // credentials: "include": 브라우저가 cross-origin 요청에도 쿠키를 포함하게 함
    // 기본은 same-origin 임, 이건 완전히 같아야 동작
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

  return response.json();
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
}) : Promise<UserDto>=> {
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

  return response.json();
};

export const signOut = async ():Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
   const error = await response.json();
    throw new Error(error.message);
  }
};
