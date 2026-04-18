const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getCart);
router.post("/items", controller.addItem);
router.put("/items/:id", controller.updateItem);
router.delete("/items/:id", controller.removeItem);
router.post("/apply-discount", controller.applyDiscount);
router.delete("/remove-discount", controller.removeDiscount);

module.exports = router;
