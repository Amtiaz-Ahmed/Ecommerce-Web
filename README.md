<<<<<<< HEAD
# Ecommerce Backend (Microservices)

Stack: **Node.js + Express**, **Prisma + MySQL**, **Redis** (later). Frontend later: **React**.

## Services

| Service | Base URL (local) | SRS coverage |
|--------|-------------------|--------------|
| `services/customer-service` | `http://localhost:3002/api/...` | Customer dashboard, search, recommendations, AI discover, cart, orders, payments, products, categories, wishlist, reviews, feedback, discounts (validate) |
| `services/admin-service` | `http://localhost:3001/api/admin/...` | Admin dashboard, analytics, users, stores, products, orders, disputes, discounts |
| `services/store-service` | `http://localhost:3003/api/stores/...` | Public store listing + `me/*` store-owner panel |
| `services/api-gateway` | `http://localhost:3000` | Placeholder; later proxies `/api` to the services above |

## Shared modules

- `shared/common` — logging, errors, `stubOk` for unfinished endpoints
- `shared/database` — Prisma schema + client (wire next)

## Per-domain layering (every module)

`modules/<domain>/routes.js` → `controller.js` → `service.js` → `model.js`

Technical cross-cutting folders stay at `src/middleware`, `src/validation`, `src/authentication`, etc.

## Customer service — route map (matches SRS paths)

Mounted at **`/api`** (not `/api/customer`).

- `GET /api/dashboard/customer`
- `GET /api/search/products`, `/api/search/suggestions`, `/api/search/history`, `DELETE ...`
- `GET /api/recommendations/dashboard`
- `POST /api/ai/discover`, `GET /api/ai/suggestions/dashboard`
- `POST|GET|PUT|DELETE /api/feedback...`
- `POST /api/discounts/validate`
- `GET|POST|PUT|DELETE /api/cart...`, apply/remove discount
- `GET /api/wishlist`, `POST /api/wishlist/items`
- `GET /api/categories`
- `GET /api/products`, `GET /api/products/:id`, `GET /api/products/category/:slug`, `GET /api/products/:id/feedback`
- `GET|POST /api/orders...`, checkout, pay
- `POST /api/payments/create-intent`, `POST /api/payments/webhook`
- `POST /api/reviews`

Responses are **stubs** (`stub: true`, `srsRef`) until Prisma + auth are wired.

## Admin service

Mounted at **`/api/admin`**.

- `GET /api/admin/dashboard`
- `GET /api/admin/analytics` (+ `/overview`, `/revenue`, `/top-stores`, `/top-products`)
- `GET|PUT /api/admin/users...`
- `GET|PUT /api/admin/stores...` (approve/reject)
- `GET|POST|PUT|DELETE /api/admin/products...`
- `GET /api/admin/orders`
- `GET|PUT /api/admin/disputes...`
- `GET|POST|PUT|DELETE /api/admin/discounts...`

## Store service

Mounted at **`/api/stores`**. **`/me` routes are registered before `/:slug`** so `me` is not captured as a slug.

- `GET|POST /api/stores`, `GET /api/stores/:slug`, `GET /api/stores/:slug/products`, `GET /api/stores/:slug/feedback`
- `PUT /api/stores/me`, `GET /api/stores/me/dashboard`, analytics, dashboard sales/suggestions, products, orders, customers, reviews, feedback, promotions, discounts

## Auth (SRS)

`POST /api/auth/register`, `login`, `refresh`, `me`, `forgot-password` — **add as `services/auth-service` or inside gateway next** (not scaffolded yet).

## Database (Prisma + MySQL)

**Editing `schema.prisma` does not create tables.** You must apply the schema to MySQL.

1. **MySQL is running** and you have a database (create once in MySQL client):

   `CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

2. **Root `.env`** at `ecommerce/.env` contains a valid `DATABASE_URL`, for example:

   `DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/ecommerce"`

3. **Run Prisma from the repo root** (so `prisma.config.ts` and `.env` are picked up — do **not** rely on `npx prisma db push` only inside `shared/database` without fixing paths/env):

   ```bash
   npm install
   npm run db:generate
   npm run db:push
   ```

   - `db:push` — syncs tables to the DB (good for development).
   - `db:migrate` — creates migration files (better for production).

**Prisma 7 note:** `url` is **not** allowed inside `schema.prisma` anymore (you get P1012). The connection string for Migrate / `db push` / `generate` is set in **`prisma.config.ts`** as `datasource.url: env("DATABASE_URL")`. At runtime, **`shared/database/src/client.js`** uses `PrismaClient({ adapter })` with `@prisma/adapter-mariadb` and `DATABASE_URL`.

**If you see:** `The datasource property url is no longer supported in schema files` — remove `url` from `schema.prisma` and keep it in `prisma.config.ts` as above.

## Setup

From the **repository root** (only place you need `node_modules` for this monorepo):

```bash
npm install
```

That installs shared deps (e.g. `express`) and links npm workspaces (`services/*`, `shared/*`). You do **not** need a separate `npm install` inside each service unless you add service-only packages later.

Run **all** backend processes in one terminal:

```bash
npm run dev
```

Or run one service:

```bash
npm run dev:customer
npm run dev:admin
npm run dev:store
npm run dev:gateway
```

## Next implementation steps

1. `npm install` at repo root (workspaces) or per service.
2. Expand `shared/database/prisma/schema.prisma` from `Ecommerce SRS.txt` and run migrations.
3. Replace `stubOk` responses with Prisma queries.
4. Add JWT auth middleware in `shared/common` and protect routes.
=======
# Ecommerce-Web
A full-stack eCommerce application with complete frontend and backend, featuring user authentication, product browsing, cart management, and order processing, built for scalability and real-world usage.
>>>>>>> c2619921425a4c6978f9d2716e821d50aab094e7
