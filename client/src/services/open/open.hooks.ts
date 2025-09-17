import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import type { CountriesRes, ApiError } from "@/types";

import { queryKeys } from "../queryKeys";
import { OpenService } from "./open.service";

export const useCountriesQuery = (
  options?: UseQueryOptions<CountriesRes, ApiError>
) => {
  return useQuery<CountriesRes, ApiError>({
    queryKey: queryKeys.getCountries,
    queryFn: () => OpenService.countries(),
    ...options,
  });
};
