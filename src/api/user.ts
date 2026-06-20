import type { User } from "@/types";
import { client } from "./client";

export const deleteAccount = async () => {
  await client.delete<void>("/api/users");
};

export const updateNickname = async ({
  newNickname,
}: {
  newNickname: string;
}) => {
  const response = await client.patch<User>("/api/users", { newNickname });
  return response.data;
};
