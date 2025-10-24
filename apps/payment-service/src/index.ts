import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import stripe from "./utils/stripe.js";

const app = new Hono();

// Hono & Clerk middleware
app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Create Stripe Product
// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "124",
//     name: "Test Product",
//     default_price_data: {
//       currency: "bdt",
//       unit_amount: 10 * 100,
//     },
//   });

//   return c.json(res);
// });

// Fetch Stripe Product Price
// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });

//   return c.json(res);
// });

// Authenticate with Clerk & & Hono
// app.get("/pay", shouldBeUser, async (c) => {
//   const { products } = await c.res.json();

//   const totalPrice = await Promise.all(
//     products.map(async (product: any) => {
//       const productInDB: any = await fetch(
//         `localhost:8000/product/${product.id}`
//       );
//       return productInDB.price * product.quantity;
//     })
//   );

//   return c.json({
//     message: "Payment Service is Authenticated!",
//     userId: c.get("userId"),
//   });
// });

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log("Payment service is running on port 8002");
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
