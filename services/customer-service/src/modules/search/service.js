const { stubOk } = require("../../../../../shared/common/src");

function searchProducts(query) {
  return stubOk("GET /api/search/products", { query, items: [], total: 0 });
}

function suggestions(query) {
  return stubOk("GET /api/search/suggestions", {
    queries: [],
    products: [],
    categories: [],
    stores: [],
    q: query.q
  });
}

function history(userId) {
  return stubOk("GET /api/search/history", { userId, items: [] });
}

module.exports = { searchProducts, suggestions, history };
