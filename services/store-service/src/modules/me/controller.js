const service = require("./service");

async function dashboard(req, res, next) {
  try {
    res.json(await service.dashboard(req.user));
  } catch (err) {
    next(err);
  }
}

async function analytics(req, res, next) {
  try {
    res.json(await service.analytics(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function dashboardSales(req, res, next) {
  try {
    res.json(await service.dashboardSales(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function dashboardSuggestions(req, res, next) {
  try {
    res.json(await service.dashboardSuggestions(req.user));
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    res.status(201).json(await service.createProduct(req.user, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    res.json(await service.updateProduct(req.user, req.params.id, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    res.json(await service.deleteProduct(req.user, req.params.id));
  } catch (err) {
    next(err);
  }
}

async function patchStock(req, res, next) {
  try {
    res.json(await service.patchStock(req.user, req.params.id, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function orders(req, res, next) {
  try {
    res.json(await service.orders(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function orderStatus(req, res, next) {
  try {
    res.json(await service.orderStatus(req.user, req.params.id, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function customers(req, res, next) {
  try {
    res.json(await service.customers(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function reviews(req, res, next) {
  try {
    res.json(await service.reviews(req.user));
  } catch (err) {
    next(err);
  }
}

async function feedback(req, res, next) {
  try {
    res.json(await service.feedback(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function createPromotion(req, res, next) {
  try {
    res.status(201).json(await service.createPromotion(req.user, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function createDiscount(req, res, next) {
  try {
    res.status(201).json(await service.createDiscount(req.user, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function listDiscounts(req, res, next) {
  try {
    res.json(await service.listDiscounts(req.user, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function updateDiscount(req, res, next) {
  try {
    res.json(await service.updateDiscount(req.user, req.params.id, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function deleteDiscount(req, res, next) {
  try {
    res.json(await service.deleteDiscount(req.user, req.params.id));
  } catch (err) {
    next(err);
  }
}

async function attachDiscountProducts(req, res, next) {
  try {
    res.status(201).json(await service.attachDiscountProducts(req.user, req.params.id, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function updateStoreProfile(req, res, next) {
  try {
    res.json(await service.updateStoreProfile(req.user, req.body || {}));
  } catch (err) {
    next(err);
  }
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
