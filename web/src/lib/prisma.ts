import { PrismaClient } from '@prisma/client';

// Add a global type declaration for Prisma to avoid multiple client instances in development
declare global {
  // Allow the `prisma` variable to be reused across different modules in development
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma = global.prisma || new PrismaClient();

// Ensure we don't create multiple PrismaClient instances in development (if hot-reloading occurs)
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export { prisma };
