import { Controller, Get } from '@nestjs/common';

import { OpenService } from './open.service';

@Controller('open')
export class OpenController {
  constructor(private readonly openService: OpenService) {}

  @Get('countries')
  getCountries() {
    return this.openService.getCountries();
  }
}
