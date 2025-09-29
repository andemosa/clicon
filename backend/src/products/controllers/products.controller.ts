import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';

import { CreateProductDto } from '../dto/products/create-product.dto';
import { GetProductsDto } from '../dto/products/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.svc.createProduct(dto);
  }

  @Get()
  async list(@Query() q: GetProductsDto) {
    return this.svc.listProducts(q);
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.svc.getProductById(id);
  }

  // admin endpoints for tags/attributes could be added (createTag/createAttribute etc.)
}
