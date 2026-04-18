const service = require("./service");

function validate(req, res) {
  res.json(service.validate(req.body));
}

module.exports = { validate };
