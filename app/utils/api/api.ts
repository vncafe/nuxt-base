import type { FetchOptions, QueryParams } from "@/types/api"

// ============================================================================
// API Fetch Utility - Flexible for all HTTP methods
// ============================================================================

/**
 * Generic API fetch function supporting all HTTP methods
 * @param url - The API endpoint URL
 * @param options - Request options (method, body, query, headers, etc.)
 * @returns Promise with the API response
 */
export const apiFetch = <T = unknown>(
  url: string,
  options: FetchOptions = {},
) => {
  const { method = "GET", body, query, headers, params } = options

  const requestOptions: Record<string, unknown> = {
    method,
    ...(headers && { headers }),
  }

  // Add body for methods that support it
  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    requestOptions.body = body
  }

  // Add query parameters
  if (query || params) {
    const queryParams = (query || params) as QueryParams
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce(
        (acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key] = String(value)
          }
          return acc
        },
        {} as Record<string, string>,
      ),
    ).toString()

    if (queryString) {
      requestOptions.query = queryParams
    }
  }

  return $fetch<T>(url, requestOptions)
}
