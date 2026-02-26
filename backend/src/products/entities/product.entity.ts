import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';

import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity('products')
@Index(['slug'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* =====================
     Core Product Fields
  ====================== */

  @Index()
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Index()
  @Column({ nullable: true })
  brand: string;

  @Index('IDX_ACTIVE_PRODUCTS', { where: '"isActive" = true' })
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({
    type: 'enum',
    enum: ['percentage', 'fixed'],
    nullable: true,
  })
  discountType?: 'percentage' | 'fixed';

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  discountValue?: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ type: 'int', default: 0 })
  salesCount: number;

  @Column({ unique: true, nullable: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  imageId: string;

  /* =====================
     Relationships
  ====================== */

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  /* =====================
     Hooks
  ====================== */

  @BeforeInsert()
  @BeforeUpdate()
  normalizeSlug() {
    if (this.slug) {
      this.slug = this.slug.toLowerCase().trim();
    }
  }

  /* =====================
     Timestamps
  ====================== */

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
