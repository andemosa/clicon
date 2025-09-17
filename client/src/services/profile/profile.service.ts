import { Api } from "@/utils/api";

import type {
  AddressType,
  ApiError,
  UpdateAddressReq,
  UpdateAddressRes,
  UpdatePasswordReq,
  UpdatePasswordRes,
  UpdateProfileReq,
  UpdateProfileRes,
  UserDashboardRes,
  UserProfileRes,
} from "@/types";

export class ProfileService {
  static async updateProfile({
    params,
  }: {
    params: UpdateProfileReq;
  }): Promise<UpdateProfileRes> {
    try {
      const res = await Api.patchReqWithFormdata<
        UpdateProfileRes,
        UpdateProfileReq
      >(`/users/profile`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async profile(): Promise<UserProfileRes> {
    try {
      const res = await Api.getReq<UserProfileRes>(`/users/profile`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async dashboard(): Promise<UserDashboardRes> {
    try {
      const res = await Api.getReq<UserDashboardRes>(`/users/dashboard`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async updatePassword({
    params,
  }: {
    params: UpdatePasswordReq;
  }): Promise<UpdatePasswordRes> {
    try {
      const res = await Api.postReq<UpdatePasswordRes, UpdatePasswordReq>(
        `/users/change-password`,
        params
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async updateAddress({
    params,
    type,
  }: {
    params: UpdateAddressReq;
    type: AddressType;
  }): Promise<UpdateAddressRes> {
    try {
      const res = await Api.postReq<UpdateAddressRes, UpdateAddressReq>(
        `/users/addresses/${type}`,
        params
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
