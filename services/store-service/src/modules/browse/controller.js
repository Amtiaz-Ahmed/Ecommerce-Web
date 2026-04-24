const service = require("./service");

async function listStores(req, res, next) {
  try {
    res.json(await service.listStores(req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function createStore(req, res, next) {
  try {
    res.status(201).json(await service.createStore(req.user, req.body || {}));
  } catch (err) {
    next(err);
  }
}

async function storeFeedback(req, res, next) {
  try {
    res.json(await service.storeFeedback(req.params.slug, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function storeProducts(req, res, next) {
  try {
    res.json(await service.storeProducts(req.params.slug, req.query || {}));
  } catch (err) {
    next(err);
  }
}

async function storeBySlug(req, res, next) {
  try {
    res.json(await service.storeBySlug(req.params.slug));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listStores,
  createStore,
  storeFeedback,
  storeProducts,
  storeBySlug
};
