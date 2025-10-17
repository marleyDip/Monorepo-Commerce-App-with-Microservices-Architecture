import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002/", "http://localhost:3003/"],
    credentials: true,
  })
);

// Built-in middleware in Express
app.use(express.json());

// Clerk & Express Middleware
app.use(clerkMiddleware());

// Check
app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Authenticate with Clerk & Express
app.get("/test", shouldBeUser, (req, res) => {
  res.json({ message: "Product service authenticated", userId: req.userId });
});

// Product & Category Route, Controller
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// Network error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Enter Server Error!" });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});

/* In Express.js, the line

        = Client sends JSON data to backend
        = express.json() lets Express read it
        = You access it through req.body
        = (parse = json() string to json() & stringify = json() to json() string)

        req.body just means:
          = “The data sent from the client (frontend or Postman) to your server.”
          = It doesn’t automatically save anything to the database — it just receives the data.
          = It’s just available in your code so you can decide what to do with it.

app.use(express.json());
        = is very important — it enables your app to understand JSON data sent in HTTP requests.

🧩 1. What it does
        = express.json() is a built-in middleware in Express that:
        = Parses incoming requests with a JSON payload
        = Automatically converts the JSON into a JavaScript object
        = Stores it in req.body

⚙️ 2. Without it
        = If a client sends JSON data (like from Postman or frontend fetch()):

                => json() string
                  {
                    "name": "Shoe",
                    "price": 100
                  }
        = Then inside your route:
                  app.post('/products', (req, res) => {
                    console.log(req.body);
                  });

        = Without app.use(express.json());,
              ➡️ req.body will be undefined 😕

✅ 3. With it
        = Now Express knows how to handle the JSON, and:

              console.log(req.body);
              Output: { name: "Shoe", price: 100 }

    🧠 4. Summary
    Without express.json()	                   With express.json()
    req.body is undefined	                req.body is a parsed JS object
    You can’t access JSON data	      You can easily read and use request data
*/
