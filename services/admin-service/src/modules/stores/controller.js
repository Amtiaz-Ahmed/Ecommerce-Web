const service = require("./service");

function list(req, res) {
  res.json(service.list(req.query));
}

function approve(req, res) {
  res.json(service.approve(req.params.id));
}

function reject(req, res) {
  res.json(service.reject(req.params.id));
}

module.exports = { list, approve, reject };
