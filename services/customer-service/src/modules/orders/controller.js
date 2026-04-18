const service = require("./service");

function listOrders(req, res) {
  res.json(service.listOrders(req.query));
}

function getById(req, res) {
  res.json(service.getById(req.params.id));
}

function checkout(req, res) {
  res.status(201).json(service.checkout(req.body));
}

function pay(req, res) {
  res.json(service.pay(req.params.id, req.body));
}

module.exports = {
  listOrders,
  getById,
  checkout,
  pay
};
