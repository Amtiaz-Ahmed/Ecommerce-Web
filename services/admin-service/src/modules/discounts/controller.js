const service = require("./service");

function create(req, res) {
  res.status(201).json(service.create(req.body));
}

function list(_req, res) {
  res.json(service.list());
}

function update(req, res) {
  res.json(service.update(req.params.id, req.body));
}

function remove(req, res) {
  res.json(service.remove(req.params.id));
}

module.exports = { create, list, update, remove };
