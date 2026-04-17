import { PrismaClient } from '@prisma/client';

// 1. Access the global object with Prisma typed on it
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 2. Reuse existing connection if it exists, otherwise create a new one
export const prisma = globalForPrisma.prisma || new PrismaClient();

// 3. In development, save the instance globally to survive hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;