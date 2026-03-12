import type { ApiResponse } from "@/types/api";

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    return (await response.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      error: "The server returned an invalid response.",
    };
  }
}

class ApiClient {
  async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      credentials: "include",
    });

    const payload = await parseResponse<T>(response);

    if (!response.ok || !payload.success) {
      throw new Error(payload.success ? "Request failed." : payload.error);
    }

    return payload.data;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
      cache: "no-store",
    });
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }

  patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
