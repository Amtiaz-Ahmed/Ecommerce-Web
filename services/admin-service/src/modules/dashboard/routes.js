const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getDashboard);

module.exports = router;
