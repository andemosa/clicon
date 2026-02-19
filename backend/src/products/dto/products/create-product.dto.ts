import { IsString, IsOptional, IsBoolean, IsNumber, Min, IsUUID, IsEnum, IsArray, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export class CreateProductDto {
  @IsString({ message: 'Product name is required and must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Brand must be a string' })
  brand?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(1, { message: 'Price must be at least 1' })
  price: number;

  @IsOptional()
  @IsInt({ message: 'Stock must be an integer number' })
  @Min(1, { message: 'Stock must be at least 1' })
  stock?: number;

  @IsOptional()
  @IsEnum(DiscountType, { message: 'Discount type must be either "percentage" or "fixed"' })
  discountType?: DiscountType;

  @IsOptional()
  @IsNumber({}, { message: 'Discount value must be a number' })
  @Min(0, { message: 'Discount value must be at least 0' })
  discountValue?: number;

  @IsUUID('4', { message: 'Select a valid category' })
  categoryId: string;

  @IsOptional()
  @IsArray({ message: 'Invalid array of tags' })
  @IsUUID('4', { each: true, message: 'Each tag must be a valid id' })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  tagIds?: string[];
}
