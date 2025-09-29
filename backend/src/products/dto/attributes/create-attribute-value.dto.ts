import { IsString, IsUUID } from 'class-validator';

export class CreateAttributeValueDto {
  @IsUUID()
  attributeId: string;

  @IsString()
  value: string;
}
