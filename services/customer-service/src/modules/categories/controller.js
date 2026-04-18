const service = require("./service");

function list(_req, res) {
  res.json(service.list());
}

module.exports = { list };
