const service = require("./service");

function addItem(req, res) {
  res.status(201).json(service.addItem(req.body));
}

function list(_req, res) {
  res.json(service.list());
}

module.exports = { addItem, list };
