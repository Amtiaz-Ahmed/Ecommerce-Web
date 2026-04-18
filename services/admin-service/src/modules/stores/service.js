const { stubOk } = require("../../../../../shared/common/src");

function list(query) {
  return stubOk("GET /api/admin/stores", { items: [], ...query });
}

function approve(id) {
  return stubOk("PUT /api/admin/stores/:id/approve", { id });
}

function reject(id) {
  return stubOk("PUT /api/admin/stores/:id/reject", { id });
}

module.exports = { list, approve, reject };
