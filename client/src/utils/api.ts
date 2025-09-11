import axios, { type AxiosResponse } from "axios";

import { toaster } from "@/components/ui/toaster";
import type { ApiError } from "@/types";

const Http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    common: {
      Accept: "application/json",
    },
  },
});
Http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

function transformError(err: unknown): ApiError {
  const axiosErr = err as any;

  if (axiosErr.response) {
    const statusCode = axiosErr.response.status;
    return {
      message: axiosErr.response.data?.message ?? axiosErr.response.statusText,
      statusCode,
      raw: err,
    };
  }

  if (axiosErr.code === "ERR_NETWORK") {
    toaster.create({
      title: "Network Error",
      description: "Please check your network connection or try again later.",
      type: "warning",
    });

    return {
      message: "Network Error. Please check your connection.",
      code: axiosErr.code,
      raw: err,
    };
  }

  return {
    message: axiosErr.message ?? "Unknown error",
    code: axiosErr.code,
    raw: err,
  };
}

async function getReq<TResponse>(
  url: string
): Promise<AxiosResponse<TResponse>> {
  try {
    return await Http.get<TResponse, AxiosResponse<TResponse>>(url);
  } catch (err) {
    throw transformError(err);
  }
}

async function postReq<TResponse, TBody = unknown>(
  url: string,
  params?: TBody,
  headers: Record<string, string> = { "Content-Type": "application/json" }
): Promise<AxiosResponse<TResponse>> {
  try {
    return await Http.post<TResponse, AxiosResponse<TResponse>, TBody>(
      url,
      params,
      { headers }
    );
  } catch (err) {
    throw transformError(err);
  }
}

async function postReqWithFormdata<
  TResponse,
  TBody extends Record<string, any>,
>(
  url: string,
  params: TBody,
  headers: Record<string, string> = { "Content-Type": "multipart/form-data" }
): Promise<AxiosResponse<TResponse>> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v, index) => formData.append(`${key}[${index}]`, v));
    } else if (
      !["", "null", "undefined", null, undefined].includes(value as any)
    ) {
      formData.append(key, value as any);
    }
  }

  try {
    return await Http.post<TResponse, AxiosResponse<TResponse>>(url, formData, {
      headers,
    });
  } catch (err) {
    throw transformError(err);
  }
}

async function patchReq<TResponse, TBody = unknown>(
  url: string,
  params: TBody
): Promise<AxiosResponse<TResponse>> {
  try {
    return await Http.patch<TResponse, AxiosResponse<TResponse>, TBody>(
      url,
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    throw transformError(err);
  }
}

async function putReq<TResponse, TBody = unknown>(
  url: string,
  params: TBody
): Promise<AxiosResponse<TResponse>> {
  try {
    return await Http.put<TResponse, AxiosResponse<TResponse>, TBody>(
      url,
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    throw transformError(err);
  }
}

async function putReqWithFormdata<TResponse, TBody extends Record<string, any>>(
  url: string,
  params: TBody,
  headers: Record<string, string> = { "Content-Type": "multipart/form-data" }
): Promise<AxiosResponse<TResponse>> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v, index) => formData.append(`${key}[${index}]`, v));
    } else if (
      !["", "null", "undefined", null, undefined].includes(value as any)
    ) {
      formData.append(key, value as any);
    }
  }

  try {
    return await Http.put<TResponse, AxiosResponse<TResponse>>(url, formData, {
      headers,
    });
  } catch (err) {
    throw transformError(err);
  }
}

async function deleteReq<TResponse>(
  url: string
): Promise<AxiosResponse<TResponse>> {
  try {
    return await Http.delete<TResponse, AxiosResponse<TResponse>>(url, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw transformError(err);
  }
}

export const Api = {
  getReq,
  postReq,
  postReqWithFormdata,
  patchReq,
  putReq,
  putReqWithFormdata,
  deleteReq,
};
