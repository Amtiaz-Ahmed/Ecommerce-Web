const service = require("./service");

function list(_req, res) {
  res.json(service.list());
}

function resolve(req, res) {
  res.json(service.resolve(req.params.id, req.body));
}

module.exports = { list, resolve };
