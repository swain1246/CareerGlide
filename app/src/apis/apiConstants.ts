// export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// export const AUTH_APIS = {
//   LOGIN: '/auth/Login',
//   STUDENT_REGISTER: '/auth/StudentRegister',
//   COMPANY_REGISTER: '/auth/CompanyRegister',
//   MENTOR_REGISTER: '/auth/MentorRegister',
//   RESEND_OTP: '/auth/ResendOTP',
//   VERIFY_OTP: '/auth/VerifyRegisterOTP',
//   FORGOT_PASSWORD: '/auth/SendForgotPasswordMail',
//   VERIFY_FORGOT_PASSWORD: '/auth/VerifyForgotPasswordOTP',
//   RESET_PASSWORD: '/auth/ResetPassword',
//   LOG_OUT: '/auth/logout',
//   VERIFY_ME: '/auth/me',
// };



export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const AUTH_APIS = {
  LOGIN: `${API_URL}/auth/Login`,
  STUDENT_REGISTER: `${API_URL}/auth/StudentRegister`,
  COMPANY_REGISTER: `${API_URL}/auth/CompanyRegister`,
  MENTOR_REGISTER: `${API_URL}/auth/MentorRegister`,
  RESEND_OTP: `${API_URL}/auth/ResendOTP`,
  VERIFY_OTP: `${API_URL}/auth/VerifyRegisterOTP`,
  FORGOT_PASSWORD: `${API_URL}/auth/SendForgotPasswordMail`,
  VERIFY_FORGOT_PASSWORD: `${API_URL}/auth/VerifyForgotPasswordOTP`,
  RESET_PASSWORD: `${API_URL}/auth/ResetPassword`,
  LOG_OUT: `${API_URL}/auth/logout`,
  VERIFY_ME: `${API_URL}/auth/me`,
};

