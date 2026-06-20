import type { User } from "@/types";
import { client } from "./client";

export const signIn = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}) => {
  const response = await client.post<User>("/api/auth/sign-in", {
    loginId,
    password,
  });

  return response.data;
};

export const checkIdDuplication = async ({ loginId }: { loginId: string }) => {
  await client.post<void>("/api/auth/check-id", { loginId });
};

export const signUp = async ({
  loginId,
  password,
}: {
  loginId: string;
  password: string;
}) => {
  const response = await client.post<User>("/api/auth/sign-up", {
    loginId,
    password,
  });
  return response.data;
};

export const fetchMyProfile = async () => {
  const response = await client.get<User>("/api/auth/me");
  return response.data;
};

export const signOut = async () => {
  await client.post<void>("/api/auth/sign-out");
};
