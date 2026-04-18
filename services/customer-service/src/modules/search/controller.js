const service = require("./service");

function searchProducts(req, res) {
  res.json(service.searchProducts(req.query));
}

function suggestions(req, res) {
  res.json(service.suggestions(req.query));
}

function history(req, res) {
  res.json(service.history(req.user?.id));
}

function clearHistoryItem(req, res) {
  res.json({ ok: true, stub: true, srsRef: "DELETE /api/search/history/:id", id: req.params.id });
}

function clearAllHistory(_req, res) {
  res.json({ ok: true, stub: true, srsRef: "DELETE /api/search/history" });
}

module.exports = {
  searchProducts,
  suggestions,
  history,
  clearHistoryItem,
  clearAllHistory
};
