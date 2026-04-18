const { stubOk } = require("../../../../../shared/common/src");

function create(body) {
  return stubOk("POST /api/feedback", { id: null, ...body });
}

function listMine(query) {
  return stubOk("GET /api/feedback/me", { items: [], ...query });
}

function update(id, body) {
  return stubOk("PUT /api/feedback/:id", { id, ...body });
}

function remove(id) {
  return stubOk("DELETE /api/feedback/:id", { id });
}

module.exports = { create, listMine, update, remove };
