import { AUTH_ENDPOINTS } from "~/constants/api/auth"
import type { FetchOptions } from "~/types/api"
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  TokenRequest,
  EmailRequest,
  UpdateProfileRequest,
  CodeRequest,
  SocialAccountRequest,
  ProviderRequest,
  UsernameRequest,
  PhoneNumberRequest,
  VerifyPhoneNumberRequest,
} from "~/types/api/auth"
import { apiFetch } from "~/utils/api/api"

// ============================================================================
// Auth-specific Fetch Wrapper
// ============================================================================

/**
 * Auth-specific fetch function - convenience wrapper for auth endpoints
 * @param endpoint - The auth endpoint from AUTH_ENDPOINTS
 * @param options - Request options (defaults to POST method)
 * @returns Promise with the API response
 */
const authFetch = <T = unknown>(
  endpoint: (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS],
  options: FetchOptions = {},
) => {
  return apiFetch<T>(`/api/auth${endpoint}`, {
    method: "POST",
    ...options,
  })
}

// ============================================================================
// Refresh & Session
// ============================================================================

export const refreshToken = () => authFetch(AUTH_ENDPOINTS.REFRESH)

export const logout = () => authFetch(AUTH_ENDPOINTS.LOGOUT)

export const logoutAllSessions = () =>
  authFetch(AUTH_ENDPOINTS.LOGOUT_ALL_SESSIONS)

// ============================================================================
// Login & Register
// ============================================================================

export const login = (data: LoginRequest) =>
  authFetch(AUTH_ENDPOINTS.LOGIN, { body: data })

export const register = (data: RegisterRequest) =>
  authFetch(AUTH_ENDPOINTS.REGISTER, { body: data })

// ============================================================================
// Password Management
// ============================================================================

export const forgotPassword = (data: ForgotPasswordRequest) =>
  authFetch(AUTH_ENDPOINTS.FORGOT_PASSWORD, { body: data })

export const resetPassword = (data: ResetPasswordRequest) =>
  authFetch(AUTH_ENDPOINTS.RESET_PASSWORD, { body: data })

export const changePassword = (data: ChangePasswordRequest) =>
  authFetch(AUTH_ENDPOINTS.CHANGE_PASSWORD, { body: data })

// ============================================================================
// Email Verification
// ============================================================================

export const verifyEmail = (data: TokenRequest) =>
  authFetch(AUTH_ENDPOINTS.VERIFY_EMAIL, { body: data })

export const resendVerificationEmail = (data: EmailRequest) =>
  authFetch(AUTH_ENDPOINTS.RESEND_VERIFICATION_EMAIL, { body: data })

// ============================================================================
// Profile Management
// ============================================================================

export const updateProfile = (data: UpdateProfileRequest) =>
  authFetch(AUTH_ENDPOINTS.UPDATE_PROFILE, { body: data })

export const deleteAccount = () => authFetch(AUTH_ENDPOINTS.DELETE_ACCOUNT)

// ============================================================================
// Two-Factor Authentication
// ============================================================================

export const enableTwoFactor = () => authFetch(AUTH_ENDPOINTS.ENABLE_2FA)

export const disableTwoFactor = () => authFetch(AUTH_ENDPOINTS.DISABLE_2FA)

export const verifyTwoFactor = (data: TokenRequest) =>
  authFetch(AUTH_ENDPOINTS.VERIFY_2FA, { body: data })

export const generateRecoveryCodes = () =>
  authFetch(AUTH_ENDPOINTS.GENERATE_RECOVERY_CODES)

export const useRecoveryCode = (data: CodeRequest) =>
  authFetch(AUTH_ENDPOINTS.USE_RECOVERY_CODE, { body: data })

// ============================================================================
// Social Account Integration
// ============================================================================

export const linkSocialAccount = (data: SocialAccountRequest) =>
  authFetch(AUTH_ENDPOINTS.LINK_SOCIAL_ACCOUNT, { body: data })

export const unlinkSocialAccount = (data: ProviderRequest) =>
  authFetch(AUTH_ENDPOINTS.UNLINK_SOCIAL_ACCOUNT, { body: data })

// ============================================================================
// Email/Username/Phone Checks
// ============================================================================

export const checkEmailExists = (data: EmailRequest) =>
  authFetch(AUTH_ENDPOINTS.CHECK_EMAIL_EXISTS, { body: data })

export const checkUsernameExists = (data: UsernameRequest) =>
  authFetch(AUTH_ENDPOINTS.CHECK_USERNAME_EXISTS, { body: data })

export const checkPhoneNumberExists = (data: PhoneNumberRequest) =>
  authFetch(AUTH_ENDPOINTS.CHECK_PHONE_NUMBER_EXISTS, { body: data })

// ============================================================================
// Phone Number Verification
// ============================================================================

export const sendVerificationCode = (data: PhoneNumberRequest) =>
  authFetch(AUTH_ENDPOINTS.SEND_VERIFICATION_CODE, { body: data })

export const verifyPhoneNumber = (data: VerifyPhoneNumberRequest) =>
  authFetch(AUTH_ENDPOINTS.VERIFY_PHONE_NUMBER, { body: data })

export const unverifyPhoneNumber = (data: PhoneNumberRequest) =>
  authFetch(AUTH_ENDPOINTS.UNVERIFY_PHONE_NUMBER, { body: data })
