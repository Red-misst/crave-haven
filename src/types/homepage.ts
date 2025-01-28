export interface ProductType {
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    vendor: string;
    slug:string;
    category: string;
  }
  
  export interface CategoryType {
    _id: string;
    name: string;
  }
  
  export interface FoodType {
    name: string;
    price: number;
    image: string;
    category: string;
    inStock?: boolean;
    vendor?: string;
  }