const service = require("./service");

function getCart(_req, res) {
  res.json(service.getCart());
}

function addItem(req, res) {
  res.status(201).json(service.addItem(req.body));
}

function updateItem(req, res) {
  res.json(service.updateItem(req.params.id, req.body));
}

function removeItem(req, res) {
  res.json(service.removeItem(req.params.id));
}

function applyDiscount(req, res) {
  res.json(service.applyDiscount(req.body));
}

function removeDiscount(_req, res) {
  res.json(service.removeDiscount());
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  applyDiscount,
  removeDiscount
};
