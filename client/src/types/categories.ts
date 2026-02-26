type BaseCategory = {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
};

type Category = BaseCategory & {
  id: string;
  productCount: number;
  image?: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
};

type CreateCategoryReq = BaseCategory & {
  image?: File | null;
};

type CategoryRes = {
  message: string;
};

type CreateCategoryRes = CategoryRes;
type GetCategoriesRes = {
  categories: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

type GetCategoryRes = Category;

type UpdateCategoryReq = Partial<CreateCategoryReq> & {
  deleteImage?: boolean
}

type GetCategoriesParams = {
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
  order?: string;
  isActive?: boolean;
  includeChildren?: boolean;
  includeProducts?: boolean;
  excludeId?: string
}

export type {
  CreateCategoryReq,
  CreateCategoryRes,
  UpdateCategoryReq,
  GetCategoriesRes,
  GetCategoryRes,
  GetCategoriesParams,
  Category,
};
