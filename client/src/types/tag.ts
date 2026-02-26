type BaseTag = {
  name: string;
};

type Tag = BaseTag & {
  id: string;
  productCount: number;
};

type TagReq = BaseTag;

type TagRes = Tag;

type GetTagsParams = {
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
  order?: string;
};

type GetTagsRes = {
  tags: Tag[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type { TagReq, TagRes, GetTagsParams, GetTagsRes, Tag };
