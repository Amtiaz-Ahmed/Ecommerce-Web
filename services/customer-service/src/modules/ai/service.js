const { stubOk } = require("../../../../../shared/common/src");

function discover(body) {
  return stubOk("POST /api/ai/discover", {
    prompt: body.prompt,
    parsedFilters: {},
    productIds: []
  });
}

function suggestionsDashboard(query) {
  return stubOk("GET /api/ai/suggestions/dashboard", { limit: query.limit, blocks: [] });
}

module.exports = { discover, suggestionsDashboard };
