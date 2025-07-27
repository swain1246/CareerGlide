import { ApiResponse } from '@src/interfaces';
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
