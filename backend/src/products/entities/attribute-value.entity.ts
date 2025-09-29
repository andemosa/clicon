import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity('attribute_values')
@Index(['attribute', 'value'], { unique: true })
export class AttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Attribute, (a) => a.values, { onDelete: 'CASCADE' })
  attribute: Attribute;

  @Index()
  @Column({ length: 100 })
  value: string; // e.g., "Red", "16GB"
}
