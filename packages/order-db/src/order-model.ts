import mongoose, { InferSchemaType, model } from "mongoose";
const { Schema } = mongoose;

export const OrderStatus = ["success", "failed"] as const;

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: OrderStatus },
    products: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderSchemaType = InferSchemaType<typeof orderSchema>;

export const Order = model<OrderSchemaType>("Order", orderSchema);

/* import mongoose, { Schema, InferSchemaType, model } from "mongoose";

export const orderStatus = ["success", "failed", "pending"] as const; // optional extra state

const orderSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, // ✅ better type for referencing users
      ref: "User", 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, // ✅ ensure consistent case
      trim: true, // ✅ avoid accidental spaces
    },
    amount: { 
      type: Number, 
      required: true, 
      min: 0, // ✅ sanity check
    },
    status: { 
      type: String, 
      required: true, 
      enum: orderStatus, 
      default: "pending" // ✅ safe default
    },
    products: {
      type: [
        {
          productId: { 
            type: Schema.Types.ObjectId, // ✅ link directly to Product model
            ref: "Product", 
            required: true 
          },
          name: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1 },
          price: { type: Number, required: true, min: 0 },
        },
      ],
      validate: [
        (arr: any[]) => arr.length > 0,
        "Order must include at least one product.", // ✅ validation message
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderSchemaType = InferSchemaType<typeof orderSchema>;

export const Order = model<OrderSchemaType>("Order", orderSchema);

1. Use Schema.Types.ObjectId for references
userId: { type: Schema.Types.ObjectId, ref: "User", required: true }


Makes userId an actual reference to a User document instead of a plain string.

Enables powerful Mongoose population:

Order.find().populate("userId");


Same for productId — now you can populate product info too.

2. Added input sanitization
email: { lowercase: true, trim: true }


Ensures stored emails are consistent and clean (no leading/trailing spaces).

3. Default and validation checks
status: { default: "pending" }
amount: { min: 0 }
quantity: { min: 1 }


Adds guardrails against invalid data.

4. Ensure at least one product
validate: [
  (arr: any[]) => arr.length > 0,
  "Order must include at least one product."
]


Prevents creating an empty order
*/
