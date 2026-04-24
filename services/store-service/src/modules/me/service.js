const { prisma } = require("../../../../../shared/database/src/client");

async function resolveStoreForUser(user) {
  if (!user || !user.id) {
    const err = new Error("Authenticated store owner is required");
    err.statusCode = 401;
    throw err;
  }

  let store = await prisma.store.findUnique({ where: { ownerId: Number(user.id) } });
  if (!store) {
    store = await prisma.store.create({
      data: {
        ownerId: Number(user.id),
        name: `${user.email || "Owner"} Store`,
        slug: `store-owner-${user.id}-${Date.now()}`,
        isActive: true
      }
    });
  }
  return store;
}

async function dashboard(user) {
  const store = await resolveStoreForUser(user);
  const [totalProducts, pendingOrders, aggregate] = await Promise.all([
    prisma.product.count({ where: { storeId: store.id } }),
    prisma.order.count({ where: { items: { some: { product: { storeId: store.id } } }, status: "pending" } }),
    prisma.orderItem.aggregate({
      where: { product: { storeId: store.id } },
      _sum: { quantity: true, price: true }
    })
  ]);

  return {
    ok: true,
    store,
    summary: {
      totalProducts,
      pendingOrders,
      totalItemsSold: aggregate._sum.quantity || 0
    }
  };
}

async function analytics(user, query) {
  const store = await resolveStoreForUser(user);
  const items = await prisma.order.findMany({
    where: { items: { some: { product: { storeId: store.id } } } },
    select: { id: true, status: true, createdAt: true },
    orderBy: { id: "desc" }
  });
  const byStatus = items.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  return { ok: true, range: query.range || "30d", ordersByStatus: byStatus };
}

async function dashboardSales(user, query) {
  const store = await resolveStoreForUser(user);
  const rows = await prisma.orderItem.findMany({
    where: { product: { storeId: store.id } },
    select: { quantity: true, price: true }
  });
  const totalOrders = await prisma.order.count({
    where: { items: { some: { product: { storeId: store.id } } } }
  });
  const totalSales = rows.reduce((sum, row) => sum + Number(row.price) * row.quantity, 0);
  return { ok: true, range: query.range || "7d", totalOrders, totalSales };
}

async function dashboardSuggestions(user) {
  const store = await resolveStoreForUser(user);
  const lowStock = await prisma.product.count({ where: { storeId: store.id, stockQuantity: { lt: 5 } } });
  return {
    ok: true,
    items: [
      lowStock ? `${lowStock} product(s) have low stock` : "Stock levels look healthy",
      "Review customer feedback for service improvements",
      "Create a new discount to increase conversions"
    ]
  };
}

async function createProduct(user, body) {
  const store = await resolveStoreForUser(user);
  const created = await prisma.product.create({
    data: {
      storeId: store.id,
      categoryId: body.categoryId ? Number(body.categoryId) : null,
      name: body.name || "Untitled Product",
      slug: body.slug || `product-${Date.now()}`,
      description: body.description || null,
      price: Number(body.price || 0),
      stockQuantity: Number(body.stockQuantity ?? body.stock ?? 0),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true
    }
  });
  return { ok: true, created };
}

async function updateProduct(user, id, body) {
  const store = await resolveStoreForUser(user);
  const productId = Number(id);
  const existing = await prisma.product.findFirst({ where: { id: productId, storeId: store.id } });
  if (!existing) return { ok: false, message: "Product not found", id: productId };

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      name: body.name ?? undefined,
      slug: body.slug ?? undefined,
      description: body.description ?? undefined,
      price: body.price !== undefined ? Number(body.price) : undefined,
      stockQuantity: body.stockQuantity !== undefined ? Number(body.stockQuantity) : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined
    }
  });
  return { ok: true, updated };
}

async function deleteProduct(user, id) {
  const store = await resolveStoreForUser(user);
  const productId = Number(id);
  const existing = await prisma.product.findFirst({ where: { id: productId, storeId: store.id } });
  if (!existing) return { ok: false, message: "Product not found", id: productId };
  await prisma.product.delete({ where: { id: productId } });
  return { ok: true, deleted: existing };
}

async function patchStock(user, id, body) {
  const store = await resolveStoreForUser(user);
  const productId = Number(id);
  const existing = await prisma.product.findFirst({ where: { id: productId, storeId: store.id } });
  if (!existing) return { ok: false, message: "Product not found", id: productId };
  const updated = await prisma.product.update({
    where: { id: productId },
    data: { stockQuantity: Number(body.stockQuantity ?? body.stock ?? 0) }
  });
  return { ok: true, updated };
}

async function orders(user, query) {
  const store = await resolveStoreForUser(user);
  const where = {
    items: { some: { product: { storeId: store.id } } },
    ...(query.status ? { status: query.status } : {})
  };
  const items = await prisma.order.findMany({
    where,
    include: { user: { select: { id: true, name: true, email: true } }, items: true },
    orderBy: { id: "desc" }
  });
  return { ok: true, items, total: items.length };
}

async function orderStatus(user, id, body) {
  const store = await resolveStoreForUser(user);
  const orderId = Number(id);
  const order = await prisma.order.findFirst({
    where: { id: orderId, items: { some: { product: { storeId: store.id } } } }
  });
  if (!order) return { ok: false, message: "Order not found", id: orderId };

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: body.status || order.status }
  });
  return { ok: true, updated };
}

async function customers(user, query) {
  const store = await resolveStoreForUser(user);
  const feedbackUsers = await prisma.customerFeedback.findMany({
    where: { storeId: store.id },
    include: { user: { select: { id: true, name: true, email: true } } }
  });
  const q = (query.q || "").toLowerCase();
  const map = new Map();
  for (const row of feedbackUsers) {
    if (!row.user) continue;
    const key = row.user.id;
    if (!map.has(key)) map.set(key, row.user);
  }
  const items = [...map.values()].filter((u) => !q || (u.name || "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  return { ok: true, items, total: items.length };
}

async function reviews(user) {
  const store = await resolveStoreForUser(user);
  const items = await prisma.customerFeedback.findMany({
    where: { storeId: store.id, productId: { not: null } },
    include: { user: { select: { id: true, name: true, email: true } }, product: true },
    orderBy: { id: "desc" }
  });
  return { ok: true, items, total: items.length };
}

async function feedback(user, query) {
  const store = await resolveStoreForUser(user);
  const items = await prisma.customerFeedback.findMany({
    where: {
      storeId: store.id,
      ...(query.feedbackType ? { feedbackType: query.feedbackType } : {})
    },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { id: "desc" }
  });
  return { ok: true, items, total: items.length };
}

async function createPromotion(user, body) {
  const store = await resolveStoreForUser(user);
  const created = await prisma.discount.create({
    data: {
      storeId: store.id,
      code: body.code || `PROMO${Date.now()}`,
      name: body.title || body.name || "Store Promotion",
      description: body.description || null,
      type: "percentage",
      scope: "store",
      value: Number(body.discountPercent || body.value || 0),
      startsAt: body.startsAt ? new Date(body.startsAt) : new Date(),
      endsAt: body.endsAt ? new Date(body.endsAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isActive: true
    }
  });
  return { ok: true, created };
}

async function createDiscount(user, body) {
  const store = await resolveStoreForUser(user);
  const created = await prisma.discount.create({
    data: {
      storeId: store.id,
      code: body.code || null,
      name: body.name || "Store Discount",
      description: body.description || null,
      type: body.type || "percentage",
      scope: body.scope || "store",
      value: Number(body.value || body.percentOff || 0),
      minOrderAmount: body.minOrderAmount !== undefined ? Number(body.minOrderAmount) : null,
      maxDiscountAmount: body.maxDiscountAmount !== undefined ? Number(body.maxDiscountAmount) : null,
      usageLimit: body.usageLimit !== undefined ? Number(body.usageLimit) : null,
      perUserLimit: body.perUserLimit !== undefined ? Number(body.perUserLimit) : null,
      startsAt: body.startsAt ? new Date(body.startsAt) : new Date(),
      endsAt: body.endsAt ? new Date(body.endsAt) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true
    }
  });
  return { ok: true, created };
}

async function listDiscounts(user, query) {
  const store = await resolveStoreForUser(user);
  const q = (query.q || "").toLowerCase();
  const items = await prisma.discount.findMany({
    where: {
      storeId: store.id,
      ...(q ? { OR: [{ code: { contains: q } }, { name: { contains: q } }] } : {})
    },
    include: { productLinks: true },
    orderBy: { id: "desc" }
  });
  return { ok: true, items, total: items.length };
}

async function updateDiscount(user, id, body) {
  const store = await resolveStoreForUser(user);
  const discountId = Number(id);
  const existing = await prisma.discount.findFirst({ where: { id: discountId, storeId: store.id } });
  if (!existing) return { ok: false, message: "Discount not found", id: discountId };
  const updated = await prisma.discount.update({
    where: { id: discountId },
    data: {
      code: body.code ?? undefined,
      name: body.name ?? undefined,
      description: body.description ?? undefined,
      type: body.type ?? undefined,
      scope: body.scope ?? undefined,
      value: body.value !== undefined ? Number(body.value) : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined
    }
  });
  return { ok: true, updated };
}

async function deleteDiscount(user, id) {
  const store = await resolveStoreForUser(user);
  const discountId = Number(id);
  const existing = await prisma.discount.findFirst({ where: { id: discountId, storeId: store.id } });
  if (!existing) return { ok: false, message: "Discount not found", id: discountId };
  await prisma.discount.delete({ where: { id: discountId } });
  return { ok: true, deleted: existing };
}

async function attachDiscountProducts(user, id, body) {
  const store = await resolveStoreForUser(user);
  const discountId = Number(id);
  const discount = await prisma.discount.findFirst({ where: { id: discountId, storeId: store.id } });
  if (!discount) return { ok: false, message: "Discount not found", id: discountId };
  const productIds = Array.isArray(body.productIds) ? body.productIds.map(Number).filter(Boolean) : [];

  if (!productIds.length) {
    const err = new Error("productIds array is required");
    err.statusCode = 400;
    throw err;
  }

  const validProducts = await prisma.product.findMany({
    where: { id: { in: productIds }, storeId: store.id },
    select: { id: true }
  });
  const validIds = validProducts.map((p) => p.id);

  await prisma.productDiscount.createMany({
    data: validIds.map((productId) => ({ productId, discountId })),
    skipDuplicates: true
  });
  const updated = await prisma.discount.findUnique({
    where: { id: discountId },
    include: { productLinks: true }
  });
  return { ok: true, updated };
}

async function updateStoreProfile(user, body) {
  const store = await resolveStoreForUser(user);
  const updated = await prisma.store.update({
    where: { id: store.id },
    data: {
      name: body.name ?? undefined,
      slug: body.slug ?? undefined,
      logoUrl: body.logoUrl ?? undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined
    }
  });
  return { ok: true, updated };
}

module.exports = {
  dashboard,
  analytics,
  dashboardSales,
  dashboardSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
  patchStock,
  orders,
  orderStatus,
  customers,
  reviews,
  feedback,
  createPromotion,
  createDiscount,
  listDiscounts,
  updateDiscount,
  deleteDiscount,
  attachDiscountProducts,
  updateStoreProfile
};
