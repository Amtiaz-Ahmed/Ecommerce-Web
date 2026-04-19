# Admin Service README

This document explains the `admin-service` end-to-end so you can understand structure, routes, flow, and current implementation status.

## Purpose

`admin-service` handles **platform-level admin operations** for your ecommerce system, such as:

- admin dashboard
- analytics
- user moderation
- store approvals/rejections
- product moderation
- order oversight
- dispute resolution
- global discount management

Base URL (local): `http://localhost:3001`
API prefix: `http://localhost:3001/api/admin`

---

## Current Status

Right now this service is a **fully scaffolded API layer** with real route/controller/service/module structure, but business logic is still stubbed.

Most service methods return:

- `ok: true`
- `stub: true`
- `srsRef: "<intended SRS endpoint>"`

This is intentional so you can lock API contracts first, then replace stubs with Prisma queries.

---

## Tech Stack (Current)

- Node.js
- Express
- Morgan (`dev` request logging)
- Shared error handler from `shared/common/src`

Entry file: `src/index.js`

---

## How Request Flow Works

The service follows your preferred architecture:

`route -> controller -> service -> model`

Example:

- Route: `src/modules/users/routes.js`
- Controller: `src/modules/users/controller.js`
- Service: `src/modules/users/service.js`
- Model placeholder: `src/modules/users/model.js`

Top-level router mount:

- `src/api/routes/index.js` mounts all admin modules
- `src/index.js` mounts router at `/api/admin`

---

## Folder Structure

```text
services/admin-service/
  src/
    index.js
    api/routes/index.js
    modules/
      dashboard/
      analytics/
      users/
      stores/
      products/
      orders/
      disputes/
      discounts/
    authentication/
    authorization/
    middleware/
    validation/
    error-handling/
    logging/
    database/
```

Notes:

- `modules/*` contains business API domains.
- `authentication`, `authorization`, `validation`, etc. are present and ready for real middleware implementation.

---

## Boot Sequence (`src/index.js`)

1. Create Express app
2. Enable JSON body parsing (`express.json()`)
3. Enable request logging (`morgan("dev")`)
4. Mount admin API: `app.use("/api/admin", adminRoutes)`
5. Health route: `GET /health`
6. Global error handling: `app.use(errorHandler)`
7. Start server on `ADMIN_SERVICE_PORT` (default `3001`)

---

## Endpoint Map (Implemented Routes)

All endpoints below are mounted under `/api/admin`.

### 1) Dashboard

- `GET /dashboard`

Returns stub fields for:

- `range`
- `topSellingProducts`
- `suggestedTrends`
- `feedbackSentiment`

---

### 2) Analytics

- `GET /analytics` (legacy analytics endpoint)
- `GET /analytics/overview`
- `GET /analytics/revenue`
- `GET /analytics/top-stores`
- `GET /analytics/top-products`

---

### 3) Users

- `GET /users`
- `PUT /users/:id/status`

---

### 4) Stores

- `GET /stores`
- `PUT /stores/:id/approve`
- `PUT /stores/:id/reject`

---

### 5) Products

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

---

### 6) Orders

- `GET /orders`

---

### 7) Disputes

- `GET /disputes`
- `PUT /disputes/:id/resolve`

---

### 8) Discounts

- `GET /discounts`
- `POST /discounts`
- `PUT /discounts/:id`
- `DELETE /discounts/:id`

---

## Health Check

- `GET /health`

Response:

```json
{ "service": "admin-service", "status": "ok" }
```

---

## Example Stub Response

Most admin endpoints currently return this pattern:

```json
{
  "ok": true,
  "stub": true,
  "srsRef": "GET /api/admin/users",
  "items": []
}
```

---

## Run Instructions

From repo root:

```bash
npm run dev:admin
```

Or run all services:

```bash
npm run dev
```

---

## How to Move From Stub to Real DB Logic

Replace each module `service.js` method with Prisma-backed code.

Recommended order:

1. `users` (list + status update)
2. `stores` (approve/reject workflow)
3. `products` (moderation CRUD)
4. `orders`
5. `analytics` + `dashboard` aggregations
6. `disputes`
7. `discounts`

Then add:

- auth middleware (JWT verify)
- admin role guard (RBAC)
- request validation schemas
- pagination/sorting/filter standardization
- centralized audit logging for admin actions

---

## Immediate Next Improvements (Suggested)

- Add `authRequired` + `adminOnly` middleware globally to `/api/admin/*`.
- Add validation middleware for mutable routes (`PUT/POST/DELETE`).
- Wire `shared/database/src/client.js` Prisma client into each service module.
- Add consistent error codes/messages for admin panels.
- Add integration tests for core admin flows.

