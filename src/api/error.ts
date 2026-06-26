import type { ErrorResponse } from "@/types/types";
import { isAxiosError } from "axios";

export class ApiError extends Error {
  code: string;
  details: Record<string, unknown>;
  constructor({ code, message, details }: ErrorResponse) {
    super(message); // ← Error 인스턴스로 만들어줌 (TanStack Query 호환)
    this.code = code;
    this.details = details ?? {};
  }
}

export function toApiError(error: unknown): ApiError {
  if (isAxiosError(error) && error.response?.data) {
    return new ApiError(error.response.data as ErrorResponse);
  }
  return new ApiError({
    code: "UNKNOWN",
    message: "알 수 없는 오류가 발생했습니다.",
    details: {},
  });
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
