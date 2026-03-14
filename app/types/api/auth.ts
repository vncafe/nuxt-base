// ============================================================================
// Type Definitions
// ============================================================================

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface TokenRequest {
  token: string
}

export interface EmailRequest {
  email: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface UpdateProfileRequest {
  name: string
  email: string
}

export interface ProviderRequest {
  provider: string
}

export interface UsernameRequest {
  username: string
}

export interface PhoneNumberRequest {
  phoneNumber: string
}

export interface VerifyPhoneNumberRequest {
  phoneNumber: string
  code: string
}

export interface SocialAccountRequest {
  provider: string
  token: string
}

export interface CodeRequest {
  code: string
}
