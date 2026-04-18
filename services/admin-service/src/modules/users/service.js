const { stubOk } = require("../../../../../shared/common/src");

function list(query) {
  return stubOk("GET /api/admin/users", { items: [], ...query });
}

function setStatus(id, body) {
  return stubOk("PUT /api/admin/users/:id/status", { id, ...body });
}

module.exports = { list, setStatus };
