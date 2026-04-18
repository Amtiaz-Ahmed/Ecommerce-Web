const { stubOk } = require("../../../../../shared/common/src");

function dashboard(query) {
  return stubOk("GET /api/recommendations/dashboard", {
    limit: query.limit,
    modules: []
  });
}

module.exports = { dashboard };
