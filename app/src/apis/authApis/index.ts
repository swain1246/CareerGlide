import { ApiResponse } from '@src/redux/interfaces';
import { API } from '../api';
import { AUTH_APIS } from '../apiConstants';
import { API_URL } from '@src/constants';

// ✅ Error handler
const ReturnError = (error: any): ApiResponse<null> => ({
  success: false,
  message: error?.response?.data?.message || error?.message || 'An error occurred',
  errors: error?.response?.data?.errors ?? [],
  data: null,
});

// ================= COMMON AUTH ================= //

export const LoginApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.LOGIN, data)
    .then((res) => res.data) // extract the response body
    .catch(ReturnError);

export const LogoutApi = () =>
  API.post(AUTH_APIS.LOG_OUT)
    .then((res) => res.data)
    .catch(ReturnError);

export const VerifyMeApi = () =>
  API.get(AUTH_APIS.VERIFY_ME)
    .then((res) => res.data)
    .catch(ReturnError);

export const VerifyOtpApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.VERIFY_OTP, data)
    .then((res) => res.data)
    .catch(ReturnError);

export const ResendOtpApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.RESEND_OTP, data)
    .then((res) => res.data)
    .catch(ReturnError);

export default {
  LoginApi,
  VerifyOtpApi,
  ResendOtpApi,
};
