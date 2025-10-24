import type { Product, Category } from "@repo/product-db";

// Product
export type ProductType = Product;
export type ProductsType = ProductType[];

// Category
export type CategoryType = Category;

// Cart
export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};
