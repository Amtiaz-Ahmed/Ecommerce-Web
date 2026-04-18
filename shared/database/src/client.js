const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env")
});

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

/**
 * Single shared Prisma client for all services (import from @ecommerce/database).
 * DATABASE_URL is read from root `.env`; Migrate uses the same URL via `prisma.config.ts`.
 */
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["error", "warn"]
      : ["error"]
});

module.exports = { prisma };
