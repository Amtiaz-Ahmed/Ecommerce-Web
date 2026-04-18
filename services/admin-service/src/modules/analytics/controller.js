const service = require("./service");

function overview(_req, res) {
  res.json(service.overview());
}

function revenue(req, res) {
  res.json(service.revenue(req.query));
}

function topStores(_req, res) {
  res.json(service.topStores());
}

function topProducts(_req, res) {
  res.json(service.topProducts());
}

function legacyAnalytics(_req, res) {
  res.json(service.legacyAnalytics());
}

module.exports = { overview, revenue, topStores, topProducts, legacyAnalytics };
