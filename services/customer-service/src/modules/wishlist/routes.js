const router = require("express").Router();
const controller = require("./controller");

router.post("/items", controller.addItem);
router.get("/", controller.list);

module.exports = router;
