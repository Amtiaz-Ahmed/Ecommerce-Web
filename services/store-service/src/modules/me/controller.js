const service = require("./service");

function dashboard(_req, res) {
  res.json(service.dashboard());
}

function analytics(req, res) {
  res.json(service.analytics(req.query));
}

function dashboardSales(req, res) {
  res.json(service.dashboardSales(req.query));
}

function dashboardSuggestions(_req, res) {
  res.json(service.dashboardSuggestions());
}

function createProduct(req, res) {
  res.status(201).json(service.createProduct(req.body));
}

function updateProduct(req, res) {
  res.json(service.updateProduct(req.params.id, req.body));
}

function deleteProduct(req, res) {
  res.json(service.deleteProduct(req.params.id));
}

function patchStock(req, res) {
  res.json(service.patchStock(req.params.id, req.body));
}

function orders(req, res) {
  res.json(service.orders(req.query));
}

function orderStatus(req, res) {
  res.json(service.orderStatus(req.params.id, req.body));
}

function customers(req, res) {
  res.json(service.customers(req.query));
}

function reviews(_req, res) {
  res.json(service.reviews());
}

function feedback(req, res) {
  res.json(service.feedback(req.query));
}

function createPromotion(req, res) {
  res.status(201).json(service.createPromotion(req.body));
}

function createDiscount(req, res) {
  res.status(201).json(service.createDiscount(req.body));
}

function listDiscounts(req, res) {
  res.json(service.listDiscounts(req.query));
}

function updateDiscount(req, res) {
  res.json(service.updateDiscount(req.params.id, req.body));
}

function deleteDiscount(req, res) {
  res.json(service.deleteDiscount(req.params.id));
}

function attachDiscountProducts(req, res) {
  res.status(201).json(service.attachDiscountProducts(req.params.id, req.body));
}

function updateStoreProfile(req, res) {
  res.json(service.updateStoreProfile(req.body));
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
