import { Api } from "@/utils/api";

import type {
  ApiError,
  Category,
  CreateCategoryReq,
  CreateCategoryRes,
  GetCategoriesParams,
  GetCategoriesRes,
  GetCategoryRes,
  UpdateCategoryReq,
} from "@/types";

export class CategoryService {
  static async createCategory({
    params,
  }: {
    params: CreateCategoryReq;
  }): Promise<CreateCategoryRes> {
    try {
      const res = await Api.postReqWithFormdata<
        CreateCategoryRes,
        CreateCategoryReq
      >(`/categories`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async categories(
    params?: GetCategoriesParams,
  ): Promise<GetCategoriesRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<GetCategoriesRes>(
        `/categories?${searchParams}`,
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async categoryDetails({
    slug,
    params,
  }: {
    slug: string;
    params?: GetCategoriesParams;
  }): Promise<GetCategoryRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<GetCategoryRes>(
        `/categories/slug/${slug}?${searchParams}`,
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async updateCategory({
    params,
    slug,
  }: {
    slug: string;
    params: UpdateCategoryReq;
  }): Promise<CreateCategoryRes> {
    try {
      const res = await Api.patchReqWithFormdata<
        CreateCategoryRes,
        UpdateCategoryReq
      >(`/categories/slug/${slug}`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async deleteCategory({
    slug,
  }: {
    slug: string;
  }): Promise<CreateCategoryRes> {
    try {
      const res = await Api.deleteReq<CreateCategoryRes>(
        `/categories/slug/${slug}`,
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async categoryTree(): Promise<Category[]> {
    try {
      const res = await Api.getReq<Category[]>(`/categories/tree`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async homepageCategories(): Promise<Category[]> {
    try {
      const res = await Api.getReq<Category[]>(
        `/categories/homepage/categories`,
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
