const { stubOk } = require("../../../../../shared/common/src");

function create(body) {
  return stubOk("POST /api/admin/discounts", body);
}

function list() {
  return stubOk("GET /api/admin/discounts", { items: [] });
}

function update(id, body) {
  return stubOk("PUT /api/admin/discounts/:id", { id, ...body });
}

function remove(id) {
  return stubOk("DELETE /api/admin/discounts/:id", { id });
}

module.exports = { create, list, update, remove };
