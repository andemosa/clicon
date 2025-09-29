import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { ListTagsDto } from '../dto/tags/list-tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  async createTag(name: string) {
    // Check if tag already exists
    const normalizedName = name.toLowerCase().trim();
    const existingTag = await this.tagRepo.findOne({
      where: { name: normalizedName },
    });

    if (existingTag) {
      return existingTag;
    }

    const tag = this.tagRepo.create({ name: normalizedName });
    return await this.tagRepo.save(tag);
  }

  async listTags(query: ListTagsDto) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, query.limit || 20);

    const qb = this.tagRepo.createQueryBuilder('t').leftJoin('t.products', 'p');

    // Search filter
    if (query.search) {
      qb.andWhere('t.name ILIKE :q', { q: `%${query.search}%` });
    }

    // Category filter
    if (query.categoryId) {
      qb.innerJoin('p.categories', 'c').andWhere('c.id = :catId', {
        catId: query.categoryId,
      });
    }

    // Sorting
    if (query.sort === 'asc') qb.orderBy('t.name', 'ASC');
    else if (query.sort === 'desc') qb.orderBy('t.name', 'DESC');
    else if (query.sort === 'usage') qb.orderBy('COUNT(p.id)', 'DESC');
    else qb.orderBy('t.name', 'ASC');

    qb.skip((page - 1) * limit)
      .take(limit)
      .groupBy('t.id');

    const [tags, total] = await qb.getManyAndCount();

    return { tags, meta: { total, page, limit } };
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    // Check if tag is used by any products
    if (tag.products && tag.products.length > 0) {
      throw new ConflictException(
        `Cannot delete tag that is used by ${tag.products.length} products`,
      );
    }

    return await this.tagRepo.remove(tag);
  }

  async updateTag(id: string, name: string) {
    const tag = await this.tagRepo.findOne({ where: { id } });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    const normalizedName = name.toLowerCase().trim();

    // Check if another tag already has this name
    const existingTag = await this.tagRepo.findOne({
      where: { name: normalizedName },
    });

    if (existingTag && existingTag.id !== id) {
      throw new ConflictException(`Tag "${name}" already exists`);
    }

    tag.name = normalizedName;
    return await this.tagRepo.save(tag);
  }
}
