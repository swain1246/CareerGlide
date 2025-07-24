import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosProgressEvent } from 'axios';
import { API_URL } from '@src/constants';

import flashMessage from '@src/components/FlashMessage';
export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
export type GoogleHTTPMethod = 'get' | 'post';

export interface JsonBody {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface Request {
  method: HTTPMethod;
  url: string;
  body?: JsonBody;
  params?: any;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export interface GoogleRequest {
  method: GoogleHTTPMethod;
  url: string;
  body?: JsonBody;
  params?: any;
}

const buildRequest = (request: Request) => {
  const { body, method, url, params, onUploadProgress } = request;
  const contentType =
    body instanceof FormData ? 'multipart/form-data' : 'application/json; charset=utf-8';

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': contentType, // Example header
  };

  const requestConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    withCredentials: true,
    data: body,
    headers,
    method,
    url,
    params,
    onUploadProgress,
  };
  return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
  status: 500,
  data: {
    message: 'Server Error',
  },
};

export const formatError = (responseError: AxiosError<any>) => {
  const response = responseError.response || defaultResponse;
  const errorMessage = String(
    (response.data && (response.data.error ?? response.data.detail)) ?? 'Server Error',
  );
  const errors = response.data && response.data.errors;
  if (
    ['Authorization Failed.', 'Session Expired.'].includes(errorMessage.toString()) &&
    response.status == 401
  ) {
    flashMessage(errorMessage, 'error');
  }
  return {
    code: response.status,
    message: errorMessage ?? 'Server Error',
    errors: errors ?? [],
  };
};

export const makeRequest = async (request: Request) => {
  const requestConfig = buildRequest(request);
  return new Promise((resolve, reject) => {
    const axiosRequest: AxiosPromise = axios(requestConfig);
    axiosRequest.then(resolve).catch((error: AxiosError) => {
      reject(formatError(error));
    });
  });
};
