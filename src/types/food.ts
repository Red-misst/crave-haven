// types/food.d.ts
export interface FoodType {
    _id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    vendor?: string;
    inStock?: boolean;
    createdAt?: Date;
  }