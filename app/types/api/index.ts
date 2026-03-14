// ============================================================================
// Type Definitions
// ============================================================================

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"

export type QueryParams = Record<string, string | number | boolean | undefined>

export type RequestBody = Record<string, unknown> | FormData | Blob

export type FetchOptions<BodyType = unknown> = {
  method?: HttpMethod
  body?: BodyType | RequestBody
  query?: QueryParams
  headers?: Record<string, string>
  params?: QueryParams
}
