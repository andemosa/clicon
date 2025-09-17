type BaseUser = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

type AddressType = "billing" | "shipping";

type Address = BaseUser & {
  companyName?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  countryCode: string;
  email?: string | null;
  type: AddressType;
};

type UserAddress = Address & {
  id: string;
  user: string;
};

type Res = {
  message: string;
};

type UpdateProfileReq = BaseUser & {
  avatar: File | null;
};

type UpdatePasswordReq = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UpdateAddressReq = Address;

type UserProfileRes = BaseUser & {
  id: number;
  email: string;
  avatar?: string;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  thirdPartyAuthProvider: string | null;
  addresses: UserAddress[];
  createdAt: string;
  updatedAt: string;
};
type UpdatePasswordRes = Res;
type UpdateProfileRes = Res;
type UpdateAddressRes = Res;

type UserDashboardRes = BaseUser & {
  avatar: string;
  email: string;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  orders: any[];
  billingAddress: Address
};

export type {
  AddressType,
  UpdateProfileReq,
  UpdateProfileRes,
  UserProfileRes,
  UpdatePasswordReq,
  UpdatePasswordRes,
  UpdateAddressReq,
  UpdateAddressRes,
  UserDashboardRes
};
