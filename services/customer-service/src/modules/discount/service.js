const { stubOk } = require("../../../../../shared/common/src");

function validate(body) {
  return stubOk("POST /api/discounts/validate", { valid: false, ...body });
}

module.exports = { validate };
