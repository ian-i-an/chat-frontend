import type { Room, RoomListItem } from "@/types/types";
import { client } from "./client";

const ENDPOINT = "/api/rooms";

export const createRoom = async ({ roomName }: { roomName: string }) => {
  const response = await client.post<RoomListItem>(ENDPOINT, {
    roomName,
  });
  return response.data;
};

export const fetchRooms = async () => {
  const response = await client.get<RoomListItem[]>(ENDPOINT);
  return response.data;
};

export const fetchRoomById = async ({ roomId }: { roomId: number }) => {
  const response = await client.get<Room>(`${ENDPOINT}/${roomId}`);
  return response.data;
};
