const { stubOk } = require("../../../../../shared/common/src");

function getCart() {
  return stubOk("GET /api/cart", { items: [], subtotal: 0, discount: null });
}

function addItem(body) {
  return stubOk("POST /api/cart/items", body);
}

function updateItem(id, body) {
  return stubOk("PUT /api/cart/items/:id", { id, ...body });
}

function removeItem(id) {
  return stubOk("DELETE /api/cart/items/:id", { id });
}

function applyDiscount(body) {
  return stubOk("POST /api/cart/apply-discount", body);
}

function removeDiscount() {
  return stubOk("DELETE /api/cart/remove-discount", {});
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  applyDiscount,
  removeDiscount
};
