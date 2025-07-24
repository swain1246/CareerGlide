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

export const StudentRegisterApi = (data: Record<string, unknown>): any =>
  API.post(AUTH_APIS.STUDENT_REGISTER, data)
    .then((res) => res.data)
    .then(ReturnSuccess)
    .catch(ReturnError);

export default {
  StudentRegisterApi,
};
