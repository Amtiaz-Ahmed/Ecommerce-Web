const service = require("./service");

function create(req, res) {
  res.status(201).json(service.create(req.body));
}

function update(req, res) {
  res.json(service.update(req.params.id, req.body));
}

function remove(req, res) {
  res.json(service.remove(req.params.id));
}

function list(req, res) {
  res.json(service.list(req.query));
}

module.exports = { create, update, remove, list };
