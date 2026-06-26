import type { User } from "@/types/types";
import { client } from "./client";

const ENDPOINT = "/api/auth";

export const signIn = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}) => {
  const response = await client.post<User>(`${ENDPOINT}/sign-in`, {
    loginId,
    password,
  });

  return response.data;
};

export const checkIdDuplication = async ({ loginId }: { loginId: string }) => {
  await client.post<void>(`${ENDPOINT}/check-id`, { loginId });
};

export const signUp = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}) => {
  const response = await client.post<User>(`${ENDPOINT}/sign-up`, {
    loginId,
    password,
  });
  return response.data;
};

export const fetchMyProfile = async () => {
  const response = await client.get<User>(`${ENDPOINT}/me`);
  return response.data;
};

export const signOut = async () => {
  await client.post<void>(`${ENDPOINT}/sign-out`);
};
