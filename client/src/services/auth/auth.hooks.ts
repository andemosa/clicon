import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { AuthService } from "./auth.service";
import { queryKeys } from "../queryKeys";

import type {
  ApiError,
  SigninReq,
  SigninRes,
  SignupReq,
  SignupRes,
} from "@/types";

export const useSignup = (
  options?: UseMutationOptions<SignupRes, ApiError, SignupReq>
) => {
  return useMutation<SignupRes, ApiError, SignupReq>({
    mutationKey: queryKeys.signup,
    mutationFn: async (params: SignupReq) => {
      return await AuthService.signup({ params });
    },
    ...options,
  });
};

export const useSignin = (
  options?: UseMutationOptions<SigninRes, ApiError, SigninReq>
) => {
  return useMutation<SigninRes, ApiError, SigninReq>({
    mutationKey: queryKeys.signin,
    mutationFn: async (params: SigninReq) => {
      return await AuthService.signin({ params });
    },
    ...options,
  });
};

export const useSignout = (
  options?: UseMutationOptions<SigninRes, ApiError>
) => {
  return useMutation<SigninRes, ApiError>({
    mutationKey: queryKeys.signin,
    mutationFn: async () => {
      return await AuthService.signout();
    },
    ...options,
  });
};
