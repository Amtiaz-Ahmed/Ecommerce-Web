const service = require("./service");

function create(req, res) {
  res.status(201).json(service.create(req.body));
}

function listMine(req, res) {
  res.json(service.listMine(req.query));
}

function update(req, res) {
  res.json(service.update(req.params.id, req.body));
}

function remove(req, res) {
  res.json(service.remove(req.params.id));
}

module.exports = { create, listMine, update, remove };
