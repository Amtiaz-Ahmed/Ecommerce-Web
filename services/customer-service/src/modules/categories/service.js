const { stubOk } = require("../../../../../shared/common/src");

function list() {
  return stubOk("GET /api/categories", { items: [] });
}

module.exports = { list };
