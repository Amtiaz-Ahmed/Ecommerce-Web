const service = require("./service");

function list(req, res) {
  res.json(service.list(req.query));
}

module.exports = { list };
