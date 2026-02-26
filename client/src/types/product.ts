type BaseProduct = {
  name: string;
  slug?: string;
  description?: string;
  isActive: boolean;
  price: number;
  stock: number;
  discountType?: string;
  discountValue?: number;
};

type CategoryResponse = {
  id: string;
  name: string;
  slug: string;
};

type TagResponse = {
  id: string;
  name: string;
};

type Product = BaseProduct & {
  id: string;
  image?: string | null;
  tags?: TagResponse[] | null;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
};

type CreateProductReq = BaseProduct & {
  categoryId?: string;
  image?: File | null;
  tagIds?: string[] | null;
};

type ProductRes = {
  message: string;
};

type CreateProductRes = ProductRes;
type GetProductsRes = {
  products: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

type GetProductRes = Product;

type UpdateProductReq = BaseProduct & {
  categoryId?: string;
  image?: File | null;
  tagIds?: string[] | null;
};

type GetProductsParams = {
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
  isActive?: boolean;
  categorySlug?: string;
  tagName?: string;
};

export type {
  CreateProductReq,
  CreateProductRes,
  UpdateProductReq,
  GetProductsRes,
  GetProductRes,
  GetProductsParams,
  Product,
};
