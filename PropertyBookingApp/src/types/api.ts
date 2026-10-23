export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  originalError?: unknown;
}

export interface QueryOptions {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
}
