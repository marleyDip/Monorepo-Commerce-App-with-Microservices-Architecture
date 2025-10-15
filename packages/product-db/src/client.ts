import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// if not use cloud then do not need this
// import { withAccelerate } from "@prisma/extension-accelerate";
// .$extends(withAccelerate())
