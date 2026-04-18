const service = require("./service");

function createIntent(req, res) {
  res.status(201).json(service.createIntent(req.body));
}

function webhook(req, res) {
  res.json(service.webhook(req));
}

module.exports = { createIntent, webhook };
