import { FastifyReply, FastifyRequest } from "fastify";
import clerk from "@clerk/fastify";
import { CustomJwtSessionClaims } from "@repo/types";

declare module "Fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

// User
export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = clerk.getAuth(request);

  // if not logged in
  if (!userId) {
    return reply.status(401).send({ message: "You are not logged in!" });
  }

  request.userId = userId;
};

// Admin
export const shouldBeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const auth = clerk.getAuth(request);

  // if not logged in
  if (!auth.userId) {
    return reply.status(401).send({ message: "You are not logged in!" });
  }

  // if not admin or authorized
  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "Unauthorized Admin!" });
  }

  request.userId = auth.userId;
};
