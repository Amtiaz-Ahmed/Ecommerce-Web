import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

// Prisma 7: Migrate / CLI use this URL. Schema must NOT contain `url` (P1012).
// DATABASE_URL in repo-root `.env`, e.g. mysql://USER:PASSWORD@localhost:3306/ecommerce
export default defineConfig({
  schema: "shared/database/prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL")
  }
});
