import { Injectable } from '@nestjs/common';

import { countries } from 'src/common/constants/countries';

@Injectable()
export class OpenService {
  getCountries() {
    return countries;
  }
}
