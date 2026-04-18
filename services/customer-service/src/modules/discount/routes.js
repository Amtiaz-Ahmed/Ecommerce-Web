const router = require("express").Router();
const controller = require("./controller");

router.post("/validate", controller.validate);

module.exports = router;
