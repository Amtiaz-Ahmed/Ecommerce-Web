const service = require("./service");

function listStores(req, res) {
  res.json(service.listStores(req.query));
}

function createStore(req, res) {
  res.status(201).json(service.createStore(req.body));
}

function storeFeedback(req, res) {
  res.json(service.storeFeedback(req.params.slug, req.query));
}

function storeProducts(req, res) {
  res.json(service.storeProducts(req.params.slug, req.query));
}

function storeBySlug(req, res) {
  res.json(service.storeBySlug(req.params.slug));
}

module.exports = {
  listStores,
  createStore,
  storeFeedback,
  storeProducts,
  storeBySlug
};
