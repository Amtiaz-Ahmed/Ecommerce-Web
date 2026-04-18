const { stubOk } = require("../../../../../shared/common/src");

function dashboard() {
  return stubOk("GET /api/stores/me/dashboard", {});
}

function analytics(query) {
  return stubOk("GET /api/stores/me/analytics", query);
}

function dashboardSales(query) {
  return stubOk("GET /api/stores/me/dashboard/sales", query);
}

function dashboardSuggestions() {
  return stubOk("GET /api/stores/me/dashboard/suggestions", { items: [] });
}

function createProduct(body) {
  return stubOk("POST /api/stores/me/products", body);
}

function updateProduct(id, body) {
  return stubOk("PUT /api/stores/me/products/:id", { id, ...body });
}

function deleteProduct(id) {
  return stubOk("DELETE /api/stores/me/products/:id", { id });
}

function patchStock(id, body) {
  return stubOk("PATCH /api/stores/me/products/:id/stock", { id, ...body });
}

function orders(query) {
  return stubOk("GET /api/stores/me/orders", { items: [], ...query });
}

function orderStatus(id, body) {
  return stubOk("PUT /api/stores/me/orders/:id/status", { id, ...body });
}

function customers(query) {
  return stubOk("GET /api/stores/me/customers", query);
}

function reviews() {
  return stubOk("GET /api/stores/me/reviews", { items: [] });
}

function feedback(query) {
  return stubOk("GET /api/stores/me/feedback", query);
}

function createPromotion(body) {
  return stubOk("POST /api/stores/me/promotions", body);
}

function createDiscount(body) {
  return stubOk("POST /api/stores/me/discounts", body);
}

function listDiscounts(query) {
  return stubOk("GET /api/stores/me/discounts", query);
}

function updateDiscount(id, body) {
  return stubOk("PUT /api/stores/me/discounts/:id", { id, ...body });
}

function deleteDiscount(id) {
  return stubOk("DELETE /api/stores/me/discounts/:id", { id });
}

function attachDiscountProducts(id, body) {
  return stubOk("POST /api/stores/me/discounts/:id/products", { id, ...body });
}

function updateStoreProfile(body) {
  return stubOk("PUT /api/stores/me (branding/settings)", body);
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
