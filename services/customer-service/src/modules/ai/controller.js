const service = require("./service");

function discover(req, res) {
  res.json(service.discover(req.body || {}));
}

function suggestionsDashboard(req, res) {
  res.json(service.suggestionsDashboard(req.query));
}

module.exports = { discover, suggestionsDashboard };
