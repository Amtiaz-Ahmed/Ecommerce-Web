const { stubOk } = require("../../../../../shared/common/src");

function listStores(query) {
  return stubOk("GET /api/stores", { items: [], ...query });
}

function createStore(body) {
  return stubOk("POST /api/stores", body);
}

function storeBySlug(slug) {
  return stubOk("GET /api/stores/:slug", { slug });
}

function storeProducts(slug, query) {
  return stubOk("GET /api/stores/:slug/products", { slug, ...query });
}

function storeFeedback(slug, query) {
  return stubOk("GET /api/stores/:slug/feedback", { slug, ...query });
}

module.exports = { listStores, createStore, storeBySlug, storeProducts, storeFeedback };
