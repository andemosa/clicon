import { Api } from "@/utils/api";

import type { ApiError, CountriesRes,  } from "@/types";

export class OpenService {
  
  static async countries(): Promise<CountriesRes> {
    try {
      const res = await Api.getReq<CountriesRes>(`/open/countries`);
      return res.data;
    } catch (err) {
      throw err as ApiError;
    }
  }
}
