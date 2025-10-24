import { Product } from "@repo/product-db";
import z from "zod";

// Cart Item Type
export type CartItemType = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
export type CartItemsType = CartItemType[];

// Shipping Form Inputs
export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 15 digits!")
    .max(15, "Phone number must be between 7 and 15 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "city is required!"),
});
export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

// cart state type
export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

// cart action type
export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
