const service = require("./service");

function dashboard(req, res) {
  res.json(service.dashboard(req.query));
}

module.exports = { dashboard };
