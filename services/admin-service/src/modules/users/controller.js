const service = require("./service");

function list(req, res) {
  res.json(service.list(req.query));
}

function setStatus(req, res) {
  res.json(service.setStatus(req.params.id, req.body));
}

module.exports = { list, setStatus };
