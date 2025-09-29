import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { AttributeValue } from './attribute-value.entity';

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'citext' })
  name: string; // e.g., "Color", "RAM", "Storage"

  @OneToMany(() => AttributeValue, (v) => v.attribute)
  values: AttributeValue[];
}
