import { Entity, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('variant_attributes')
@Index(['variant', 'attributeValue'], { unique: true })
export class VariantAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductVariant, (variant) => variant.attributes, { onDelete: 'CASCADE' })
  variant: ProductVariant;

  @ManyToOne(() => AttributeValue, { eager: true, onDelete: 'CASCADE' })
  attributeValue: AttributeValue;
}
