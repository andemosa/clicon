import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { TagsController } from './controllers/tags.controller';

import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { TagsService } from './services/tags.service';

import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Tag, Category]),
    CloudinaryModule,
  ],
  providers: [ProductsService, CategoriesService, TagsService],
  controllers: [ProductsController, CategoriesController, TagsController],
  exports: [ProductsService],
})
export class ProductsModule {}
