const { prisma } = require("../../../../../shared/database/src/client");

async function listStores(query) {
  const q = (query.q || "").toLowerCase();
  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { slug: { contains: q } }
        ]
      }
    : {};
  const items = await prisma.store.findMany({
    where,
    include: { owner: { select: { id: true, name: true, email: true } } },
    orderBy: { id: "desc" }
  });

  return { ok: true, items, total: items.length };
}

async function createStore(authUser, body) {
  if (!authUser) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  if (!["store_owner", "admin"].includes(authUser.role)) {
    const err = new Error("Only store owners or admins can create stores");
    err.statusCode = 403;
    throw err;
  }

  let ownerId = Number(authUser.id);
  if (authUser.role === "admin" && body.ownerId !== undefined) {
    ownerId = Number(body.ownerId);
  }

  if (!ownerId) {
    const err = new Error("ownerId is required");
    err.statusCode = 400;
    throw err;
  }

  const owner = await prisma.user.findUnique({ where: { id: ownerId } });
  if (!owner) {
    const err = new Error("Owner user not found");
    err.statusCode = 404;
    throw err;
  }

  const created = await prisma.store.create({
    data: {
      ownerId,
      name: body.name || "Untitled Store",
      slug: body.slug || `store-${ownerId}-${Date.now()}`,
      logoUrl: body.logoUrl || null,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true
    }
  });
  return { ok: true, created };
}

async function storeBySlug(slug) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: { owner: { select: { id: true, name: true, email: true } } }
  });
  if (!store) {
    return { ok: false, message: "Store not found", slug };
  }
  return { ok: true, store };
}

async function storeProducts(slug, query) {
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return { ok: false, message: "Store not found", slug };

  const minPrice = Number(query.minPrice || 0);
  const maxPrice = Number(query.maxPrice || Number.MAX_SAFE_INTEGER);
  const items = await prisma.product.findMany({
    where: {
      storeId: store.id,
      price: { gte: minPrice, lte: maxPrice }
    },
    orderBy: { id: "desc" }
  });

  return { ok: true, items, total: items.length };
}

async function storeFeedback(slug, query) {
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return { ok: false, message: "Store not found", slug };

  const items = await prisma.customerFeedback.findMany({
    where: { storeId: store.id },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { id: "desc" }
  });
  return { ok: true, items, total: items.length };
}

module.exports = { listStores, createStore, storeBySlug, storeProducts, storeFeedback };
