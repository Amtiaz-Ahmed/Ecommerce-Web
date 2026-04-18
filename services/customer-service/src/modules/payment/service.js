const { stubOk } = require("../../../../../shared/common/src");

function createIntent(body) {
  return stubOk("POST /api/payments/create-intent", body);
}

function webhook(_req) {
  return stubOk("POST /api/payments/webhook", { received: true });
}

module.exports = { createIntent, webhook };
