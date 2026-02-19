import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from '../dto/products/create-product.dto';
import { GetProductsDto } from '../dto/products/get-products.dto';
import { ProductResponseDto } from '../dto/products/product-response.dto';
import { UpdateProductDto } from '../dto/products/update-product.dto';

import { ProductsService } from '../services/products.service';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ): Promise<ProductResponseDto> {
    return this.svc.create(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ): Promise<ProductResponseDto> {
    return this.svc.update(id, dto, file);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    return this.svc.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @Get()
  async findAll(@Query() query: GetProductsDto) {
    return this.svc.findAll(query);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.svc.remove(id);
  }
}
