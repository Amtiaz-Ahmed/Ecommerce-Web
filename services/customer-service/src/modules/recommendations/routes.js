const router = require("express").Router();
const controller = require("./controller");

router.get("/dashboard", controller.dashboard);

module.exports = router;
