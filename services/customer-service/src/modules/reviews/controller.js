const service = require("./service");

function create(req, res) {
  res.status(201).json(service.create(req.body));
}

module.exports = { create };
