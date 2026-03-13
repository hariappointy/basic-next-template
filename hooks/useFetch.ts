"use client";

import { useCallback, useEffect, useState } from "react";

import { apiClient } from "@/lib/apiClient";

interface UseFetchOptions<T> {
  initialData?: T;
  enabled?: boolean;
  revalidateOnMount?: boolean;
}

export function useFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(
    options.enabled !== false && options.initialData === undefined,
  );

  const refetch = useCallback(async (): Promise<T> => {
    setIsLoading(true);

    try {
      const nextData = await apiClient.get<T>(path);
      setData(nextData);
      setError(null);
      setIsLoading(false);
      return nextData;
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Something went wrong.");
      setIsLoading(false);
      throw nextError;
    }
  }, [path]);

  const enabled = options.enabled !== false;
  const shouldRevalidate =
    options.revalidateOnMount ?? options.initialData === undefined;

  useEffect(() => {
    if (!enabled || !shouldRevalidate) {
      return;
    }

    void refetch();
  }, [enabled, shouldRevalidate, refetch]);

  return {
    data,
    error,
    isLoading,
    refetch,
    setData,
  };
}
