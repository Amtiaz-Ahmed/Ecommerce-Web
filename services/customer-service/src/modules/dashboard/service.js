const { stubOk } = require("../../../../../shared/common/src");

function getCustomerDashboard(_query) {
  return stubOk("GET /api/dashboard/customer", {
    topSellingProducts: [],
    suggestedProducts: [],
    suggestedCategories: []
  });
}

module.exports = { getCustomerDashboard };
