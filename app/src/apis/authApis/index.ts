import { ApiResponse } from '@src/redux/interfaces';
import { API } from '../api';
import { AUTH_APIS } from '../apiConstants';

// Reusable response handlers
const ReturnSuccess = <T>(data: ApiResponse<T>): ApiResponse<T> => data;

const ReturnError = (error: any): ApiResponse => ({
  success: false,
  message: error?.message || 'An error occurred',
  errors: error?.errors ?? [],
});

// ================= COMMON AUTH ================= //

export const LoginApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.LOGIN, data)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export const LogoutApi = () =>
  API.post(AUTH_APIS.LOG_OUT)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export const VerifyMeApi = () =>
  API.get(AUTH_APIS.VERIFY_ME)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export const VerifyOtpApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.VERIFY_OTP, data)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export const ResendOtpApi = (data: Record<string, unknown>) =>
  API.post(AUTH_APIS.RESEND_OTP, data)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export default {
  LoginApi,
  LogoutApi,
  VerifyMeApi,
  VerifyOtpApi,
  ResendOtpApi,
};
