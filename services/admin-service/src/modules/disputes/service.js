const { stubOk } = require("../../../../../shared/common/src");

function list() {
  return stubOk("GET /api/admin/disputes", { items: [] });
}

function resolve(id, body) {
  return stubOk("PUT /api/admin/disputes/:id/resolve", { id, ...body });
}

module.exports = { list, resolve };
