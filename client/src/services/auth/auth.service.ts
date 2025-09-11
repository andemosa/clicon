import { Api } from "@/utils/api";

import type {
  ApiError,
  ProfileRes,
  SigninReq,
  SigninRes,
  SignupReq,
  SignupRes,
} from "@/types";

export class AuthService {
  static async signup({ params }: { params: SignupReq }): Promise<SignupRes> {
    try {
      const res = await Api.postReq<SignupRes, SignupReq>(
        `/auth/signup`,
        params
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async signin({ params }: { params: SigninReq }): Promise<SigninRes> {
    try {
      const res = await Api.postReq<SigninRes, SigninReq>(
        `/auth/signin`,
        params
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async signout(): Promise<SigninRes> {
    try {
      const res = await Api.postReq<SigninRes>(`/auth/signout`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async profile(): Promise<ProfileRes> {
    try {
      const res = await Api.getReq<ProfileRes>(`/auth/profile`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
