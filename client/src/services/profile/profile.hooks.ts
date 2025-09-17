import {
  type UseMutationOptions,
  type UseQueryOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { ProfileService } from "./profile.service";
import { queryKeys } from "../queryKeys";

import type {
  UpdateProfileRes,
  ApiError,
  UpdateProfileReq,
  UserProfileRes,
  UpdatePasswordReq,
  UpdatePasswordRes,
  AddressType,
  UpdateAddressReq,
  UpdateAddressRes,
  UserDashboardRes,
} from "@/types";

export const useUpdateProfile = (
  options?: UseMutationOptions<UpdateProfileRes, ApiError, UpdateProfileReq>
) => {
  return useMutation<UpdateProfileRes, ApiError, UpdateProfileReq>({
    mutationKey: queryKeys.updateProfile,
    mutationFn: async (params: UpdateProfileReq) => {
      return await ProfileService.updateProfile({ params });
    },
    ...options,
  });
};

export const profileQueryOptions = queryOptions<UserProfileRes, ApiError>({
  queryKey: queryKeys.getProfile,
  queryFn: () => ProfileService.profile(),
});

export const useProfileQuery = (
  options?: UseQueryOptions<UserProfileRes, ApiError>
) => {
  return useQuery<UserProfileRes, ApiError>({
    queryKey: queryKeys.getProfile,
    queryFn: () => ProfileService.profile(),
    ...options,
  });
};

export const useDashboardQuery = (
  options?: UseQueryOptions<UserDashboardRes, ApiError>
) => {
  return useQuery<UserDashboardRes, ApiError>({
    queryKey: queryKeys.getDashboard,
    queryFn: () => ProfileService.dashboard(),
    ...options,
  });
};

export const useUpdatePassword = (
  options?: UseMutationOptions<UpdatePasswordRes, ApiError, UpdatePasswordReq>
) => {
  return useMutation<UpdatePasswordRes, ApiError, UpdatePasswordReq>({
    mutationKey: queryKeys.updatePassword,
    mutationFn: async (params: UpdatePasswordReq) => {
      return await ProfileService.updatePassword({ params });
    },
    ...options,
  });
};

export const useUpdateAddress = (
  type: AddressType,
  options?: UseMutationOptions<UpdateAddressRes, ApiError, UpdateAddressReq>
) => {
  return useMutation<UpdateAddressRes, ApiError, UpdateAddressReq>({
    mutationKey: queryKeys.updateAddress(type),
    mutationFn: async (params: UpdateAddressReq) => {
      return await ProfileService.updateAddress({ params, type });
    },
    ...options,
  });
};
