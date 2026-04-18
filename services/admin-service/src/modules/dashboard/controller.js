const service = require("./service");

function getDashboard(req, res) {
  res.json(service.getDashboard(req.query));
}

module.exports = { getDashboard };
