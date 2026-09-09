import type { RoomDto, RoomListItem } from "./room.type";

const ENDPOINT = "/api/rooms";
const API_URL = import.meta.env.VITE_API_URL;

export const create = async ({
  roomName,
}: {
  roomName: string;
}): Promise<RoomListItem> => {
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

export const getMyRooms = async (): Promise<RoomListItem[]> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const getRoom = async ({
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

export const update = async ({
  roomCode,
  newName,
}: {
  roomCode: string;
  newName: string;
}): Promise<RoomListItem> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${roomCode}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteRoom = async ({
  roomCode,
}: {
  roomCode: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${roomCode}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
