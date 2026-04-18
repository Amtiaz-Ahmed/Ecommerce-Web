const router = require("express").Router();
const controller = require("./controller");

router.get("/customer", controller.getCustomerDashboard);

module.exports = router;
