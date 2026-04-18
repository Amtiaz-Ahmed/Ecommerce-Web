const service = require("./service");

function listProducts(req, res) {
  res.json(service.listProducts(req.query));
}

function getById(req, res) {
  res.json(service.getById(req.params.id));
}

function byCategorySlug(req, res) {
  res.json(service.byCategorySlug(req.params.slug));
}

function productFeedback(req, res) {
  res.json(service.productFeedback(req.params.id, req.query));
}

module.exports = {
  listProducts,
  getById,
  byCategorySlug,
  productFeedback
};
