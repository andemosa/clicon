import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariantAttributeInput {
  @IsString()
  attributeName: string; // e.g. "Color" - service will map/create Attribute/Value

  @IsString()
  attributeValue: string; // e.g. "Red"
}

export class CreateVariantDto {
  @IsString()
  sku: string;

  @IsString()
  title?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantAttributeInput)
  attributes: VariantAttributeInput[];

  @IsArray()
  @IsOptional()
  images?: {
    url: string;
    imageId: string;
    sortOrder?: number;
    altText?: string;
    isPrimary?: boolean;
  }[];
}
