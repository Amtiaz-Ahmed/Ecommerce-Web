const router = require("express").Router();
const controller = require("./controller");

router.post("/", controller.create);
router.get("/me", controller.listMine);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
