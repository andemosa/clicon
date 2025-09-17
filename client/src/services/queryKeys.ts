import type { AddressType } from "@/types";

export const queryKeys = {
  getCities: (countryId: number, stateId: number) => [
    "cities",
    countryId,
    stateId,
  ],
  getCountries: ["getCountries"],

  signup: ["signup"],
  signin: ["signin"],

  getProfile: ["getProfile"],
  getDashboard: ["getDashboard"],
  updateProfile: ["updateProfile"],
  updatePassword: ["updatePassword"],
  updateAddress: (type: AddressType) => ["updateProfile", type],
};
