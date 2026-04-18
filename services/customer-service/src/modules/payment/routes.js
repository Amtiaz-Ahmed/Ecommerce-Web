const router = require("express").Router();
const controller = require("./controller");

router.post("/create-intent", controller.createIntent);
router.post("/webhook", controller.webhook);

module.exports = router;
