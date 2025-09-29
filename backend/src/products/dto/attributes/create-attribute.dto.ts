import { IsString, Length } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
