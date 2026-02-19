import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TagsService } from '../services/tags.service';

import { ListTagsDto } from '../dto/tags/list-tags.dto';
import { CreateTagDto } from '../dto/tags/create-tag.dto';
import { UpdateTagDto } from '../dto/tags/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto.name);
  }

  @Get()
  findAll(@Query() query: ListTagsDto) {
    return this.tagsService.listTags(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateTag(id, updateTagDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.deleteTag(id);
  }
}
