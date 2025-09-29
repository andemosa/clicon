// src/categories/categories.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource, Not } from 'typeorm';

import { CreateCategoryDto } from '../dto/categories/create-category.dto';
import { GetCategoriesDto } from '../dto/categories/get-categories.dto';
import { UpdateCategoryDto } from '../dto/categories/update-category.dto';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { Category } from '../entities/category.entity';
import { cloudinaryFolders } from 'src/cloudinary/cloudinary.constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private async generateUniqueSlug(
    name: string,
    existingSlug?: string,
  ): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (!existingSlug || existingSlug === baseSlug) {
      let slug = baseSlug;
      let counter = 1;

      while (true) {
        const existing = await this.categoryRepo.findOne({ where: { slug } });
        if (!existing || existing.slug === existingSlug) {
          break;
        }
        slug = `${baseSlug}-${counter++}`;
      }
      return slug;
    }

    return existingSlug;
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<Category> {
    return this.dataSource.transaction(async (manager) => {
      const { parentId, ...categoryData } = createCategoryDto;

      // Check if parent exists
      let parent;
      if (parentId) {
        parent = await manager.findOne(Category, { where: { id: parentId } });
        if (!parent) {
          throw new NotFoundException('Parent category not found');
        }
      }

      // Generate slug if not provided
      const slug = createCategoryDto.slug
        ? await this.generateUniqueSlug(
            createCategoryDto.name,
            createCategoryDto.slug,
          )
        : await this.generateUniqueSlug(createCategoryDto.name);

      // Check for duplicate name in the same level
      const existingCategory = await manager.findOne(Category, {
        where: {
          name: categoryData.name,
          parent: parent ? { id: parentId } : undefined,
        },
      });

      if (existingCategory) {
        throw new ConflictException(
          `Category with name "${categoryData.name}" already exists in this level`,
        );
      }

      let image, imageId;

      if (file) {
        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          cloudinaryFolders.categories,
        );
        image = uploaded['secure_url'];
        imageId = uploaded['public_id'];
      }

      const category = manager.create(Category, {
        ...categoryData,
        slug,
        parent: parent ? { id: parentId } : undefined,
        ...(image && { image: image }),
        ...(imageId && { imageId: imageId }),
      });

      return await manager.save(Category, category);
    });
  }

  async findAll(query: GetCategoriesDto): Promise<{
    categories: Category[];
    meta: { total: number; page: number; limit: number };
  }> {
    const {
      search,
      isActive,
      parentId,
      excludeId,
      includeChildren = false,
      includeProducts = false,
    } = query;
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, query.limit || 20);

    const qb = this.categoryRepo.createQueryBuilder('category');

    // Add relations
    if (includeChildren) {
      qb.leftJoinAndSelect('category.children', 'children');
    }
    if (includeProducts) {
      qb.leftJoinAndSelect('category.products', 'products');
    }

    // Apply filters
    if (excludeId) {
      const toExclude: string[] = [excludeId];

      // fetch children recursively
      const stack = [excludeId];
      while (stack.length) {
        const currentId = stack.pop()!;
        const children = await this.categoryRepo.find({
          where: { parentId: currentId },
          select: ['id'],
        });
        for (const child of children) {
          if (!toExclude.includes(child.id)) {
            toExclude.push(child.id);
            stack.push(child.id);
          }
        }
      }

      qb.andWhere('category.id NOT IN (:...excludeIds)', {
        excludeIds: toExclude,
      });
    }

    if (search) {
      qb.andWhere(
        '(category.name ILIKE :search OR category.description ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (isActive !== undefined) {
      qb.andWhere('category.isActive = :isActive', { isActive });
    }

    if (parentId) {
      qb.andWhere('category.parentId = :parentId', { parentId });
    }

    // Order by name
    qb.orderBy('category.name', 'ASC');
    // Sorting
    if (query.sort === 'asc') qb.orderBy('category.name', 'ASC');
    else if (query.sort === 'desc') qb.orderBy('category.name', 'DESC');
    else if (query.sort === 'oldest') qb.orderBy('category.createdAt', 'ASC');
    else qb.orderBy('category.createdAt', 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [categories, total] = await qb.getManyAndCount();

    return {
      categories,
      meta: { total, page, limit },
    };
  }

  async findOne(
    id: string,
    options?: { includeChildren?: boolean; includeProducts?: boolean },
  ): Promise<Category> {
    const { includeChildren = false, includeProducts = false } = options || {};

    const qb = this.categoryRepo
      .createQueryBuilder('category')
      .where('category.id = :id', { id });

    if (includeChildren) {
      qb.leftJoinAndSelect('category.children', 'children');
    }
    if (includeProducts) {
      qb.leftJoinAndSelect('category.products', 'products');
    }

    const category = await qb.getOne();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findBySlug(
    slug: string,
    options?: { includeChildren?: boolean; includeProducts?: boolean },
  ): Promise<Category> {
    const { includeChildren = false, includeProducts = false } = options || {};

    const qb = this.categoryRepo
      .createQueryBuilder('category')
      .where('category.slug = :slug', { slug })
      .andWhere('category.isActive = true');

    if (includeChildren) {
      qb.leftJoinAndSelect('category.children', 'children');
    }
    if (includeProducts) {
      qb.leftJoinAndSelect('category.products', 'products');
    }

    const category = await qb.getOne();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateBySlug(
    slug: string,
    updateCategoryDto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<Category> {
    return this.dataSource.transaction(async (manager) => {
      const category = await manager.findOne(Category, {
        where: { slug },
        relations: ['parent'],
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      // Check if moving to a new parent
      if (updateCategoryDto.parentId !== undefined) {
        if (updateCategoryDto.parentId === category.id) {
          throw new BadRequestException('Category cannot be its own parent');
        }

        if (updateCategoryDto.parentId) {
          const parent = await manager.findOne(Category, {
            where: { id: updateCategoryDto.parentId },
          });
          if (!parent) {
            throw new NotFoundException('Parent category not found');
          }

          // Check for circular reference
          let currentParent = parent;

          while (currentParent.parentId) {
            if (currentParent.parentId === category.id) {
              throw new BadRequestException(
                'Circular reference detected in category hierarchy',
              );
            }

            const nextParent = await manager.findOne(Category, {
              where: { id: currentParent.parentId },
            });

            if (!nextParent) break; // stop if no more parents in chain
            currentParent = nextParent;
          }
        }
      }

      // Check for duplicate name in the same level
      if (updateCategoryDto.name) {
        const parentId =
          updateCategoryDto.parentId !== undefined
            ? updateCategoryDto.parentId
            : category.parentId;

        const existingCategory = await manager.findOne(Category, {
          where: {
            name: updateCategoryDto.name,
            parent: parentId ? { id: parentId } : undefined,
            id: Not(category.id),
          },
        });

        if (existingCategory) {
          throw new ConflictException(
            `Category with name "${updateCategoryDto.name}" already exists in this level`,
          );
        }
      }

      // Generate new slug if name changed
      if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
        updateCategoryDto.slug = await this.generateUniqueSlug(
          updateCategoryDto.name,
          updateCategoryDto.slug,
        );
      }

      let image = category.image;
      let imageId = category.imageId;

      if (file) {
        if (imageId) {
          await this.cloudinaryService.deleteImage(imageId);
        }

        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          cloudinaryFolders.categories,
        );
        image = uploaded['secure_url'];
        imageId = uploaded['public_id'];
      }

      if (updateCategoryDto.deleteImage) {
        if (imageId) {
          await this.cloudinaryService.deleteImage(imageId);
        }
      }

      // Update category
      Object.assign(category, {
        ...updateCategoryDto,
        ...(image && { image: image }),
        ...(imageId && { imageId: imageId }),
        ...(updateCategoryDto.deleteImage && { image: "" }),
        ...(updateCategoryDto.deleteImage && { imageId: "" }),
      });

      if (updateCategoryDto.parentId !== undefined) {
        category.parent = updateCategoryDto.parentId
          ? ({ id: updateCategoryDto.parentId } as Category)
          : undefined;
      }

      return await manager.save(Category, category);
    });
  }

  async removeBySlug(slug: string): Promise<{ message: string }> {
    return this.dataSource.transaction(async (manager) => {
      const category = await manager.findOne(Category, {
        where: { slug },
        relations: ['children', 'products'],
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      // Check if category has children
      if (category.children && category.children.length > 0) {
        throw new ConflictException(
          'Cannot delete category that has subcategories. Please delete subcategories first.',
        );
      }

      // Check if category has products
      if (category.products && category.products.length > 0) {
        throw new ConflictException(
          `Cannot delete category that has ${category.products.length} products assigned. Please reassign products first.`,
        );
      }

      await manager.remove(Category, category);

      return { message: 'Category deleted successfully' };
    });
  }

  async getCategoryTree(): Promise<Category[]> {
    const categories = await this.categoryRepo.find({
      relations: ['children', 'parent'],
      where: { isActive: true },
      order: { name: 'ASC' },
    });

    // Build tree structure
    const buildTree = (parentId: string | null): Category[] => {
      return categories
        .filter((category) => category.parentId === parentId)
        .map((category) => ({
          ...category,
          children: buildTree(category.id),
        }));
    };

    return buildTree(null);
  }

  async getCategoryPath(id: string): Promise<Category[]> {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const path: Category[] = [category];
    let current = category;

    while (current.parentId) {
      const parent = await this.categoryRepo.findOne({
        where: { id: current.parentId },
      });
      if (parent) {
        path.unshift(parent);
        current = parent;
      } else {
        break;
      }
    }

    return path;
  }

  async bulkUpdateStatus(
    ids: string[],
    isActive: boolean,
  ): Promise<{ updated: number }> {
    const result = await this.categoryRepo.update(
      { id: In(ids) },
      { isActive },
    );

    return { updated: result.affected || 0 };
  }
}
