export * from "./auth";

type ApiError = {
  message: string; // user-friendly message
  statusCode?: number; // present for backend errors
  code?: string; // present for network/axios codes
  raw?: unknown; // original error for debugging
};

export type { ApiError };
