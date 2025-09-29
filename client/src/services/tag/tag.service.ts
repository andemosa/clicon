import { Api } from "@/utils/api";

import type {
  ApiError,
  TagReq,
  TagRes,
  GetTagsParams,
  GetTagsRes,
} from "@/types";

export class TagService {
  static async create({ params }: { params: TagReq }): Promise<TagRes> {
    try {
      const res = await Api.postReq<TagRes, TagReq>(`/tags`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async tags(params?: GetTagsParams): Promise<GetTagsRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<GetTagsRes>(`/tags?${searchParams}`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async tagDetails({
    id,
    params,
  }: {
    id: string;
    params?: GetTagsParams;
  }): Promise<TagRes> {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    try {
      const res = await Api.getReq<TagRes>(`/tags/${id}?${searchParams}`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async update({
    params,
    id,
  }: {
    id: string;
    params: TagReq;
  }): Promise<TagRes> {
    try {
      const res = await Api.patchReq<TagRes, TagReq>(`/tags/${id}`, params);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }

  static async deleteTag({ id }: { id: string }): Promise<TagRes> {
    try {
      const res = await Api.deleteReq<TagRes>(`/tags/${id}`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
