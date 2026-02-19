
export class ProductResponseDto {
  id: string;
  name: string;
  description?: string;
  brand?: string;
  isActive: boolean;
  price: number;
  stock: number;
  discountType?: string;
  discountValue?: number;
  averageRating: number;
  salesCount: number;
  slug: string;

  category: {
    id: string;
    name: string;
    slug: string;
  } | null;

  tags: {
    id: string;
    name: string;
  }[];

  image: string;

  createdAt: Date;
  updatedAt: Date;
}
