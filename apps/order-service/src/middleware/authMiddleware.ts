import { FastifyReply, FastifyRequest } from "fastify";
import clerk from "@clerk/fastify";

declare module "Fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = clerk.getAuth(request);

  if (!userId) {
    return reply.send({ message: "You are not logged in!" });
  }

  request.userId = userId;
};
