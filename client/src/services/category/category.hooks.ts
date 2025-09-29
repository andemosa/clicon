import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { queryKeys } from "../queryKeys";
import { CategoryService } from "./category.service";

import type {
  CreateCategoryRes,
  ApiError,
  CreateCategoryReq,
  GetCategoriesRes,
  GetCategoryRes,
  UpdateCategoryReq,
  GetCategoriesParams,
} from "@/types";

export const useCreateCategory = (
  options?: UseMutationOptions<CreateCategoryRes, ApiError, CreateCategoryReq>
) => {
  return useMutation<CreateCategoryRes, ApiError, CreateCategoryReq>({
    mutationKey: queryKeys.createCategory,
    mutationFn: async (params: CreateCategoryReq) => {
      return await CategoryService.createCategory({ params });
    },
    ...options,
  });
};

export const useCategoriesQuery = (
  params?: GetCategoriesParams,
  options?: UseQueryOptions<GetCategoriesRes, ApiError>
) => {
  return useQuery<GetCategoriesRes, ApiError>({
    queryKey: [...queryKeys.getCategories, params],
    queryFn: () => CategoryService.categories(params),
    ...options,
  });
};

export const useCategoryQuery = (
  slug: string,
  params?: GetCategoriesParams,
  options?: UseQueryOptions<GetCategoryRes, ApiError>
) => {
  return useQuery<GetCategoryRes, ApiError>({
    queryKey: queryKeys.getCategory(slug, params),
    queryFn: () =>
      CategoryService.categoryDetails({
        params,
        slug,
      }),
    ...options,
  });
};

export const useUpdateCategory = (
  slug: string,
  options?: UseMutationOptions<CreateCategoryRes, ApiError, UpdateCategoryReq>
) => {
  return useMutation<CreateCategoryRes, ApiError, UpdateCategoryReq>({
    mutationKey: queryKeys.updateCategory(slug),
    mutationFn: async (params: UpdateCategoryReq) => {
      return await CategoryService.updateCategory({ params, slug });
    },
    ...options,
  });
};

export const useDeleteCategory = (
  slug: string,
  options?: UseMutationOptions<CreateCategoryRes, ApiError>
) => {
  return useMutation<CreateCategoryRes, ApiError>({
    mutationKey: queryKeys.deleteCategory(slug),
    mutationFn: async () => {
      return await CategoryService.deleteCategory({ slug });
    },
    ...options,
  });
};
