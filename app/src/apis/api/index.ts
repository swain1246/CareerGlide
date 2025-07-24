import { AxiosResponse } from 'axios';
import { JsonBody, makeRequest } from './requestBuilder';
import { AxiosProgressEvent } from 'axios';

export type RequestBody = JsonBody;

export type RequestMethod = (
  url: string,
  body?: RequestBody,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
) => Promise<AxiosResponse['data']>;

export interface ApiWrapper {
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  patch: RequestMethod;
  delete: RequestMethod;
}

export const API: ApiWrapper = {
  get: async (url: string, params?: JsonBody) =>
    makeRequest({
      method: 'get',
      url,
      params,
    }),

  post: async (
    url: string,
    body?: JsonBody,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) =>
    makeRequest({
      method: 'post',
      body,
      url,
      onUploadProgress,
    }),

  put: async (
    url: string,
    body?: JsonBody,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) =>
    makeRequest({
      method: 'put',
      body,
      url,
      onUploadProgress,
    }),

  patch: async (
    url: string,
    body?: JsonBody,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) =>
    makeRequest({
      method: 'patch',
      body,
      url,
      onUploadProgress,
    }),

  delete: async (
    url: string,
    body?: JsonBody,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) =>
    makeRequest({
      method: 'delete',
      body,
      url,
      onUploadProgress,
    }),
};
