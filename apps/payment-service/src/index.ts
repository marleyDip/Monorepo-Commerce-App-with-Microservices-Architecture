import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhooks.route.js";

const app = new Hono();

// Hono & Clerk Middleware
app.use("*", clerkMiddleware());

// Only Allow This Origin
app.use("*", cors({ origin: ["http://localhost:3002"] }));

// Check Work or Not
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Route Stripe
app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

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

/* 🧠 What is CORS?

    = CORS stands for Cross-Origin Resource Sharing.
    = It’s a browser security feature that controls how a web page can request resources (like API data) from a different origin (domain, port, or protocol).

For example:

Client Origin	           API Origin	Browser             Action
http://localhost:3000	http://localhost:8000	Blocked by default unless CORS is allowed
http://localhost:3000	http://localhost:3000	Allowed (same origin)

⚙️ Why use CORS in Hono?

  = When you’re building a frontend (e.g., React, Vue, Next.js) and a backend API (e.g., Hono, Express, FastAPI) that run on different ports or domains, the browser will block requests unless your backend enables CORS.

So you use CORS middleware in Hono to tell the browser:
          “Hey, it’s safe to allow requests from this frontend.”

✅ Example: Enable CORS in Hono

Here’s how you add it:
        import { Hono } from 'hono'
        import { cors } from 'hono/cors'

        const app = new Hono()

        // Enable CORS for all routes
        app.use('*', cors())
        app.get('/', (c) => c.text('CORS enabled!'))
        export default app


This adds CORS headers like:

Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type

🔒 Allow specific origins only
You can customize it for security:

      app.use(
        '*',
        cors({
          origin: 'http://localhost:3000', // only allow this origin
          allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allowHeaders: ['Content-Type', 'Authorization']
        })
      )

⚠️ Without CORS, what happens?
If your React app calls your Hono API like this:
      => fetch('http://localhost:8000/api/products')

  The browser will block it with:

    ❌ Access to fetch at 'http://localhost:8000/api/products' from origin 'http://localhost:3000' has been blocked by CORS policy.

    = That’s why adding CORS middleware is essential for frontend-backend communication across origins.

    🧩 Summary
    Purpose	                           Explanation
    Security	         Prevent unauthorized cross-origin requests
    Control	           Allow only trusted domains to access your API
    Convenience	       Let your frontend (React, Vue, etc.) call your Hono backend
*/
