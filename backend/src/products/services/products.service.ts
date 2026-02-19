import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';

import { cloudinaryFolders } from 'src/cloudinary/cloudinary.constants';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { CreateProductDto } from '../dto/products/create-product.dto';
import {
  GetProductsDto,
  ProductSortBy,
  SortOrder,
} from '../dto/products/get-products.dto';
import { ProductResponseDto } from '../dto/products/product-response.dto';
import { UpdateProductDto } from '../dto/products/update-product.dto';

import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /* =====================
     Create Product
  ====================== */

  async create(
    dto: CreateProductDto,
    file?: Express.Multer.File,
  ): Promise<ProductResponseDto> {
    return this.dataSource.transaction(async (manager) => {
      this.validateDiscount(dto);

      // 1. Category (single)
      let category: Category | null = null;
      if (dto.categoryId) {
        category = await manager.findOne(Category, {
          where: { id: dto.categoryId },
        });
        if (!category) {
          throw new BadRequestException('Category not found');
        }
      }

      // 2. Slug
      const slug = await this.generateUniqueSlug(manager, dto.name);

      let image, imageId;

      if (file) {
        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          cloudinaryFolders.products,
        );
        image = uploaded['secure_url'];
        imageId = uploaded['public_id'];
      }

      // 3. Create product FIRST
      const product = manager.create(Product, {
        ...dto,
        slug,
        category: category!,
        ...(image && { image: image }),
        ...(imageId && { imageId: imageId }),
      });

      await manager.save(Product, product);

      // 5. Tags
      if (dto.tagIds?.length) {
        product.tags = await this.getTags(manager, dto.tagIds);
      }

      const createdProd = await manager.save(Product, product);
      return this.mapProduct(createdProd);
    });
  }

  /* =====================
     Update Product
  ====================== */

  async update(
    id: string,
    dto: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<ProductResponseDto> {
    return this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(Product, {
        where: { id },
        relations: ['category', 'tags',],
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      this.validateDiscount(dto);

      // Regenerate slug if name changes
      if (dto.name && dto.name !== product.name) {
        product.slug = await this.generateUniqueSlug(manager, dto.name);
      }

      // Category update
      if (dto.categoryId) {
        const category = await manager.findOne(Category, {
          where: { id: dto.categoryId },
        });
        if (!category) throw new BadRequestException('Category not found');
        product.category = category;
      }

      let image = product.image;
      let imageId = product.imageId;

      if (file) {
        if (imageId) {
          await this.cloudinaryService.deleteImage(imageId);
        }

        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          cloudinaryFolders.products,
        );
        image = uploaded['secure_url'];
        imageId = uploaded['public_id'];
      }

      // Tags update
      if (dto.tagIds) {
        product.tags = await this.getTags(manager, dto.tagIds);
      }

      Object.assign(product, {
        ...dto,
        ...(image && { image: image }),
        ...(imageId && { imageId: imageId }),
      });

      const updatedProd = await manager.save(Product, product);
      return this.mapProduct(updatedProd);
    });
  }

  /* =====================
     Find One
  ====================== */

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'tags', ],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.mapProduct(product);
  }

  async findBySlug(slug: string): Promise<ProductResponseDto> {
    const product = await this.productRepo.findOne({
      where: { slug },
      relations: ['category', 'tags',],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.mapProduct(product);
  }

  /* =====================
     List Products
  ====================== */

  async findAll(query: GetProductsDto) {
    const {
      search,
      brand,
      categoryId,
      tagIds,
      minPrice,
      maxPrice,
      sortBy = ProductSortBy.CREATED_AT,
      sortOrder = SortOrder.DESC,
      page = 1,
      limit = 20,
    } = query;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.tags', 'tag')
      .where('product.isActive = true');

    /* =====================
     Search
  ====================== */

    if (search) {
      qb.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    /* =====================
     Filters
  ====================== */

    if (brand) {
      qb.andWhere('product.brand = :brand', { brand });
    }

    if (categoryId) {
      qb.andWhere('category.id = :categoryId', { categoryId });
    }

    if (tagIds?.length) {
      qb.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    /* =====================
     Sorting (Safe)
  ====================== */

    const SORT_COLUMN_MAP: Record<ProductSortBy, string> = {
      [ProductSortBy.CREATED_AT]: 'product.createdAt',
      [ProductSortBy.PRICE]: 'product.price',
      [ProductSortBy.RATING]: 'product.averageRating',
      [ProductSortBy.SALES]: 'product.salesCount',
    };

    qb.orderBy(SORT_COLUMN_MAP[sortBy], sortOrder);

    /* =====================
     Pagination
  ====================== */

    qb.skip((page - 1) * limit).take(limit);

    const [products, total] = await qb.getManyAndCount();

    return {
      products: products.map((p) => this.mapProduct(p)),
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  /* =====================
     Delete Product
  ====================== */

  async remove(id: string): Promise<void> {
    const result = await this.productRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Product not found');
    }
  }

  /* =====================
     Helpers
  ====================== */

  private validateDiscount(dto: Partial<CreateProductDto>) {
    if (!dto.discountType && dto.discountValue) {
      throw new BadRequestException(
        'Discount type is required when discount value is provided',
      );
    }
  }

  private async getTags(
    manager: EntityManager,
    tagIds: string[],
  ): Promise<Tag[]> {
    const tags = await manager.find(Tag, {
      where: { id: In(tagIds) },
    });

    if (tags.length !== tagIds.length) {
      throw new BadRequestException('One or more tags not found');
    }

    // de-duplicate
    return [...new Map(tags.map((t) => [t.id, t])).values()];
  }

  private async generateUniqueSlug(
    manager: EntityManager,
    name: string,
  ): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await manager.findOne(Product, { where: { slug } });
      if (!existing) {
        break;
      }
      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }

  private mapProduct(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      isActive: product.isActive,
      price: Number(product.price),
      stock: product.stock,
      discountType: product.discountType,
      discountValue: product.discountValue
        ? Number(product.discountValue)
        : undefined,
      averageRating: product.averageRating,
      salesCount: product.salesCount,
      slug: product.slug,
      image: product.image,

      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
          }
        : null,

      tags:
        product.tags?.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })) ?? [],

      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
