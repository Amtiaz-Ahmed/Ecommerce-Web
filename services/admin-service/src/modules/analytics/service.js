const { stubOk } = require("../../../../../shared/common/src");

function overview() {
  return stubOk("GET /api/admin/analytics/overview", {});
}

function revenue(query) {
  return stubOk("GET /api/admin/analytics/revenue", query);
}

function topStores() {
  return stubOk("GET /api/admin/analytics/top-stores", { items: [] });
}

function topProducts() {
  return stubOk("GET /api/admin/analytics/top-products", { items: [] });
}

function legacyAnalytics() {
  return stubOk("GET /api/admin/analytics (legacy)", {});
}

module.exports = { overview, revenue, topStores, topProducts, legacyAnalytics };
