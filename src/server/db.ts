import { PrismaClient } from "@prisma/client";

//in dev "next dev" clear Node.js cache on run
//this will cause to initialize new PrismaClient each time during hot reload
//and it will lead to exhaust the database connection as each PrismaClient instance
//holds its connection pool

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
