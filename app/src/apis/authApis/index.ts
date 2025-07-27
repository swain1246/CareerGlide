/* eslint-disable */
import { ApiResponse } from '@src/interfaces';
import { API } from '../api';
import { AUTH_APIS } from '../apiConstants';

const ReturnError = (error: any): ApiResponse<null> => ({
  success: false,
  message: error?.response?.data?.message || error?.message || 'An error occurred',
  errors: error?.response?.data?.errors ?? [],
  data: null,
});

export const ReturnSuccess = <T>(response: ApiResponse<T>): T | undefined => {
  return response?.data;
};

// ================= COMMON AUTH ================= //

export const StudentRegisterApi = (data: Record<string, unknown>): any =>
  API.post(AUTH_APIS.STUDENT_REGISTER, data).then(ReturnSuccess).catch(ReturnError);

export const MentorRegisterApi = (data: Record<string, unknown>): any =>
  API.post(AUTH_APIS.MENTOR_REGISTER, data).then(ReturnSuccess).catch(ReturnError);

export const CompanyRegisterApi = (data: Record<string, unknown>): any =>
  API.post(AUTH_APIS.COMPANY_REGISTER, data).then(ReturnSuccess).catch(ReturnError);

export const LoginApi = (data: Record<string, unknown>): any =>
  API.post(AUTH_APIS.LOGIN, data).then(ReturnSuccess).catch(ReturnError);

export const VerifyOtpApi = (email: string, otp: string): any =>
  API.post(AUTH_APIS.VERIFY_OTP, {
    Email: email,
    Otp: otp,
  })
    .then(ReturnSuccess)
    .catch(ReturnError);

export const ResendOtpApi = (email: string): any =>
  API.post(`${AUTH_APIS.RESEND_OTP}?Email=${encodeURIComponent(email)}`)
    .then(ReturnSuccess)
    .catch(ReturnError);

export default {
  StudentRegisterApi,
  MentorRegisterApi,
  CompanyRegisterApi,
  LoginApi,
  VerifyOtpApi,
  ResendOtpApi,
};
