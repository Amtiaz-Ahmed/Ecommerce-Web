const service = require("./service");

function getCustomerDashboard(req, res) {
  res.json(service.getCustomerDashboard(req.query));
}

module.exports = { getCustomerDashboard };
