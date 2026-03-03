import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { queryKeys } from "../queryKeys";
import { ProductService } from "./product.service";

import type {
  CreateProductRes,
  ApiError,
  CreateProductReq,
  GetProductsRes,
  GetProductRes,
  UpdateProductReq,
  GetProductsParams,
  HomePageRes,
  Category,
  Tag,
} from "@/types";

export const useCreateProduct = (
  options?: UseMutationOptions<CreateProductRes, ApiError, CreateProductReq>,
) => {
  return useMutation<CreateProductRes, ApiError, CreateProductReq>({
    mutationKey: queryKeys.createProduct,
    mutationFn: async (params: CreateProductReq) => {
      return await ProductService.createProduct({ params });
    },
    ...options,
  });
};

export const useProductsQuery = (
  params?: GetProductsParams,
  options?: UseQueryOptions<GetProductsRes, ApiError>,
) => {
  return useQuery<GetProductsRes, ApiError>({
    queryKey: [...queryKeys.getProducts, params],
    queryFn: () => ProductService.products(params),
    ...options,
  });
};

export const useProductQuery = (
  slug: string,
  params?: GetProductsParams,
  options?: UseQueryOptions<GetProductRes, ApiError>,
) => {
  return useQuery<GetProductRes, ApiError>({
    queryKey: queryKeys.getProduct(slug, params),
    queryFn: () =>
      ProductService.productDetails({
        params,
        slug,
      }),
    ...options,
  });
};

export const useUpdateProduct = (
  id: string,
  options?: UseMutationOptions<CreateProductRes, ApiError, UpdateProductReq>,
) => {
  return useMutation<CreateProductRes, ApiError, UpdateProductReq>({
    mutationKey: queryKeys.updateProduct(id),
    mutationFn: async (params: UpdateProductReq) => {
      return await ProductService.updateProduct({ params, id });
    },
    ...options,
  });
};

export const useDeleteProduct = (
  id: string,
  options?: UseMutationOptions<CreateProductRes, ApiError>,
) => {
  return useMutation<CreateProductRes, ApiError>({
    mutationKey: queryKeys.deleteProduct(id),
    mutationFn: async () => {
      return await ProductService.deleteProduct({ id });
    },
    ...options,
  });
};

export const useHomePageQuery = (
  options?: UseQueryOptions<HomePageRes, ApiError>,
) => {
  return useQuery<HomePageRes, ApiError>({
    queryKey: queryKeys.getHomepageProducts,
    queryFn: () => ProductService.getHomePage(),
    ...options,
  });
};

export const useFooterTopQuery = (
  options?: UseQueryOptions<
    {
      categories: Category[];
      tags: Tag[];
    },
    ApiError
  >,
) => {
  return useQuery<
    {
      categories: Category[];
      tags: Tag[];
    },
    ApiError
  >({
    queryKey: queryKeys.getFooterTop,
    queryFn: () => ProductService.getFooterTop(),
    ...options,
  });
};
