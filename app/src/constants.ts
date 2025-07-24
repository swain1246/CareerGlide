const APP_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? '';
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? '';

export { API_URL, BASE_DOMAIN, APP_URL };

export const APP_ROUTE = {
  HOME: '/',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_AND_CONDITION: '/terms-of-use',
  CONTACT_US: '/contact-us',
  ABOUT_US: '/about-us',

  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_ACCOUNT: '/auth/verify-account',

  DASHBOARD: '/admin/dashboard',
};
