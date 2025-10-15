import express, { Request, Response } from "express";
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

// Clerk & Express Middleware
app.use(clerkMiddleware());

// Authenticate with Clerk & Express
app.get("/test", shouldBeUser, (req, res) => {
  res.json({ message: "Product service authenticated", userId: req.userId });
});

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
