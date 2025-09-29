import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, EntityManager } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { Tag } from '../entities/tag.entity';
import { Attribute } from '../entities/attribute.entity';
import { AttributeValue } from '../entities/attribute-value.entity';
import { VariantAttribute } from '../entities/variant-attribute.entity';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductDto } from '../dto/products/create-product.dto';
import { GetProductsDto } from '../dto/products/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductVariant)
    private variantRepo: Repository<ProductVariant>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
    @InjectRepository(Attribute) private attributeRepo: Repository<Attribute>,
    @InjectRepository(AttributeValue)
    private attrValueRepo: Repository<AttributeValue>,
    @InjectRepository(VariantAttribute)
    private variantAttrRepo: Repository<VariantAttribute>,
    @InjectRepository(ProductImage)
    private productImageRepo: Repository<ProductImage>,
  ) {}

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

  /**
   * Create product + variants in a transaction.
   * - Ensures tag count <= 5
   * - Normalizes attributes (attributes & attribute_values)
   * - Ensures only one isDefault per product
   */
  async createProduct(dto: CreateProductDto) {
    if (dto.tagIds && dto.tagIds.length > 5)
      throw new BadRequestException('A product can have at most 5 tags');

    return this.dataSource.transaction(async (manager) => {
      // preload tags
      let tags: Tag[] = [];
      if (dto.tagIds && dto.tagIds.length) {
        tags = await manager.findBy(Tag, { id: In(dto.tagIds) });
        if (tags.length !== dto.tagIds.length)
          throw new BadRequestException('Some tags not found');
      }

      const product = manager.create(Product, {
        name: dto.name,
        description: dto.description,
        brand: dto.brand,
        slug: await this.generateUniqueSlug(manager, dto.name),
        metadata: dto.metadata,
        categories: dto.categoryIds?.map((id) => ({ id })) || [],
        tags,
      });
      const savedProduct = await manager.save(Product, product);

      let defaultAssigned = false;

      for (const v of dto.variants) {
        // ensure SKU uniqueness for the product globally
        const existing = await manager.findOne(ProductVariant, {
          where: { sku: v.sku },
        });
        if (existing)
          throw new ConflictException(`SKU ${v.sku} already exists`);

        const variant = manager.create(ProductVariant, {
          sku: v.sku,
          title: v.title,
          price: v.price,
          discountedPrice: v.discountedPrice,
          stock: v.stock,
          isDefault: !!v.isDefault,
          product: savedProduct,
        });

        // set default if flagged, or if none assigned yet and first variant
        if (v.isDefault) {
          defaultAssigned = true;
        } else if (!defaultAssigned && !v.isDefault) {
          // we'll handle default fallback after creation
        }

        const savedVariant = await manager.save(ProductVariant, variant);

        // attributes normalization: attribute -> attribute_value (create if not exists) -> variant_attribute
        for (const a of v.attributes || []) {
          // look up or create attribute
          let attr = await manager.findOne(Attribute, {
            where: { name: a.attributeName },
          });
          if (!attr) {
            attr = manager.create(Attribute, { name: a.attributeName });
            attr = await manager.save(Attribute, attr);
          }
          // look up or create attribute value
          let av = await manager.findOne(AttributeValue, {
            where: { attribute: { id: attr.id }, value: a.attributeValue },
            relations: ['attribute'],
          });
          if (!av) {
            av = manager.create(AttributeValue, {
              attribute: attr,
              value: a.attributeValue,
            });
            av = await manager.save(AttributeValue, av);
          }
          // create variant_attribute
          const va = manager.create(VariantAttribute, {
            variant: savedVariant,
            attributeValue: av,
          });
          await manager.save(VariantAttribute, va);
        }

        // images
        for (const img of v.images || []) {
          const imgEntity = manager.create(ProductImage, {
            variant: savedVariant,
            url: img.url,
            altText: img.altText,
            isPrimary: !!img.isPrimary,
            sortOrder: img.sortOrder || 0,
          });
          await manager.save(ProductImage, imgEntity);
          if (img.isPrimary) {
            savedVariant.primaryImageId = imgEntity.id;
            await manager.save(ProductVariant, savedVariant);
          }
        }
      }

      // If no variant has isDefault true, set the first saved variant as default
      const variantsForProduct = await manager.find(ProductVariant, {
        where: { product: { id: savedProduct.id } },
        order: { createdAt: 'ASC' },
      });
      if (
        !variantsForProduct.some((v) => v.isDefault) &&
        variantsForProduct.length
      ) {
        variantsForProduct[0].isDefault = true;
        await manager.save(ProductVariant, variantsForProduct[0]);
      } else {
        // ensure only one isDefault (if multiple flagged true, keep the first)
        const defaults = variantsForProduct.filter((v) => v.isDefault);
        if (defaults.length > 1) {
          for (let i = 1; i < defaults.length; i++) {
            defaults[i].isDefault = false;
            await manager.save(ProductVariant, defaults[i]);
          }
        }
      }

      // return product with relations
      return manager.findOne(Product, {
        where: { id: savedProduct.id },
        relations: [
          'variants',
          'variants.attributes',
          'variants.attributes.attributeValue',
          'variants.images',
          'tags',
          'categories',
        ],
      });
    });
  }

  /**
   * List products with flexible filters:
   * - tagIds (product-level)
   * - brand
   * - attribute filters: [{ attributeName, value }]
   * - price range (minPrice, maxPrice) applies to variants
   */
  async listProducts(query: GetProductsDto) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, query.limit || 20);

    // We'll build a query that finds products with at least one matching variant
    const qb = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.variants', 'v')
      .leftJoinAndSelect('p.tags', 't')
      .leftJoinAndSelect('p.categories', 'c')
      .where('p.isActive = true');

    if (query.brand)
      qb.andWhere('p.brand ILIKE :brand', { brand: `%${query.brand}%` });
    if (query.tagIds && query.tagIds.length)
      qb.andWhere('t.id IN (:...tagIds)', { tagIds: query.tagIds });
    if (query.categoryId)
      qb.andWhere('c.id = :categoryId', { categoryId: query.categoryId });
    if (query.q)
      qb.andWhere('(p.name ILIKE :q OR p.description ILIKE :q)', {
        q: `%${query.q}%`,
      });

    // Price filters operate on variants; ensure to only include products that have variants in range
    if (query.minPrice)
      qb.andWhere('(v.price >= :minPrice OR v.discountedPrice >= :minPrice)', {
        minPrice: query.minPrice,
      });
    if (query.maxPrice)
      qb.andWhere('(v.price <= :maxPrice OR v.discountedPrice <= :maxPrice)', {
        maxPrice: query.maxPrice,
      });


    // Sorting
    if (query.sort === 'price_asc')
      qb.orderBy('COALESCE(v.discountedPrice, v.price)', 'ASC');
    else if (query.sort === 'price_desc')
      qb.orderBy('COALESCE(v.discountedPrice, v.price)', 'DESC');
    else if (query.sort === 'oldest') qb.orderBy('', 'ASC');
    else qb.orderBy('p.createdAt', 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    // We want product-level aggregated min/max price — use getMany + compute min/max in JS or extend query with subselects
    const [items, total] = await qb.getManyAndCount();

    const productsWithPriceRange = items.map((p) => {
      const prices = p.variants?.map((v) => v.discountedPrice ?? v.price) || [];
      const minPrice = prices.length ? Math.min(...prices) : null;
      const maxPrice = prices.length ? Math.max(...prices) : null;
      const defaultVariant =
        p.variants?.find((v) => v.isDefault) ?? p.variants?.[0] ?? null;
      return {
        ...p,
        minPrice,
        maxPrice,
        defaultVariant,
        hasMatchingVariant: p.variants && p.variants.length > 0,
      };
    });

    return { data: productsWithPriceRange, meta: { total, page, limit } };
  }

  // more methods: getProductById, updateProduct, deleteProduct, createTag/attribute, get attributes for filters etc.
  async getProductById(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: [
        'variants',
        'variants.attributes',
        'variants.attributes.attributeValue',
        'variants.images',
        'tags',
        'categories',
      ],
    });
    if (!product) throw new NotFoundException('Product not found');
    const prices =
      product.variants?.map((v) => v.discountedPrice ?? v.price) || [];
    return {
      ...product,
      minPrice: prices.length ? Math.min(...prices) : null,
      maxPrice: prices.length ? Math.max(...prices) : null,
      defaultVariant:
        product.variants?.find((v) => v.isDefault) ??
        product.variants?.[0] ??
        null,
    };
  }
}
