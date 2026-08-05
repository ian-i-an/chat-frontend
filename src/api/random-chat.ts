const ENDPOINT = "/api/random-chat";
const API_URL = import.meta.env.VITE_API_URL;

export const startRandomChat = async ({
  initialMessage,
}: {
  initialMessage?: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/start`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initialMessage ? { initialMessage } : {}),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const sendRandomChatMessage = async ({
  content,
}: {
  content: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const leaveRandomChat = async (): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/leave`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
