const { stubOk } = require("../../../../../shared/common/src");

function listOrders(query) {
  return stubOk("GET /api/orders", { items: [], ...query });
}

function getById(id) {
  return stubOk("GET /api/orders/:id", { id });
}

function checkout(body) {
  return stubOk("POST /api/orders/checkout", body);
}

function pay(id, body) {
  return stubOk("POST /api/orders/:id/pay", { id, ...body });
}

module.exports = {
  listOrders,
  getById,
  checkout,
  pay
};
