const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.list);
router.put("/:id/resolve", controller.resolve);

module.exports = router;
