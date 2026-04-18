const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.list);
router.put("/:id/status", controller.setStatus);

module.exports = router;
