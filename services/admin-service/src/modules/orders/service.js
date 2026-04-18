const { stubOk } = require("../../../../../shared/common/src");

function list(query) {
  return stubOk("GET /api/admin/orders", { items: [], ...query });
}

module.exports = { list };
