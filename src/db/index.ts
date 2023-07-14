import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

// Create a function to initialize Prisma Client
const initializePrisma = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};
export const prisma = initializePrisma();
