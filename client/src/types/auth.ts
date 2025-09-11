type AuthReq = {
  email: string;
  password: string;
};

type AuthRes = {
  message: string;
};

type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

type SignupReq = AuthReq & {
  firstName?: string;
  lastName?: string;
};

type SigninReq = AuthReq;

type SignupRes = AuthRes;
type SigninRes = AuthRes;
type ProfileRes = User;

export type { SignupReq, SigninReq, SignupRes, SigninRes, ProfileRes };
