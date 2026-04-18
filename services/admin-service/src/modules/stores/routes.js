const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.list);
router.put("/:id/approve", controller.approve);
router.put("/:id/reject", controller.reject);

module.exports = router;
