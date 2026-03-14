// ============================================================================
// Endpoint Constants
// ============================================================================

export const AUTH_ENDPOINTS = {
  // Refresh & Session
  REFRESH: "/refresh",
  LOGOUT: "/logout",
  LOGOUT_ALL_SESSIONS: "/logout-all-sessions",

  // Login & Register
  LOGIN: "/login",
  REGISTER: "/register",

  // Password Management
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  CHANGE_PASSWORD: "/change-password",

  // Email Verification
  VERIFY_EMAIL: "/verify-email",
  RESEND_VERIFICATION_EMAIL: "/resend-verification-email",

  // Profile Management
  UPDATE_PROFILE: "/update-profile",
  DELETE_ACCOUNT: "/delete-account",

  // Two-Factor Authentication
  ENABLE_2FA: "/enable-2fa",
  DISABLE_2FA: "/disable-2fa",
  VERIFY_2FA: "/verify-2fa",
  GENERATE_RECOVERY_CODES: "/generate-recovery-codes",
  USE_RECOVERY_CODE: "/use-recovery-code",

  // Social Account Integration
  LINK_SOCIAL_ACCOUNT: "/link-social-account",
  UNLINK_SOCIAL_ACCOUNT: "/unlink-social-account",

  // Email/Username/Phone Checks
  CHECK_EMAIL_EXISTS: "/check-email-exists",
  CHECK_USERNAME_EXISTS: "/check-username-exists",
  CHECK_PHONE_NUMBER_EXISTS: "/check-phone-number-exists",

  // Phone Number Verification
  SEND_VERIFICATION_CODE: "/send-verification-code",
  VERIFY_PHONE_NUMBER: "/verify-phone-number",
  UNVERIFY_PHONE_NUMBER: "/unverify-phone-number",
} as const
