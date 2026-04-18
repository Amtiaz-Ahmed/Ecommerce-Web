const { stubOk } = require("../../../../../shared/common/src");

function getDashboard(query) {
  return stubOk("GET /api/admin/dashboard", {
    range: query.range,
    topSellingProducts: [],
    suggestedTrends: [],
    feedbackSentiment: null
  });
}

module.exports = { getDashboard };
