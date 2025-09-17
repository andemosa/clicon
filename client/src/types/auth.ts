type AuthReq = {
  email: string;
  password: string;
};

type AuthRes = {
  message: string;
};

type SignupReq = AuthReq & {
  firstName?: string;
  lastName?: string;
};

type SigninReq = AuthReq;

type SignupRes = AuthRes;
type SigninRes = AuthRes;

export type { SignupReq, SigninReq, SignupRes, SigninRes };
