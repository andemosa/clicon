import { Api } from "@/utils/api";

import type {
  ApiError,
  CreateProductReq,
  CreateProductRes,
  GetProductsParams,
  GetProductsRes,
  GetProductRes,
  UpdateProductReq,
} from "@/types";

export class ProductService {
  static async createProduct({
    params,
  }: {
    params: CreateProductReq;
  }): Promise<CreateProductRes> {
    try {
      const res = await Api.postReqWithFormdata<
        CreateProductRes,
        CreateProductReq
      >(`/products`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async products(
    params?: GetProductsParams
  ): Promise<GetProductsRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<GetProductsRes>(
        `/products?${searchParams}`
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async productDetails({
    slug,
    params,
  }: {
    slug: string;
    params?: GetProductsParams;
  }): Promise<GetProductRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<GetProductRes>(
        `/products/slug/${slug}?${searchParams}`
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async updateProduct({
    params,
    id,
  }: {
    id: string;
    params: UpdateProductReq;
  }): Promise<CreateProductRes> {
    try {
      const res = await Api.patchReqWithFormdata<
        CreateProductRes,
        UpdateProductReq
      >(`/products/${id}`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async deleteProduct({
    id,
  }: {
    id: string;
  }): Promise<CreateProductRes> {
    try {
      const res = await Api.deleteReq<CreateProductRes>(
        `/products/${id}`
      );
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
