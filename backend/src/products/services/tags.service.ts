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
    const normalizedName = name.toLowerCase().trim();
    const existingTag = await this.tagRepo.findOne({
      where: { name: normalizedName },
    });

    if (existingTag) {
      return existingTag;
    }

    const tag = this.tagRepo.create({
      name: normalizedName,
      productCount: 0,
    });

    return await this.tagRepo.save(tag);
  }

  async listTags(query: ListTagsDto) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, query.limit || 20);

    const qb = this.tagRepo.createQueryBuilder('t');

    if (query.search) {
      qb.andWhere('t.name ILIKE :q', { q: `%${query.search}%` });
    }

    const sortBy = query.sort || 'name';
    const order = query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(`t.${sortBy}`, order);

    qb.skip((page - 1) * limit).take(limit);

    const [tags, total] = await qb.getManyAndCount();

    return { tags, meta: { total, page, limit } };
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepo.findOne({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.productCount > 0) {
      throw new ConflictException(
        `Cannot delete tag that is used by ${tag.productCount} products`,
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
