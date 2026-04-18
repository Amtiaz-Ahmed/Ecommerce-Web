const { stubOk } = require("../../../../../shared/common/src");

function addItem(body) {
  return stubOk("POST /api/wishlist/items", body);
}

function list() {
  return stubOk("GET /api/wishlist", { items: [] });
}

module.exports = { addItem, list };
