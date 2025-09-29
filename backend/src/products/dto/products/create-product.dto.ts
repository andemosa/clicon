import { IsString, IsOptional, IsArray, ValidateNested, ArrayMaxSize, IsUUID, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVariantDto } from './create-variant.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  categoryIds?: string[];

  @IsArray()
  @ArrayMaxSize(5, { message: 'Maximum 5 tags allowed' })
  @IsOptional()
  tagIds?: string[]; // admin can pass existing tag ids

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  @IsNotEmpty()
  variants: CreateVariantDto[];

  // optional metadata
  metadata?: any;
}
