// src/categories/categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateCategoryDto } from '../dto/categories/create-category.dto';
import { GetCategoriesDto } from '../dto/categories/get-categories.dto';
import { UpdateCategoryDto } from '../dto/categories/update-category.dto';

import { CategoriesService } from '../services/categories.service';

import { FileSizeValidationPipe } from 'src/common/pipes/file-size.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // "image" is the field name from the frontend form
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(new FileSizeValidationPipe()) file?: Express.Multer.File,
  ) {
    return this.categoriesService.create(createCategoryDto, file);
  }

  @Get()
  findAll(@Query() query: GetCategoriesDto) {
    return this.categoriesService.findAll(query);
  }

  @Get('tree')
  getTree() {
    return this.categoriesService.getCategoryTree();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('includeChildren') includeChildren?: boolean,
    @Query('includeProducts') includeProducts?: boolean,
  ) {
    return this.categoriesService.findOne(id, {
      includeChildren: includeChildren,
      includeProducts: includeProducts,
    });
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('includeChildren') includeChildren?: boolean,
    @Query('includeProducts') includeProducts?: boolean,
  ) {
    return this.categoriesService.findBySlug(slug, {
      includeChildren: includeChildren,
      includeProducts: includeProducts,
    });
  }

  @Get(':id/path')
  getPath(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.getCategoryPath(id);
  }

  @Patch('slug/:slug')
  @UseInterceptors(FileInterceptor('image')) // "image" is the field name from the frontend form
  updateBySlug(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(new FileSizeValidationPipe()) file?: Express.Multer.File,
  ) {
    return this.categoriesService.updateBySlug(slug, updateCategoryDto, file);
  }

  @Patch('bulk/status')
  bulkUpdateStatus(@Body() body: { ids: string[]; isActive: boolean }) {
    return this.categoriesService.bulkUpdateStatus(body.ids, body.isActive);
  }

  @Delete('slug/:slug')
  removeBySlug(@Param('slug') slug: string) {
    return this.categoriesService.removeBySlug(slug);
  }
}
