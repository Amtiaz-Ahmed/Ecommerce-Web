const { stubOk } = require("../../../../../shared/common/src");

function create(body) {
  return stubOk("POST /api/admin/products", body);
}

function update(id, body) {
  return stubOk("PUT /api/admin/products/:id", { id, ...body });
}

function remove(id) {
  return stubOk("DELETE /api/admin/products/:id", { id });
}

function list(query) {
  return stubOk("GET /api/admin/products", { items: [], ...query });
}

module.exports = { create, update, remove, list };
