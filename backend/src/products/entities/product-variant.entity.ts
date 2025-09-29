import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { VariantAttribute } from './variant-attribute.entity';

export type DiscountType = 'PERCENTAGE' | 'FIXED';

@Entity('product_variants')
@Index(['product', 'sku'], { unique: true })
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['PERCENTAGE', 'FIXED'],
    nullable: true,
  })
  discountType?: DiscountType;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discountValue?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discountedPrice: number;

  @Column('int')
  stock: number;

  @OneToMany(() => VariantAttribute, (attr) => attr.variant, { cascade: true })
  attributes: VariantAttribute[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @Column({ nullable: true })
  primaryImageId: string;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Auto-calculate discounted price before insert/update
  @BeforeInsert()
  @BeforeUpdate()
  computeDiscountedPrice() {
    if (this.discountType && this.discountValue) {
      if (this.discountType === 'PERCENTAGE') {
        this.discountedPrice =
          Number(this.price) -
          (Number(this.price) * Number(this.discountValue)) / 100;
      } else if (this.discountType === 'FIXED') {
        this.discountedPrice = Number(this.price) - Number(this.discountValue);
      }

      // Prevent negative prices
      if (this.discountedPrice < 0) {
        this.discountedPrice = 0;
      }
    } else {
      // No discount, fallback to original price
      this.discountedPrice = this.price;
    }
  }
}
