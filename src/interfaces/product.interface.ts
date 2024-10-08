export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type; //TODO: Fix
  gender: Category;
}

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  size: Size;
  price: number;
  quantity: number;
  image: string;
}

export type ProductImage = {
  id: number;
  url: string;
  productId?: string;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
export interface SeedData {
  products: Product[];
}
