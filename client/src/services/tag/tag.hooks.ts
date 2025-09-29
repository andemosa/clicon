import {
  type UseMutationOptions,
  useMutation,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { queryKeys } from "../queryKeys";
import { TagService } from "./tag.service";

import type { TagRes, ApiError, TagReq, GetTagsParams, GetTagsRes } from "@/types";

export const useCreateTag = (
  options?: UseMutationOptions<TagRes, ApiError, TagReq>
) => {
  return useMutation<TagRes, ApiError, TagReq>({
    mutationKey: queryKeys.createTag,
    mutationFn: async (params: TagReq) => {
      return await TagService.create({ params });
    },
    ...options,
  });
};

export const useTagsQuery = (
  params?: GetTagsParams,
  options?: UseQueryOptions<GetTagsRes, ApiError>
) => {
  return useQuery<GetTagsRes, ApiError>({
    queryKey: [...queryKeys.getTags, params],
    queryFn: () => TagService.tags(params),
    ...options,
  });
};

export const useUpdateTag = (
  id: string,
  options?: UseMutationOptions<TagRes, ApiError, TagReq>
) => {
  return useMutation<TagRes, ApiError, TagReq>({
    mutationKey: queryKeys.updateTag(id),
    mutationFn: async (params: TagReq) => {
      return await TagService.update({ params, id });
    },
    ...options,
  });
};

export const useDeleteTag = (
  id: string,
  options?: UseMutationOptions<TagRes, ApiError>
) => {
  return useMutation<TagRes, ApiError>({
    mutationKey: queryKeys.deleteTag(id),
    mutationFn: async () => {
      return await TagService.deleteTag({ id });
    },
    ...options,
  });
};