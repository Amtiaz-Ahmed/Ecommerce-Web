const { stubOk } = require("../../../../../shared/common/src");

function create(body) {
  return stubOk("POST /api/reviews", body);
}

module.exports = { create };
