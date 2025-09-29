import type { AddressType, GetCategoriesParams } from "@/types";

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
  updateAddress: (type: AddressType) => ["updateAddress", type],

  createCategory: ["createCategory"],
  getCategories: ["getCategories"],
  getCategory: (slug: string, params?: GetCategoriesParams) => ["getCategory", slug, params],
  updateCategory: (slug: string) => ["updateCategory", slug],
  deleteCategory: (slug: string) => ["deleteCategory", slug],

  createTag: ["createTag"],
  getTags: ["getTags"],
  updateTag: (id: string) => ["updateTag", id],
  deleteTag: (id: string) => ["deleteTag", id],
};
