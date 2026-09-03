import type {
  RoomCreateRequest,
  RoomDto,
  RoomListItem,
} from "@/types/types";

const ENDPOINT = "/api/rooms";
const API_URL = import.meta.env.VITE_API_URL;

export const createRoom = async ({
  roomName,
}: RoomCreateRequest): Promise<RoomListItem> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchRooms = async (): Promise<RoomListItem[]> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchRoomById = async ({
  roomCode,
}: {
  roomCode: string;
}): Promise<RoomDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${roomCode}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
