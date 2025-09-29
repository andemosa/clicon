import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  isActive?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
