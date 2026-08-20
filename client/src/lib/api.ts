// Clinical Evidence Observatory: API adapter keeps React presentation separate from FastAPI contracts.
import type { DemoScenario, HealthResponse, MetricsResponse, QueryResponse } from "@/types/clinical";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const clinicalApi = {
  health: () => request<HealthResponse>("/health"),
  metrics: () => request<MetricsResponse>("/metrics"),
  scenarios: () => request<DemoScenario[]>("/demo-scenarios"),
  query: (payload: { query: string }) =>
    request<QueryResponse>("/query", { method: "POST", body: JSON.stringify(payload) }),
};
