const { stubOk } = require("../../../../../shared/common/src");

function listProducts(query) {
  return stubOk("GET /api/products", { items: [], ...query });
}

function getById(id) {
  return stubOk("GET /api/products/:id", { id, product: null });
}

function byCategorySlug(slug) {
  return stubOk("GET /api/products/category/:slug", { slug, items: [] });
}

function productFeedback(id, query) {
  return stubOk("GET /api/products/:id/feedback", { productId: id, ...query, items: [] });
}

module.exports = {
  listProducts,
  getById,
  byCategorySlug,
  productFeedback
};
