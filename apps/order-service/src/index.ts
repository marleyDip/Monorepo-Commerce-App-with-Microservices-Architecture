import Fastify from "fastify";
import clerk from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const fastify = Fastify();

// Clerk & Fastify Middleware - To handle all routes or limit it to specific ones.
fastify.register(clerk.clerkPlugin);

// Test the fastify to work
fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Authenticate with Clerk & Fastify
fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order service is authenticated!",
    userId: request.userId,
  });
});

/**
 * Run the server! with async/await
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
