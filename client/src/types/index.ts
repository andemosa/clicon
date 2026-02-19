export * from "./auth";
export * from "./profile";
export * from "./open";
export * from "./categories";
export * from "./tag";
export * from "./product";

type ApiError = {
  message: string; // user-friendly message
  statusCode?: number; // present for backend errors
  code?: string; // present for network/axios codes
  raw?: unknown; // original error for debugging
};

export type { ApiError };
